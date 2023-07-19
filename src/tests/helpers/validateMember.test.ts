import { validateCharacterInMember, validateMembership } from '@utils/helpers/validations/memberValidations';
import { generateValidSubDocUrl } from '@utils/helpers/validations';
import { BASE_URL } from '@utils/index';

describe('Member validation specific functions', () => {
  describe('validateMembership function', () => {
    it('should return true on valid membership inputs', () => {
      expect(
        validateMembership({ id: 1, name: 'Straw Hat Pirates', type: 'Crew', url: generateValidSubDocUrl('crews') })
      ).toBe(true);
      expect(validateMembership({ id: 1, name: 'Marines', type: 'Group', url: generateValidSubDocUrl('groups') })).toBe(
        true
      );
    });
    it('should throw error on invalid membership inputs', () => {
      const errorMessage = 'Type property must be "Crew" or "Group" string';
      expect(() =>
        validateMembership({
          id: 1,
          name: 'Straw Hat Pirates',
          type: 'crew' as 'Crew',
          url: generateValidSubDocUrl('crews')
        })
      ).toThrowError(errorMessage);
      expect(() =>
        validateMembership({
          id: 1,
          name: 'Straw Hat Pirates',
          type: '' as 'Crew',
          url: generateValidSubDocUrl('crews')
        })
      ).toThrowError(errorMessage);
      expect(() =>
        validateMembership({ id: 1, name: 'Marines', type: 'group' as 'Group', url: generateValidSubDocUrl('groups') })
      ).toThrow(errorMessage);
      expect(() =>
        validateMembership({ id: 1, name: 'Marines', type: '' as 'Group', url: generateValidSubDocUrl('groups') })
      ).toThrow(errorMessage);
    });
  });
  describe('validateCharacterInMember', () => {
    it('should return true on valid character subdocs', () => {
      expect(
        validateCharacterInMember({ id: 1, name: 'Monkey D. Luffy', url: generateValidSubDocUrl('characters') })
      ).toBe(true);
      expect(
        validateCharacterInMember({
          id: 2,
          name: 'Roronoa Zoro',
          url: generateValidSubDocUrl('characters'),
          image: `${generateValidSubDocUrl('characters', true)}`
        })
      ).toBe(true);
    });
    it('should throw error on invalid url for image property inputs', () => {
      const characterSubDoc = {
        id: 5,
        name: 'Vinsmoke Sanji',
        url: generateValidSubDocUrl('characters'),
        image: ''
      };
      expect(() => validateCharacterInMember(characterSubDoc)).toThrow();
      characterSubDoc.image = `${BASE_URL}`;
      expect(() => validateCharacterInMember(characterSubDoc)).toThrow();
    });
  });
});
