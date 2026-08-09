/**
 * CROWN WATCH CO. - E2E Test Suite Harness & Assertion Framework
 * Location: tests/harness.js
 * Zero external dependencies - standard Node.js built-ins.
 */

const assertNode = require('assert');

// Global Test Registry State
const state = {
  currentSuite: 'Default Suite',
  tests: [],
  results: [],
  options: {
    verbose: false,
    bail: false
  },
  stats: {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    durationMs: 0,
    byTier: {
      1: { total: 0, passed: 0, failed: 0 },
      2: { total: 0, passed: 0, failed: 0 },
      3: { total: 0, passed: 0, failed: 0 },
      4: { total: 0, passed: 0, failed: 0 }
    },
    byFeature: {} // F01..F28 tracking
  }
};

/**
 * Custom Domain Assertions
 */
const customAssert = {
  // Standard Node.js assertion wrappers
  strictEqual: (actual, expected, msg) => assertNode.strictEqual(actual, expected, msg),
  notStrictEqual: (actual, expected, msg) => assertNode.notStrictEqual(actual, expected, msg),
  deepStrictEqual: (actual, expected, msg) => assertNode.deepStrictEqual(actual, expected, msg),
  ok: (value, msg) => assertNode.ok(value, msg),
  fail: (msg) => assertNode.fail(msg),
  throws: (fn, expected, msg) => assertNode.throws(fn, expected, msg),
  doesNotThrow: (fn, msg) => assertNode.doesNotThrow(fn, msg),
  includes: (haystack, needle, msg) => {
    const pass = Array.isArray(haystack) || typeof haystack === 'string'
      ? haystack.includes(needle)
      : false;
    assertNode.ok(pass, msg || `Expected ${JSON.stringify(haystack)} to include ${JSON.stringify(needle)}`);
  },
  match: (string, regex, msg) => {
    assertNode.match(string, regex, msg);
  },

  // CROWN WATCH CO. Domain Assertions
  bdtFormat: (value, msg) => {
    const bdtRegex = /^(?:৳\s?|\u09F3\s?)\d{1,3}(?:,?\d{2,3})*(?:\.\d{2})?$/;
    const strVal = String(value).trim();
    assertNode.ok(
      bdtRegex.test(strVal),
      msg || `Expected '${value}' to be valid BDT currency format (e.g. '৳ 12,500' or '৳ 500')`
    );
  },

  bdPhone: (phone, msg) => {
    const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    const strPhone = String(phone).trim();
    assertNode.ok(
      phoneRegex.test(strPhone),
      msg || `Expected '${phone}' to be valid Bangladesh phone number (e.g. '01712345678')`
    );
  },

  mfsTrxId: (trxId, msg) => {
    const trxRegex = /^[A-Za-z0-9]{8,12}$/;
    const strTrx = String(trxId).trim();
    assertNode.ok(
      trxRegex.test(strTrx),
      msg || `Expected '${trxId}' to be valid MFS TrxID (8-12 alphanumeric characters)`
    );
  },

  ticketId: (ticketId, msg) => {
    const ticketRegex = /^CROWN-REP-(?:20\d{2}-)?\d{4,6}$/i;
    const strTicket = String(ticketId).trim();
    assertNode.ok(
      ticketRegex.test(strTicket),
      msg || `Expected '${ticketId}' to be valid Repair Ticket ID (e.g. 'CROWN-REP-2026-8941')`
    );
  },

  orderId: (orderId, msg) => {
    const orderRegex = /^(?:CROWN-ORD-|ORD-)[A-Z0-9-]+$/i;
    const strOrder = String(orderId).trim();
    assertNode.ok(
      orderRegex.test(strOrder),
      msg || `Expected '${orderId}' to be valid Order ID (e.g. 'CROWN-ORD-2026-001')`
    );
  }
};

/**
 * Test Registration Functions
 */
function describe(suiteName, fn) {
  const prevSuite = state.currentSuite;
  state.currentSuite = suiteName;
  if (typeof fn === 'function') {
    fn();
  }
  state.currentSuite = prevSuite;
}

function test(optionsOrName, runFn) {
  let testDef;
  if (typeof optionsOrName === 'string') {
    testDef = {
      id: `T${state.tests.length + 1}`,
      tier: 1,
      feature: 'F01',
      name: optionsOrName,
      run: runFn
    };
  } else if (typeof optionsOrName === 'object' && optionsOrName !== null) {
    testDef = {
      id: optionsOrName.id || `T${state.tests.length + 1}`,
      tier: optionsOrName.tier || 1,
      feature: optionsOrName.feature || 'F01',
      name: optionsOrName.name || 'Unnamed Test',
      run: optionsOrName.run || runFn
    };
  } else {
    throw new Error('Invalid test registration arguments');
  }

  testDef.suite = state.currentSuite;
  state.tests.push(testDef);
}

function setVerbose(val) {
  state.options.verbose = Boolean(val);
}

function setBail(val) {
  state.options.bail = Boolean(val);
}

function reset() {
  state.currentSuite = 'Default Suite';
  state.tests = [];
  state.results = [];
  state.options = { verbose: false, bail: false };
  state.stats = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    durationMs: 0,
    byTier: {
      1: { total: 0, passed: 0, failed: 0 },
      2: { total: 0, passed: 0, failed: 0 },
      3: { total: 0, passed: 0, failed: 0 },
      4: { total: 0, passed: 0, failed: 0 }
    },
    byFeature: {}
  };
}

