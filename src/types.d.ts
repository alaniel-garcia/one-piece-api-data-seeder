import type { Document, Schema } from 'mongoose';

// API paths

export type CollectionsPaths =
  | 'characters'
  | 'races'
  | 'devil_fruits'
  | 'haki_abilities'
  | 'groups'
  | 'crews'
  | 'members'
  | 'ships'
  | 'locations';

// Subdocs and enums

export interface SubDocument {
  id: number;
  name: string;
  url: string;
}

export type NewSubDoc = number | Schema.Types.ObjectId;

export interface Membership extends SubDocument {
  type: 'Crew' | 'Group';
}

export interface Ownership {
  id?: number;
  type: string;
  name?: string;
}

export interface LuffyDevilFruitSubDoc extends SubDocument {
  id: 1;
  name: 'Hito Hito no Mi, Model: Nika';
  alias: 'Gomu Gomu no Mi';
}

export type Race = NewSubDoc;
export type HakiAbility = SubDocument & { name: HakiAbilityName };
export type Status = 'Alive' | 'Deceased' | 'Unknown';
export type HakiAbilityName = 'Armament' | 'Observation' | 'Conqueror';
export type DevilFruitType = 'Paramecia' | 'Logia' | 'Zoan' | 'Mythical Zoan';

// Documents

export type DocumentTypes =
  | CharacterDocument
  | RaceDocument
  | DevilFruitDocument
  | HakiAbilityDocument
  | GroupDocument
  | CrewDocument
  | MemberDocument
  | ShipDocument
  | LocationDocument;

export interface CharacterDocument extends Document {
  id: number;
  name: string;
  gender: string;
  race: Race;
  origin: string;
  status: Status;
  birthday?: string;
  main_occupations?: Array<string>;
  devil_fruit?: NewSubDoc | Array<NewSubDoc>;
  haki_abilities?: Array<HakiAbilities>;
  bounties?: Array<string>;
  height?: string;
  debut: Array<string>;
  backstory: string;
  image?: string;
  url: string;
  created: string;
  last_updated: string;
}

export interface RaceDocument extends Document {
  id: number;
  name: string;
  homeland: string;
  about: string;
  image?: string;
  url: string;
  created: string;
  last_updated: string;
}

export interface DevilFruitDocument extends Document {
  id: number;
  name: string;
  alias?: 'Gomu Gomu no Mi'; // Apply only for Hito Hito no Mi, Model: Nika
  type: DevilFruitType;
  meaning: string;
  description: string;
  current_user?: SubDocument;
  image?: string;
  url: string;
  created: string;
  last_updated: string;
}

export interface HakiAbilityDocument extends Document {
  id: number;
  name: string;
  description: string;
  users: Array<Schema.Types.ObjectId>;
  image: string;
  url: string;
  created: string;
  last_updated: string;
}

export interface GroupDocument extends Document {
  id: number;
  name: string;
  members: Array<SubDocument>;
  background: string;
  image?: string;
  url: string;
  created: string;
  last_updated: string;
}

export interface CrewDocument extends Document {
  id: number;
  name: string;
  captain: SubDocument;
  flag?: string;
  main_ship?: SubDocument;
  members: Array<SubDocument>;
  background: string;
  image?: string;
  url: string;
  created: string;
  last_updated: string;
}

export interface MemberDocument extends Document {
  id: number;
  character: SubDocument & { image?: string };
  membership: Membership;
  rol: string;
  status: string;
  details: string;
  url: string;
  created: string;
  last_updated: string;
}

export interface ShipDocument extends Document {
  id: number;
  name: string;
  description: string;
  ownership: Ownership;
  flag?: string;
  image?: string;
  url: string;
  created: string;
  last_updated: string;
}

export interface LocationDocument extends Document {
  id: number;
  name: string;
  type: string;
  description: string;
  population?: string;
  government?: string;
  history: string;
  image: string;
  url: string;
  created: string;
  last_updated: string;
}
