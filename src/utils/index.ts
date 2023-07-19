export const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://www.onepieceapi.net/api' : `http://localhost:5000/api`;

export const collections = {
  character: 'characters',
  race: 'races',
  devil_fruit: 'devil_fruits',
  haki_ability: 'haki_abilities',
  group: 'groups',
  crew: 'crews',
  member: 'members',
  ship: 'ships',
  location: 'locations'
};
