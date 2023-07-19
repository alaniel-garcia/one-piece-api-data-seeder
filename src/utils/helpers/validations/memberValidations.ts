import type { Membership, SubDocument } from 'types';
import { validateSubDoc, validateUrl } from '.';

export function validateMembership(value: Membership): true {
  const { type, ...subDoc } = value;

  validateSubDoc(subDoc);

  if (!(type === 'Crew' || type === 'Group')) throw new Error('Type property must be "Crew" or "Group" string');

  return true;
}

export function validateCharacterInMember(value: SubDocument & { image?: string }): true {
  const { image, ...subDoc } = value;

  validateSubDoc(subDoc);

  if (image != null) validateUrl(image);

  return true;
}
