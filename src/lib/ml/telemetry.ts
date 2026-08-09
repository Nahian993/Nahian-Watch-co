import { extractHardwareMetrics } from './hardware';

export async function syncClientTelemetry(topCategory = 'Watches', targetBudget = 18000) {
  if (typeof window === 'undefined') return;

  try {
    const hardware = extractHardwareMetrics();

    const payload = {
      ...hardware,
      topCategory,
      targetBudget,
      vector: {
        brandAffinity: { Casio: 0.6, Seiko: 0.3, Citizen: 0.1 },
        categoryAffinity: { Watches: 0.8, Smartwatches: 0.2 },
        pricePoint: targetBudget,
      },
      topRecommendations: [
        {
          productId: '1',
          productTitle: 'Casio G-Shock Casioak GA-2100-1A1',
          brand: 'Casio',
          price: 14500,
          matchPercentage: 98,
          rationale: `Matched for ${hardware.deviceType} on ${hardware.os} (${hardware.systemRam} RAM)`,
        },
        {
          productId: '2',
          productTitle: 'Seiko 5 Sports Automatic SRPD55K1',
          brand: 'Seiko',
          price: 28500,
          matchPercentage: 92,
          rationale: `High DPI (${hardware.screenDpi}x) Luxury Recommendation`,
        },
      ],
    };

    await fetch('/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('Failed to sync telemetry', err);
  }
}
