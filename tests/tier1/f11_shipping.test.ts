import { describe, it } from '../helpers/runner_utils.ts';
import { assertDistrictShippingFee } from '../helpers/assertions.ts';

describe('F11: District Shipping Fee', () => {
  it('[T1-F11-01] should charge 60 BDT for Dhaka district delivery', () => {
    assertDistrictShippingFee('Dhaka', 60);
  });

  it('[T1-F11-02] should charge 120 BDT for Chittagong district delivery', () => {
    assertDistrictShippingFee('Chittagong', 120);
  });

  it('[T1-F11-03] should charge 120 BDT for Sylhet district delivery', () => {
    assertDistrictShippingFee('Sylhet', 120);
  });

  it('[T1-F11-04] should charge 120 BDT for Rajshahi district delivery', () => {
    assertDistrictShippingFee('Rajshahi', 120);
  });

  it('[T1-F11-05] should charge 120 BDT for any of remaining 63 BD districts', () => {
    assertDistrictShippingFee('Coxs Bazar', 120);
  });
});
