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

export type Reference = number | Schema.Types.ObjectId;

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
  race: Schema.Types.ObjectId;
  origin: string;
  status: Status;
  birthday?: string | null;
  main_occupations?: Array<string> | null;
  devil_fruit?: Reference | Array<Reference> | null;
  haki_abilities?: Array<Schema.Types.ObjectId> | null;
  bounties?: Array<string> | null;
  height?: string | null;
  debut: Array<string>;
  backstory: string;
  image?: string | null;
  url: string;
  created: string;
  last_updated: string;
}

export interface RaceDocument extends Document {
  id: number;
  name: string;
  homeland: string;
  about: string;
  image?: string | null;
  url: string;
  created: string;
  last_updated: string;
}

export interface DevilFruitDocument extends Document {
  id: number;
  name: string;
  alias?: 'Gomu Gomu no Mi' | null; // Apply only for Hito Hito no Mi, Model: Nika
  type: DevilFruitType;
  meaning: string;
  description: string;
  current_user?: Reference | null;
  image?: string | null;
  url: string;
  created: string;
  last_updated: string;
}

export interface HakiAbilityDocument extends Document {
  id: number;
  name: HakiAbilityName;
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
  members: Array<Reference>;
  background: string;
  image?: string | null;
  url: string;
  created: string;
  last_updated: string;
}

export interface CrewDocument extends Document {
  id: number;
  name: string;
  captain: Schema.Types.ObjectId;
  flag?: string | null;
  main_ship?: Reference | null;
  members: Array<Reference>;
  background: string;
  image?: string | null;
  url: string;
  created: string;
  last_updated: string;
}

export interface MemberDocument extends Document {
  id: number;
  character: Schema.Types.ObjectId;
  membership_type: 'Crew' | 'Group';
  membership: Schema.Types.ObjectId;
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
  ownership_type: 'Crew' | 'Group';
  ownership: Schema.Types.ObjectId;
  flag?: string | null;
  image?: string | null;
  url: string;
  created: string;
  last_updated: string;
}

export interface LocationDocument extends Document {
  id: number;
  name: string;
  type: string;
  description: string;
  population?: string | null;
  government?: string | null;
  history: string;
  image: string;
  url: string;
  created: string;
  last_updated: string;
}
