import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sanitizeInput } from '@/lib/security';
import { UserTelemetryProfile } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    const body = await req.json();

    const profile: UserTelemetryProfile = {
      id: `tel-${ip.replace(/[^a-zA-Z0-9]/g, '_')}`,
      ip: sanitizeInput(ip),
      deviceType: body.deviceType || 'desktop',
      os: sanitizeInput(body.os || 'Unknown OS'),
      browser: sanitizeInput(body.browser || 'Unknown Browser'),
      cpuCores: Number(body.cpuCores) || 4,
      systemRam: sanitizeInput(body.systemRam || '4GB'),
      webglRenderer: sanitizeInput(body.webglRenderer || 'Standard WebGL'),
      screenDpi: Number(body.screenDpi) || 1,
      screenResolution: sanitizeInput(body.screenResolution || '1920x1080'),
      connectionSpeed: sanitizeInput(body.connectionSpeed || '4g'),
      topCategory: sanitizeInput(body.topCategory || 'Watches'),
      targetBudget: Number(body.targetBudget) || 15000,
      totalViews: Number(body.totalViews) || 1,
      lastSeen: new Date().toISOString(),
      vector: {
        brandAffinity: body.vector?.brandAffinity || { Casio: 0.5, Seiko: 0.3 },
        categoryAffinity: body.vector?.categoryAffinity || { Watches: 0.8 },
        pricePoint: Number(body.vector?.pricePoint) || 15000,
      },
      topRecommendations: body.topRecommendations || [
        {
          productId: '1',
          productTitle: 'Casio G-Shock Casioak GA-2100',
          brand: 'Casio',
          price: 14500,
          matchPercentage: 98,
          rationale: 'Top Match for Mobile & Sport Watch Affinity',
        },
      ],
    };

    const saved = db.saveTelemetryProfile(profile);

    return NextResponse.json({ success: true, profile: saved });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to record telemetry' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const profiles = db.getTelemetryProfiles();
    return NextResponse.json({ success: true, profiles, total: profiles.length });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to fetch telemetry profiles' }, { status: 500 });
  }
}
