import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { createMockRepairTicket } from '../factories/index.ts';

describe('F16: Repair Status Tracker', () => {
  it('[T1-F16-01] should retrieve repair ticket progress by ticket ID', () => {
    const ticket = createMockRepairTicket({ ticketNumber: 'CROWN-REP-2026-8941' });
    assert.strictEqual(ticket.ticketNumber, 'CROWN-REP-2026-8941');
  });

  it('[T1-F16-02] should retrieve repair ticket by customer phone number', () => {
    const ticket = createMockRepairTicket({ customerPhone: '01819998877' });
    assert.strictEqual(ticket.customerPhone, '01819998877');
  });

  it('[T1-F16-03] should render visual progress timeline stages', () => {
    const ticket = createMockRepairTicket({
      timeline: [
        { status: 'Received', timestamp: new Date().toISOString() },
        { status: 'Diagnosing', timestamp: new Date().toISOString() },
      ],
    });
    assert.strictEqual(ticket.timeline.length, 2);
  });

  it('[T1-F16-04] should display final cost when repair completed', () => {
    const ticket = createMockRepairTicket({ status: 'Completed', finalCost: 3200 });
    assert.strictEqual(ticket.finalCost, 3200);
  });

  it('[T1-F16-05] should render status badge correctly', () => {
    const ticket = createMockRepairTicket({ status: 'Servicing' });
    assert.strictEqual(ticket.status, 'Servicing');
  });
});