/**
 * Runner Execution Engine
 * @param {Object} [options] - Execution options e.g. { filter: fn, verbose: boolean, bail: boolean }
 * @returns {Promise<Object>} Execution results summary
 */
async function run(options = {}) {
  const startTime = Date.now();
  const verbose = options.verbose !== undefined ? options.verbose : state.options.verbose;
  const bail = options.bail !== undefined ? options.bail : state.options.bail;
  const filterFn = typeof options.filter === 'function' ? options.filter : null;

  const testsToRun = filterFn ? state.tests.filter(filterFn) : state.tests;

  for (const testItem of testsToRun) {
    const tier = testItem.tier || 1;
    const feature = testItem.feature || 'UNKNOWN';

    if (!state.stats.byTier[tier]) {
      state.stats.byTier[tier] = { total: 0, passed: 0, failed: 0 };
    }
    state.stats.byTier[tier].total++;

    if (!state.stats.byFeature[feature]) {
      state.stats.byFeature[feature] = { total: 0, passed: 0, failed: 0 };
    }
    state.stats.byFeature[feature].total++;

    state.stats.total++;
    const testStart = Date.now();

    try {
      if (typeof testItem.run === 'function') {
        await testItem.run();
      }
      const duration = Date.now() - testStart;
      state.stats.passed++;
      state.stats.byTier[tier].passed++;
      state.stats.byFeature[feature].passed++;

      const res = {
        ...testItem,
        status: 'PASSED',
        duration
      };
      state.results.push(res);

      if (verbose) {
        console.log(`  \x1b[32m✓ PASS\x1b[0m [Tier ${tier} | ${feature} | ${testItem.id}] ${testItem.name} (${duration}ms)`);
      }
    } catch (err) {
      const duration = Date.now() - testStart;
      state.stats.failed++;
      state.stats.byTier[tier].failed++;
      state.stats.byFeature[feature].failed++;

      const errorMessage = (err && typeof err === 'object' && err.message) ? err.message : String(err);
      const stack = (err && typeof err === 'object' && err.stack) ? err.stack : '';

      const res = {
        ...testItem,
        status: 'FAILED',
        error: err,
        errorMessage,
        stack,
        duration
      };
      state.results.push(res);

      if (verbose || !options.quiet) {
        console.log(`  \x1b[31m✗ FAIL\x1b[0m [Tier ${tier} | ${feature} | ${testItem.id}] ${testItem.name} (${duration}ms)`);
        console.log(`         \x1b[31mError: ${errorMessage}\x1b[0m`);
      }

      if (bail) {
        break;
      }
    }
  }

  state.stats.durationMs = Date.now() - startTime;

  return {
    totalCount: state.stats.total,
    passedCount: state.stats.passed,
    failedCount: state.stats.failed,
    skippedCount: state.stats.skipped,
    durationMs: state.stats.durationMs,
    tiers: state.stats.byTier,
    features: state.stats.byFeature,
    results: state.results,
    failures: state.results.filter(r => r.status === 'FAILED')
  };
}

/**
 * Legacy runSuite wrapper for simple invocations
 */
async function runSuite() {
  const summary = await run({ verbose: true });
  printSummary();
  return summary.failedCount === 0;
}

/**
 * Summary Reporting & Console Output
 */
function printSummary() {
  console.log(`\n=======================================================`);
  console.log(` TEST SUMMARY REPORT`);
  console.log(`=======================================================`);
  console.log(` Total Execution Time: ${(state.stats.durationMs / 1000).toFixed(2)}s`);
  console.log(` Total Tests Executed: ${state.stats.total}`);
  console.log(` \x1b[32mPassed: ${state.stats.passed}\x1b[0m`);
  console.log(` \x1b[31mFailed: ${state.stats.failed}\x1b[0m`);
  console.log(`-------------------------------------------------------`);
  console.log(` TIER BREAKDOWN:`);
  for (let t = 1; t <= 4; t++) {
    const tierStat = state.stats.byTier[t] || { total: 0, passed: 0, failed: 0 };
    const minTarget = t === 1 ? 140 : t === 2 ? 140 : t === 3 ? 28 : 14;
    const statusMark = tierStat.passed >= minTarget && tierStat.failed === 0 ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m';
    console.log(`   Tier ${t}: ${tierStat.passed}/${tierStat.total} passed (Min Threshold: ${minTarget}) ${statusMark}`);
  }
  console.log(`=======================================================\n`);

  if (state.stats.failed > 0) {
    console.log(`FAILED TESTS DETAILS:`);
    state.results.filter(r => r.status === 'FAILED').forEach((r, idx) => {
      console.log(`\n${idx + 1}) [${r.id}] ${r.name}`);
      console.log(`   Tier: ${r.tier} | Feature: ${r.feature} | Suite: ${r.suite}`);
      console.log(`   ${r.stack}`);
    });
    console.log(`\n`);
  }
}

function getStats() {
  return state.stats;
}

module.exports = {
  assert: customAssert,
  customAssert,
  describe,
  test,
  it: test,
  run,
  runSuite,
  reset,
  resetStats: reset,
  getStats,
  setVerbose,
  setBail,
  printSummary
};
