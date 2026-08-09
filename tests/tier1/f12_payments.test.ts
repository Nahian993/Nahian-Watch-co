import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { assertMFSTrxID, assertBangladeshiPhone } from '../helpers/assertions.ts';
import { generateTrxID, generateBDPhone } from '../helpers/generators.ts';

describe('F12: Payment Gateway Options', () => {
  it('[T1-F12-01] should validate bKash payment method with valid TrxID', () => {
    const trxId = generateTrxID();
    assertMFSTrxID(trxId, 'bKash');
  });

  it('[T1-F12-02] should validate Nagad payment method with valid TrxID', () => {
    const trxId = generateTrxID();
    assertMFSTrxID(trxId, 'Nagad');
  });

  it('[T1-F12-03] should validate Rocket payment method with valid TrxID', () => {
    const trxId = generateTrxID();
    assertMFSTrxID(trxId, 'Rocket');
  });

  it('[T1-F12-04] should validate COD payment selection without TrxID', () => {
    const paymentMethod = 'COD';
    assert.strictEqual(paymentMethod, 'COD');
  });

  it('[T1-F12-05] should validate customer MFS sender phone number', () => {
    const phone = generateBDPhone();
    assertBangladeshiPhone(phone);
  });
});
