import { describe as nodeDescribe, it as nodeIt } from 'node:test';

/**
 * Runner Utilities: Formatting, Summary Table Rendering & Test Registry
 */

export interface TierResult {
  tier: string;
  scope: string;
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  timeMs: number;
}

class TestRegistry {
  private activeTier: string = 'tier1';
  private stats: Map<
    string,
    { total: number; passed: number; failed: number; skipped: number; startTime: number; timeMs: number }
  > = new Map();

  constructor() {
    this.resetStats();
  }

  public resetStats() {
    this.stats.clear();
    const defaultTiers = ['tier1', 'tier2', 'tier3', 'tier4'];
    for (const t of defaultTiers) {
      this.stats.set(t, { total: 0, passed: 0, failed: 0, skipped: 0, startTime: 0, timeMs: 0 });
    }
  }

  public setActiveTier(tier: string) {
    this.activeTier = tier.toLowerCase();
    if (!this.stats.has(this.activeTier)) {
      this.stats.set(this.activeTier, {
        total: 0,
        passed: 0,
        failed: 0,
        skipped: 0,
        startTime: 0,
        timeMs: 0,
      });
    }
  }

  public getActiveTier(): string {
    return this.activeTier;
  }

  public startTierTimer(tier: string) {
    const tKey = tier.toLowerCase();
    const stat = this.stats.get(tKey);
    if (stat) {
      stat.startTime = performance.now();
    }
  }

  public stopTierTimer(tier: string) {
    const tKey = tier.toLowerCase();
    const stat = this.stats.get(tKey);
    if (stat && stat.startTime > 0) {
      stat.timeMs = Math.round(performance.now() - stat.startTime);
    }
  }

  public recordPass(tier: string) {
    const tKey = tier.toLowerCase();
    const stat = this.stats.get(tKey);
    if (stat) {
      stat.total++;
      stat.passed++;
    }
  }

  public recordFail(tier: string) {
    const tKey = tier.toLowerCase();
    const stat = this.stats.get(tKey);
    if (stat) {
      stat.total++;
      stat.failed++;
    }
  }

  public recordSkip(tier: string) {
    const tKey = tier.toLowerCase();
    const stat = this.stats.get(tKey);
    if (stat) {
      stat.total++;
      stat.skipped++;
    }
  }

  public getTierResult(tierKey: string, tierDisplayName: string, scope: string): TierResult {
    const stat = this.stats.get(tierKey.toLowerCase()) || {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      startTime: 0,
      timeMs: 0,
    };
    return {
      tier: tierDisplayName,
      scope,
      total: stat.total,
      passed: stat.passed,
      failed: stat.failed,
      skipped: stat.skipped,
      timeMs: stat.timeMs,
    };
  }
}

export const testRegistry = new TestRegistry();

export function describe(title: string, fn: () => void) {
  return nodeDescribe(title, fn);
}

export function test(title: string, fn: () => void | Promise<void>) {
  return nodeIt(title, async () => {
    const currentTier = testRegistry.getActiveTier();
    try {
      await fn();
      testRegistry.recordPass(currentTier);
    } catch (err) {
      testRegistry.recordFail(currentTier);
      throw err;
    }
  });
}

export const it = test;

/**
 * Creates a high-precision performance timer.
 */
export function createTimer() {
  const startTime = performance.now();
  return {
    start: () => performance.now(),
    elapsed: (): number => Math.round(performance.now() - startTime),
  };
}

/**
 * Formats duration in milliseconds into human-readable string.
 */
export function formatTime(ms: number): string {
  if (ms < 1000) {
    return `${Math.round(ms)}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Renders formatted execution summary table card for E2E Test Suite.
 */
export function renderSummaryTable(tierResults: TierResult[], totalTimeMs: number): string {
  const lines: string[] = [];

  const dividerDouble = '='.repeat(80);
  const dividerSingle = '-'.repeat(80);

  lines.push(dividerDouble);
  lines.push('CROWN WATCH CO. — E2E TEST SUITE EXECUTION SUMMARY');
  lines.push(dividerDouble);

  // Table header
  const hTier = 'Tier'.padEnd(7);
  const hScope = 'Scope'.padEnd(28);
  const hTotal = 'Total'.padStart(6);
  const hPassed = 'Passed'.padStart(8);
  const hFailed = 'Failed'.padStart(8);
  const hSkipped = 'Skipped'.padStart(9);
  const hTime = 'Time'.padStart(10);

  lines.push(`${hTier} ${hScope} ${hTotal} ${hPassed} ${hFailed} ${hSkipped} ${hTime}`);
  lines.push(dividerSingle);

  let grandTotal = 0;
  let grandPassed = 0;
  let grandFailed = 0;
  let grandSkipped = 0;

  for (const r of tierResults) {
    grandTotal += r.total;
    grandPassed += r.passed;
    grandFailed += r.failed;
    grandSkipped += r.skipped;

    const cTier = r.tier.padEnd(7);
    const cScope = r.scope.padEnd(28);
    const cTotal = String(r.total).padStart(6);
    const cPassed = String(r.passed).padStart(8);
    const cFailed = String(r.failed).padStart(8);
    const cSkipped = String(r.skipped).padStart(9);
    const cTime = formatTime(r.timeMs).padStart(10);

    lines.push(`${cTier} ${cScope} ${cTotal} ${cPassed} ${cFailed} ${cSkipped} ${cTime}`);
  }

  lines.push(dividerSingle);

  const tTier = 'TOTAL'.padEnd(7);
  const tScope = ''.padEnd(28);
  const tTotal = String(grandTotal).padStart(6);
  const tPassed = String(grandPassed).padStart(8);
  const tFailed = String(grandFailed).padStart(8);
  const tSkipped = String(grandSkipped).padStart(9);
  const tTime = formatTime(totalTimeMs).padStart(10);

  lines.push(`${tTier} ${tScope} ${tTotal} ${tPassed} ${tFailed} ${tSkipped} ${tTime}`);
  lines.push(dividerDouble);

  const passRate = grandTotal > 0 ? ((grandPassed / grandTotal) * 100).toFixed(1) : '100.0';
  const statusStr =
    grandFailed === 0 ? `PASSED (${passRate}% Pass Rate)` : `FAILED (${grandFailed} failures)`;

  lines.push(`STATUS: ${statusStr}`);
  lines.push(dividerDouble);

  return lines.join('\n');
}
