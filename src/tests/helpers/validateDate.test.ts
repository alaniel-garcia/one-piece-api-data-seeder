import { validateIsoStringDate } from '@utils/helpers/validations';

describe('validateIsoStringDate function', () => {
  it('should return true on valid dates', () => {
    expect(validateIsoStringDate(new Date().toDateString())).toBe(true);
    expect(validateIsoStringDate(new Date().toISOString())).toBe(true);
    expect(validateIsoStringDate(new Date().toUTCString())).toBe(true);
  });

  it('should trow error on invalid inputs', () => {
    expect(() => validateIsoStringDate('invalid date')).toThrowError(
      'Date passed is not in a valid format. Invalid value was: invalid date'
    );
    expect(() => validateIsoStringDate('2022-03-36')).toThrowError(
      'Date passed is not in a valid format. Invalid value was: 2022-03-36'
    );
    expect(() => validateIsoStringDate(new Date('invalid date') as unknown as string)).toThrowError(
      'Date passed is not in a valid format. Invalid value was: Invalid Date'
    );
    expect(() => validateIsoStringDate([] as unknown as string)).toThrowError(
      'Date passed is not in a valid format. Invalid value was: '
    );
    expect(() => validateIsoStringDate({} as unknown as string)).toThrowError(
      'Date passed is not in a valid format. Invalid value was: [object Object]'
    );
  });
});
