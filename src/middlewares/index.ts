import type {
  CharacterDocument,
  CollectionsPaths,
  CrewDocument,
  DevilFruitDocument,
  GroupDocument,
  HakiAbilityDocument,
  LocationDocument,
  MemberDocument,
  RaceDocument,
  ShipDocument
} from 'types';
import { BASE_URL } from '@utils/index';
import type mongoose from 'mongoose';

type DocumentTypes =
  | CharacterDocument
  | RaceDocument
  | DevilFruitDocument
  | HakiAbilityDocument
  | GroupDocument
  | CrewDocument
  | MemberDocument
  | ShipDocument
  | LocationDocument;

export function generateImageField<
  // exclude Member document type because Member has no image property
  T extends Exclude<DocumentTypes, MemberDocument>
>(schema: mongoose.Schema<T>, path: CollectionsPaths): void {
  schema.pre('save', function (next) {
    const document = this as T;
    if ((document.isNew && document.image != null) || document.isModified('id')) {
      document.image = `${BASE_URL}/${path}/image/${document.id}`;
    }

    next();
  });
}
export function generateUrlField<T extends DocumentTypes>(schema: mongoose.Schema<T>, path: CollectionsPaths): void {
  schema.pre('save', function (next) {
    const document = this as T;
    if (document.isNew) {
      document.url = `${BASE_URL}/${path}/${document.id}`;
    }

    next();
  });
}

export function generateCreatedField<T extends DocumentTypes>(schema: mongoose.Schema<T>): void {
  schema.pre('save', function (next) {
    const document = this as T;
    if (document.isNew) {
      document.created = new Date().toISOString();
    }

    next();
  });
}
export function setLastUpdatedField<T extends DocumentTypes>(schema: mongoose.Schema<T>): void {
  schema.pre('save', function (next) {
    const document = this as T;
    if (document.isNew || document.isModified()) {
      document.last_updated = new Date().toISOString();
    }

    next();
  });
}

export function validation<T extends DocumentTypes>(schema: mongoose.Schema<T>): void {
  schema.pre('save', async function (next) {
    const document = this as T;

    try {
      await document.validate();
    } catch (error: any) {
      next(new Error(error));
    }

    next();
  });
}
