/**
 * State Reset Helper for Test Environment Isolation
 */

/**
 * Resets application data store to pristine seed data before or after test execution.
 * 
 * @param baseUrl Optional base URL of running application. If omitted, resets in-memory mock state.
 */
export async function resetDatabaseState(baseUrl?: string): Promise<boolean> {
  if (baseUrl) {
    try {
      const response = await fetch(`${baseUrl.replace(/\/$/, '')}/api/admin/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  // Pure in-memory / unit test reset state stub
  return true;
}
