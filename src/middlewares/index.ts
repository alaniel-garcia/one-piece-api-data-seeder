import type { CollectionsPaths, DocumentTypes, MemberDocument } from 'types';
import { BASE_URL } from '@utils/index';
import type mongoose from 'mongoose';
import models from '@models/index';
import type { Model } from 'mongoose';

export function generateImageField<
  // exclude Member document type because Member has no image property
  T extends Exclude<DocumentTypes, MemberDocument>
>(schema: mongoose.Schema<T>, path: CollectionsPaths, extension = '.jpeg'): void {
  schema.pre('save', function (next) {
    const document = this as T;
    if ((document.isNew && document.image != null) || document.isModified('id')) {
      document.image = `${BASE_URL}/${path}/image/${document.id}${extension}`;
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

export function markFieldAsModified<T extends DocumentTypes>(
  schema: mongoose.Schema<T>,
  modelName: string,
  ...fielsdToMark: Array<keyof T>
): void {
  schema.pre('save', async function (next) {
    // Check if the document is not new, as we don't need to mark fields if it's a new document
    if (!this.isNew) {
      const model = models[modelName] as Model<T>;
      const currentDocumentInDB = (await model.findOne({ _id: this._id })) as T;

      if (currentDocumentInDB != null) {
        for (const field of fielsdToMark) {
          // Compare the current value of the field with the value in the database
          // If they are different, mark the field as modified
          if (JSON.stringify(currentDocumentInDB[field]) !== JSON.stringify(this[field]))
            this.markModified(field as string);
        }
      }
    }

    next();
  });
}
