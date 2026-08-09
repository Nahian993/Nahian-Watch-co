/**
 * Repair Ticket Factory for E2E Test Suite
 */

export interface TimelineEntry {
  status: string;
  timestamp: string;
  note?: string;
}

export interface RepairTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerPhone: string;
  district: string;
  watchBrand: string;
  watchModel: string;
  watchType: 'Quartz' | 'Automatic' | 'Digital' | 'Smartwatch';
  serviceRequested: 'Battery Replacement' | 'Glass Replacement' | 'Movement Overhaul' | 'Water Resistance Restorations' | 'Polishing';
  problemDescription: string;
  estimatedCostRange: { min: number; max: number };
  finalCost?: number;
  estimatedTurnaround: string;
  status: 'Received' | 'Diagnosing' | 'Servicing' | 'Awaiting Parts' | 'Completed' | 'Delivered';
  timeline: TimelineEntry[];
  createdAt: string;
}

/**
 * Creates a mock RepairTicket object with sensible defaults and optional overrides.
 */
export function createMockRepairTicket(overrides?: Partial<RepairTicket>): RepairTicket {
  const uniqueId = `rep_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;

  return {
    id: uniqueId,
    ticketNumber: `CROWN-REP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: 'Rahim Chowdhury',
    customerPhone: '01819998877',
    district: 'Chittagong',
    watchBrand: 'Seiko',
    watchModel: '5 Sports Automatic SRPE51',
    watchType: 'Automatic',
    serviceRequested: 'Movement Overhaul',
    problemDescription: 'Watch gains 15 minutes per day and power reserve is low.',
    estimatedCostRange: { min: 2500, max: 4000 },
    estimatedTurnaround: '3-5 Days',
    status: 'Diagnosing',
    timeline: [
      {
        status: 'Received',
        timestamp: new Date().toISOString(),
        note: 'Watch received at Dhaka main service hub.',
      },
    ],
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Generates an array of mock RepairTicket objects.
 */
export function createMockRepairTickets(count: number, overrides?: Partial<RepairTicket>): RepairTicket[] {
  return Array.from({ length: count }, (_, idx) =>
    createMockRepairTicket({
      id: `rep_mock_${idx + 1}`,
      ticketNumber: `CROWN-REP-2026-${8000 + idx}`,
      ...overrides,
    })
  );
}
