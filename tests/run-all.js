/**
 * CROWN WATCH CO. E2E Test Suite — Master Test Runner
 * Entry Point: node tests/run-all.js
 */

const fs = require('fs');
const path = require('path');
const harness = require('./harness');

// Tier Minimum Threshold Requirements
const TIER_THRESHOLDS = {
  1: { name: 'Tier 1 Feature Coverage', min: 140 },
  2: { name: 'Tier 2 Boundary & Corner Cases', min: 140 },
  3: { name: 'Tier 3 Cross-Feature Pairwise', min: 28 },
  4: { name: 'Tier 4 Real-World Application Scenarios', min: 14 },
  total: { name: 'Total Suite Threshold', min: 322 }
};

// Module paths relative to tests/
const TIER_MODULES = [
  { tier: 1, file: './tier1_feature_coverage.js' },
  { tier: 2, file: './tier2_boundary_corner.js' },
  { tier: 3, file: './tier3_cross_feature.js' },
  { tier: 4, file: './tier4_real_world.js' }
];

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    tiers: null,      // null means all tiers
    feature: null,    // e.g. 'F01'
    grep: null,       // regex/string filter
    verbose: false,
    bail: false,
    json: false
  };

  for (const arg of args) {
    if (arg.startsWith('--tier=')) {
      options.tiers = arg.split('=')[1].split(',').map(Number);
    } else if (arg.startsWith('--feature=')) {
      options.feature = arg.split('=')[1].toUpperCase();
    } else if (arg.startsWith('--grep=')) {
      options.grep = new RegExp(arg.split('=')[1], 'i');
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true;
    } else if (arg === '--bail' || arg === '-b') {
      options.bail = true;
    } else if (arg === '--json') {
      options.json = true;
    }
  }

  return options;
}

async function runAll() {
  const options = parseArgs();
  const startTime = Date.now();

  if (!options.json) {
    console.log('\n================================================================================');
    console.log('                 CROWN WATCH CO. E2E TEST SUITE RUNNER                          ');
    console.log('================================================================================\n');
  }

  // 1. Reset harness state
  harness.reset();
  if (options.verbose) harness.setVerbose(true);
  if (options.bail) harness.setBail(true);

  // 2. Discover and load test modules
  const modulesToLoad = options.tiers
    ? TIER_MODULES.filter(m => options.tiers.includes(m.tier))
    : TIER_MODULES;

  let missingModules = [];
  for (const mod of modulesToLoad) {
    const fullPath = path.resolve(__dirname, mod.file);
    if (!fs.existsSync(fullPath)) {
      missingModules.push(mod);
      if (options.verbose) {
        console.log(`⚠️ Note: Test module file '${mod.file}' not yet created for Tier ${mod.tier}.`);
      }
      continue;
    }
    try {
      require(fullPath);
    } catch (err) {
      console.error(`❌ FAILED TO LOAD TEST MODULE [${mod.file}]:`, err.message);
      process.exitCode = 1;
      return;
    }
  }

  // 3. Execute test suite via harness
  const filterFn = (testCase) => {
    if (options.feature && testCase.feature !== options.feature) return false;
    if (options.grep && !options.grep.test(testCase.name)) return false;
    return true;
  };

  const results = await harness.run({ filter: filterFn });
  const totalDurationMs = Date.now() - startTime;

  // 4. Verify Minimum Thresholds
  let thresholdDeficit = false;
  const thresholdStatus = {};

  for (const [tier, config] of Object.entries(TIER_THRESHOLDS)) {
    if (tier === 'total') continue;
    const tierNum = Number(tier);
    // If specific tiers were filtered via CLI, skip threshold enforcement for non-selected tiers
    if (options.tiers && !options.tiers.includes(tierNum)) {
      thresholdStatus[tierNum] = { ...config, count: results.tiers[tierNum]?.total || 0, passed: true, skippedCheck: true };
      continue;
    }

    const actualCount = results.tiers[tierNum]?.total || 0;
    const passed = actualCount >= config.min;
    if (!passed) thresholdDeficit = true;

    thresholdStatus[tierNum] = {
      ...config,
      count: actualCount,
      passed,
      skippedCheck: false
    };
  }

  // Check total threshold if running full suite
  if (!options.tiers && !options.feature && !options.grep) {
    const totalCount = results.totalCount || 0;
    const totalPassed = totalCount >= TIER_THRESHOLDS.total.min;
    if (!totalPassed) thresholdDeficit = true;
    thresholdStatus.total = {
      ...TIER_THRESHOLDS.total,
      count: totalCount,
      passed: totalPassed,
      skippedCheck: false
    };
  }

  // 5. Output Report
  const allTestsPassed = results.failedCount === 0;
  const isSuccess = allTestsPassed && !thresholdDeficit;

  if (options.json) {
    console.log(JSON.stringify({
      success: isSuccess,
      durationMs: totalDurationMs,
      results,
      thresholds: thresholdStatus,
      thresholdDeficit,
      missingModules: missingModules.map(m => m.file)
    }, null, 2));
  } else {
    printStructuredReport(results, thresholdStatus, totalDurationMs, thresholdDeficit, isSuccess, missingModules);
  }

  // 6. Set Process Exit Code
  process.exitCode = isSuccess ? 0 : 1;
  return isSuccess;
}

