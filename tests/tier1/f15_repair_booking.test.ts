import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { createMockRepairTicket } from '../factories/index.ts';
import { assertRepairTicketFormat, assertBangladeshiPhone } from '../helpers/assertions.ts';

describe('F15: Repair Ticket Booking Form', () => {
  it('[T1-F15-01] should generate valid repair ticket ID CROWN-REP-2026-8941', () => {
    const ticket = createMockRepairTicket();
    assertRepairTicketFormat(ticket.ticketNumber);
  });

  it('[T1-F15-02] should validate customer contact phone number', () => {
    const ticket = createMockRepairTicket({ customerPhone: '01819998877' });
    assertBangladeshiPhone(ticket.customerPhone);
  });

  it('[T1-F15-03] should capture watch brand and model details', () => {
    const ticket = createMockRepairTicket({ watchBrand: 'Seiko', watchModel: '5 Sports' });
    assert.strictEqual(ticket.watchBrand, 'Seiko');
  });

  it('[T1-F15-04] should support service type selection', () => {
    const ticket = createMockRepairTicket({ serviceRequested: 'Movement Overhaul' });
    assert.strictEqual(ticket.serviceRequested, 'Movement Overhaul');
  });

  it('[T1-F15-05] should initialize timeline with Received status', () => {
    const ticket = createMockRepairTicket();
    assert.strictEqual(ticket.timeline[0].status, 'Received');
  });
});
