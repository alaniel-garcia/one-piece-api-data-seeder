import { generateValidSubDocUrl, validateSubDocArraysDuplicity } from '@utils/helpers/validations';
import type { SubDocument } from 'types';

let subDocs: Array<SubDocument>;
const errorMessage = 'Input Array must not have duplicate property values between sub documents';

// subDocs as unknown as Array<SubDocument>;

beforeEach(() => {
  subDocs = [
    { id: 1, name: 'doc1', url: generateValidSubDocUrl('characters') },
    { id: 2, name: 'doc2', url: generateValidSubDocUrl('characters') },
    { id: 3, name: 'doc3', url: generateValidSubDocUrl('characters') }
  ];
});

describe('validateSubDocArraysDuplicity function', () => {
  it('should return true when given an array with unique sub documents', () => {
    expect(validateSubDocArraysDuplicity(subDocs)).toBe(true);
  });
  it('should throw error when given an array where two sub documents have same id', () => {
    subDocs[1].id = 1;
    expect(() => validateSubDocArraysDuplicity(subDocs)).toThrowError(errorMessage);
  });
  it('should throw error when given an array where two sub documents have same name', () => {
    subDocs[2].name = 'doc1';
    expect(() => validateSubDocArraysDuplicity(subDocs)).toThrowError(errorMessage);
  });
  it('should throw error when given an array where two sub documents have same name and id', () => {
    subDocs[2].id = 1;
    subDocs[2].name = 'doc1';
    expect(() => validateSubDocArraysDuplicity(subDocs)).toThrowError(errorMessage);
  });
  it('tests the performance of the function with a large array', () => {
    const subDocArray = [];
    for (let i = 1; i <= 100000; i++) {
      subDocArray.push({ id: i, name: `subDoc${i}`, url: generateValidSubDocUrl('characters') });
    }
    const startTime = performance.now();
    expect(validateSubDocArraysDuplicity(subDocArray)).toBe(true);
    const endTime = performance.now();
    const timeElapsed = endTime - startTime;
    expect(timeElapsed).toBeLessThan(100);
  });
});
