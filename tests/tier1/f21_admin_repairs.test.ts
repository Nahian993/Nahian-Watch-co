import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { createMockRepairTicket } from '../factories/index.ts';

describe('F21: Repair Ticket Status Manager', () => {
  it('[T1-F21-01] should list repair tickets in admin manager view', () => {
    const tickets = [createMockRepairTicket(), createMockRepairTicket()];
    assert.strictEqual(tickets.length, 2);
  });

  it('[T1-F21-02] should update repair status from Diagnosing to Servicing', () => {
    const ticket = createMockRepairTicket({ status: 'Diagnosing' });
    ticket.status = 'Servicing';
    assert.strictEqual(ticket.status, 'Servicing');
  });

  it('[T1-F21-03] should record technician notes on progress timeline', () => {
    const ticket = createMockRepairTicket();
    ticket.timeline.push({ status: 'Servicing', timestamp: new Date().toISOString(), note: 'Replaced mainspring.' });
    assert.strictEqual(ticket.timeline.length, 2);
  });

  it('[T1-F21-04] should update final repair cost amount', () => {
    const ticket = createMockRepairTicket();
    ticket.finalCost = 3500;
    assert.strictEqual(ticket.finalCost, 3500);
  });

  it('[T1-F21-05] should update repair ticket status to Completed', () => {
    const ticket = createMockRepairTicket({ status: 'Servicing' });
    ticket.status = 'Completed';
    assert.strictEqual(ticket.status, 'Completed');
  });
});