function printStructuredReport(results, thresholdStatus, durationMs, thresholdDeficit, isSuccess, missingModules) {
  console.log('--------------------------------------------------------------------------------');
  console.log('                        SUMMARY OF RESULTS BY TIER                              ');
  console.log('--------------------------------------------------------------------------------');
  console.log(
    'Tier    Description                       Required  Executed  Passed  Failed  Status'
  );
  console.log('--------------------------------------------------------------------------------');

  for (let t = 1; t <= 4; t++) {
    const stat = results.tiers[t] || { total: 0, passed: 0, failed: 0 };
    const th = thresholdStatus[t] || { min: TIER_THRESHOLDS[t].min, name: TIER_THRESHOLDS[t].name };
    const isModuleMissing = missingModules && missingModules.some(m => m.tier === t);
    const statusStr = isModuleMissing
      ? '⚠️ PENDING'
      : (stat.failed === 0 && (th.passed || th.skippedCheck)) ? '✅ PASS' : '❌ FAIL';
    console.log(
      `Tier ${t}  ${padRight(th.name || '', 32)} ${padLeft(th.min, 8)} ${padLeft(stat.total, 9)} ${padLeft(stat.passed, 7)} ${padLeft(stat.failed, 7)}  ${statusStr}`
    );
  }

  console.log('--------------------------------------------------------------------------------');
  const totTh = thresholdStatus.total?.min || TIER_THRESHOLDS.total.min;
  const totStatusStr = (results.failedCount === 0 && !thresholdDeficit) ? '✅ PASS' : '❌ FAIL';
  console.log(
    `TOTAL   ${padRight('All Suite Tiers Combined', 32)} ${padLeft(totTh, 8)} ${padLeft(results.totalCount, 9)} ${padLeft(results.passedCount, 7)} ${padLeft(results.failedCount, 7)}  ${totStatusStr}`
  );
  console.log('--------------------------------------------------------------------------------\n');

  if (results.failures && results.failures.length > 0) {
    console.log('❌ FAILURES (' + results.failures.length + '):\n');
    results.failures.forEach((f, idx) => {
      console.log(`  ${idx + 1}) [${f.id || 'N/A'}] (Tier ${f.tier || '?'}, ${f.feature || 'General'}) ${f.name}`);
      console.log(`     Error: ${f.errorMessage || f.error}`);
      if (f.stack) {
        console.log(`     ${f.stack.split('\n')[1]?.trim() || ''}`);
      }
      console.log('');
    });
  }

  if (missingModules && missingModules.length > 0) {
    console.log('ℹ️  NOTE: Pending tier suite modules (to be implemented in downstream milestones E2-E4):');
    missingModules.forEach(m => {
      console.log(`   - Tier ${m.tier}: ${m.file}`);
    });
    console.log('');
  }

  if (thresholdDeficit) {
    console.log('❌ THRESHOLD DEFICIENCY DETECTED:');
    for (const [key, val] of Object.entries(thresholdStatus)) {
      if (!val.passed && !val.skippedCheck) {
        console.log(`   - ${val.name}: Executed ${val.count}, required minimum is ${val.min}`);
      }
    }
    console.log('');
  }

  console.log(`Execution Time: ${(durationMs / 1000).toFixed(2)}s`);
  console.log(`Threshold Status: ${thresholdDeficit ? '❌ DEFICIT' : '✅ SATISFIED'}`);
  console.log(`Overall Suite Result: ${isSuccess ? '✅ PASSED (Exit Code 0)' : '❌ FAILED (Exit Code 1)'}`);
  console.log('================================================================================\n');
}

function padRight(str, len) {
  return String(str).padEnd(len, ' ');
}

function padLeft(str, len) {
  return String(str).padStart(len, ' ');
}

// Global Exception Safety Handler
process.on('uncaughtException', (err) => {
  console.error('\n❌ UNCAUGHT EXCEPTION IN TEST RUNNER:', err);
  process.exitCode = 1;
});

process.on('unhandledRejection', (reason) => {
  console.error('\n❌ UNHANDLED REJECTION IN TEST RUNNER:', reason);
  process.exitCode = 1;
});

// Run if called directly
if (require.main === module) {
  runAll();
}

module.exports = { runAll, parseArgs, TIER_THRESHOLDS };
