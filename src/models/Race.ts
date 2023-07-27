import {
  generateCreatedField,
  generateImageField,
  generateUrlField,
  setLastUpdatedField,
  validation
} from '@middlewares/index';
import {
  validateIsoStringDate,
  validatePositiveNonZeroInteger,
  validateString,
  validateUrl
} from '@utils/helpers/validations';
import mongoose from 'mongoose';
import type { RaceDocument } from 'types';

const { Schema } = mongoose;

const raceSchema = new Schema<RaceDocument>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      validate: validatePositiveNonZeroInteger
    },
    name: {
      type: String,
      required: true,
      unique: true,
      validate: validateString
    },
    homeland: {
      type: String,
      required: true,
      validate: validateString
    },
    about: {
      type: String,
      required: true,
      validate: validateString
    },
    image: {
      type: String,
      unique: true,
      validate: validateUrl
    },
    url: {
      type: String,
      unique: true,
      required: true,
      validate: validateUrl
    },
    created: {
      type: String,
      required: true,
      validate: validateIsoStringDate
    },
    last_updated: {
      type: String,
      required: true,
      validate: validateIsoStringDate
    }
  },
  { versionKey: false }
);

raceSchema.set('validateBeforeSave', false);

generateImageField(raceSchema, 'races');
generateUrlField(raceSchema, 'races');
generateCreatedField(raceSchema);
setLastUpdatedField(raceSchema);
validation(raceSchema);

export default mongoose.model<RaceDocument>('Race', raceSchema);
