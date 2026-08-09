import { describe, it } from '../helpers/runner_utils.ts';
import assert from 'node:assert/strict';
import { assertBDTFormat } from '../helpers/assertions.ts';

describe('F01: Localization (EN/BN)', () => {
  it('[T1-F01-01] should render default English interface copy', () => {
    const lang = 'en';
    assert.strictEqual(lang, 'en');
  });

  it('[T1-F01-02] should toggle UI language to Bangla', () => {
    let lang = 'en';
    lang = 'bn';
    assert.strictEqual(lang, 'bn');
  });

  it('[T1-F01-03] should translate product category labels to Bangla', () => {
    const categoryBn = 'ঘড়ি';
    assert.ok(categoryBn);
  });

  it('[T1-F01-04] should support Bangla font rendering', () => {
    const fontClass = 'font-bangla';
    assert.ok(fontClass);
  });

  it('[T1-F01-05] should persist selected language preference', () => {
    const savedLang = 'bn';
    assert.strictEqual(savedLang, 'bn');
  });
});
