import { db } from '@/lib/db';
import { UserTelemetryProfile } from '@/types';

describe('Admin User Telemetry & IP Storage Tests', () => {
  beforeEach(() => {
    db.clearTelemetryProfiles();
  });

  it('should save and retrieve a user telemetry profile by IP', () => {
    const sampleProfile: UserTelemetryProfile = {
      id: 'tel-192_168_1_1',
      ip: '192.168.1.1',
      deviceType: 'mobile',
      os: 'Android 14',
      browser: 'Chrome 122',
      cpuCores: 8,
      systemRam: '8GB',
      webglRenderer: 'Adreno 740',
      screenDpi: 3,
      screenResolution: '1080x2400',
      connectionSpeed: '4g',
      topCategory: 'Watches',
      targetBudget: 25000,
      totalViews: 1,
      lastSeen: new Date().toISOString(),
      vector: {
        brandAffinity: { Casio: 0.8, Seiko: 0.2 },
        categoryAffinity: { Watches: 0.9 },
        pricePoint: 25000,
      },
      topRecommendations: [
        {
          productId: '1',
          productTitle: 'Casio G-Shock GA-2100',
          brand: 'Casio',
          price: 14500,
          matchPercentage: 98,
          rationale: 'Mobile Sport Watch Match',
        },
      ],
    };

    const saved = db.saveTelemetryProfile(sampleProfile);
    expect(saved.ip).toBe('192.168.1.1');
    expect(saved.totalViews).toBe(1);

    const fetched = db.getTelemetryProfileByIp('192.168.1.1');
    expect(fetched).toBeDefined();
    expect(fetched?.os).toBe('Android 14');
    expect(fetched?.cpuCores).toBe(8);
  });

  it('should update view count when an existing IP visits again', () => {
    const sampleProfile: UserTelemetryProfile = {
      id: 'tel-10_0_0_5',
      ip: '10.0.0.5',
      deviceType: 'desktop',
      os: 'Windows 11',
      browser: 'Chrome 122',
      cpuCores: 16,
      systemRam: '16GB',
      webglRenderer: 'NVIDIA RTX 4080',
      screenDpi: 2,
      screenResolution: '2560x1440',
      connectionSpeed: '4g',
      topCategory: 'Watches',
      targetBudget: 45000,
      totalViews: 1,
      lastSeen: new Date().toISOString(),
      vector: {
        brandAffinity: { Seiko: 0.9 },
        categoryAffinity: { Watches: 1.0 },
        pricePoint: 45000,
      },
      topRecommendations: [],
    };

    db.saveTelemetryProfile(sampleProfile);
    const updated = db.saveTelemetryProfile(sampleProfile);

    expect(updated.totalViews).toBe(2);

    const profiles = db.getTelemetryProfiles();
    expect(profiles.length).toBe(1);
    expect(profiles[0].ip).toBe('10.0.0.5');
  });
});
