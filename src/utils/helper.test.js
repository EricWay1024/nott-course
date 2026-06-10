import { describe, it, expect } from 'vitest';
import { camelCaseToWords, addKeys, processStr } from './helper';

describe('camelCaseToWords', () => {
  it('splits camelCase into capitalised words', () => {
    expect(camelCaseToWords('helloWorld')).toBe('Hello World');
  });

  it('capitalises a single lowercase word', () => {
    expect(camelCaseToWords('offering')).toBe('Offering');
  });

  it('passes through non-string input unchanged', () => {
    expect(camelCaseToWords(42)).toBe(42);
  });
});

describe('addKeys', () => {
  it('returns an empty array for empty input', () => {
    expect(addKeys([])).toEqual([]);
  });

  it('leaves data untouched when it already has an id', () => {
    const data = [{ id: 7, code: 'ABC' }];
    expect(addKeys(data)).toBe(data);
  });

  it('derives an id from the code field', () => {
    expect(addKeys([{ code: 'MATH101' }])).toEqual([{ code: 'MATH101', id: 'MATH101' }]);
  });

  it('de-duplicates rows that share a code', () => {
    const result = addKeys([{ code: 'A' }, { code: 'A' }, { code: 'B' }]);
    expect(result).toEqual([{ code: 'A', id: 'A' }, { code: 'B', id: 'B' }]);
  });

  it('falls back to the array index when there is no id or code', () => {
    expect(addKeys([{ x: 1 }])).toEqual([{ x: 1, id: 0 }]);
  });
});

describe('processStr', () => {
  it('decodes HTML entities', () => {
    expect(processStr('Tom &amp; Jerry')).toBe('Tom & Jerry');
  });

  it('decodes repeated entities', () => {
    expect(processStr('Hello &amp;&amp; World')).toBe('Hello && World');
  });

  it('strips HTML tags down to text', () => {
    expect(processStr('<b>bold</b>')).toBe('bold');
  });

  it('does not execute or retain script content', () => {
    expect(processStr('<script>alert(1)</script>safe')).toBe('safe');
  });

  it('passes through non-string input unchanged', () => {
    expect(processStr(42)).toBe(42);
  });
});
