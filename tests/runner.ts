import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  testRegistry,
  renderSummaryTable,
  type TierResult,
  createTimer,
} from './helpers/runner_utils.ts';

interface TierSpec {
  id: string;
  name: string;
  scope: string;
  dir: string;
}

const TIERS: TierSpec[] = [
  { id: 'tier1', name: 'Tier 1', scope: 'Feature Coverage (F01-F28)', dir: 'tests/tier1' },
  { id: 'tier2', name: 'Tier 2', scope: 'Boundary & Edge Cases', dir: 'tests/tier2' },
  { id: 'tier3', name: 'Tier 3', scope: 'Pairwise Combinations', dir: 'tests/tier3' },
  { id: 'tier4', name: 'Tier 4', scope: 'E2E Application Scenarios', dir: 'tests/tier4' },
];

function parseCLIArgs() {
  const args = process.argv.slice(2);
  let targetTier: string | null = null;
  let targetFeature: string | null = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--tier=')) {
      targetTier = arg.split('=')[1];
    } else if (arg === '--tier' && i + 1 < args.length) {
      targetTier = args[i + 1];
      i++;
    } else if (arg.startsWith('--feature=')) {
      targetFeature = arg.split('=')[1];
    } else if (arg === '--feature' && i + 1 < args.length) {
      targetFeature = args[i + 1];
      i++;
    }
  }

  return { targetTier, targetFeature };
}

function normalizeTierFilter(tierInput: string | null): string | null {
  if (!tierInput) return null;
  const cleaned = tierInput.trim().toLowerCase();
  if (cleaned === '1' || cleaned === 'tier1') return 'tier1';
  if (cleaned === '2' || cleaned === 'tier2') return 'tier2';
  if (cleaned === '3' || cleaned === 'tier3') return 'tier3';
  if (cleaned === '4' || cleaned === 'tier4') return 'tier4';
  return cleaned;
}

async function runMasterTestSuite() {
  const { targetTier, targetFeature } = parseCLIArgs();
  const normalizedTier = normalizeTierFilter(targetTier);

  const activeTiers = TIERS.filter((t) => {
    if (normalizedTier) {
      return t.id === normalizedTier;
    }
    return true;
  });

  testRegistry.resetStats();
  const totalTimer = createTimer();
  const results: TierResult[] = [];

  const rootDir = process.cwd();

  for (const tier of activeTiers) {
    const tierDirPath = path.join(rootDir, tier.dir);

    if (!fs.existsSync(tierDirPath)) {
      results.push({
        tier: tier.name,
        scope: tier.scope,
        total: 0,
        passed: 0,
        failed: 0,
        skipped: 0,
        timeMs: 0,
      });
      continue;
    }

    const allFiles = fs
      .readdirSync(tierDirPath)
      .filter((file) => file.endsWith('.test.ts') || file.endsWith('.ts'))
      .filter((file) => !file.endsWith('.d.ts'));

    const matchedFiles = allFiles.filter((file) => {
      if (!targetFeature) return true;
      const lowerFeature = targetFeature.toLowerCase();
      return file.toLowerCase().includes(lowerFeature);
    });

    if (matchedFiles.length === 0) {
      results.push({
        tier: tier.name,
        scope: tier.scope,
        total: 0,
        passed: 0,
        failed: 0,
        skipped: 0,
        timeMs: 0,
      });
      continue;
    }

    testRegistry.setActiveTier(tier.id);
    testRegistry.startTierTimer(tier.id);

    for (const fileName of matchedFiles) {
      const fullPath = path.join(tierDirPath, fileName);
      const fileUrl = pathToFileURL(fullPath).href;

      try {
        await import(fileUrl);
      } catch (err) {
        console.error(`Error executing test file ${fileName}:`, err);
        testRegistry.recordFail(tier.id);
      }
    }

    // Flush async test execution queue in node:test
    await new Promise((resolve) => setTimeout(resolve, 50));

    testRegistry.stopTierTimer(tier.id);
    results.push(testRegistry.getTierResult(tier.id, tier.name, tier.scope));
  }

  const grandTotalTimeMs = totalTimer.elapsed();
  const summaryTable = renderSummaryTable(results, grandTotalTimeMs);

  console.log('\n' + summaryTable + '\n');

  const totalFailures = results.reduce((acc, curr) => acc + curr.failed, 0);
  if (totalFailures > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runMasterTestSuite().catch((err) => {
  console.error('Fatal error running master test suite:', err);
  process.exit(1);
});
