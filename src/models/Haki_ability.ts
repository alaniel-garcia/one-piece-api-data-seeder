import {
  generateCreatedField,
  generateImageField,
  generateUrlField,
  setLastUpdatedField,
  validation
} from '@middlewares/index';
import {
  ValidateSubDocsArray,
  validateIsoStringDate,
  validatePositiveNonZeroInteger,
  validateString,
  validateUrl
} from '@utils/helpers/validations';
import mongoose from 'mongoose';
import type { HakiAbilityDocument } from 'types';

const { Schema } = mongoose;

const hakiAbilitySchema = new Schema<HakiAbilityDocument>(
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
      enum: ['Armament', 'Observation', 'Conqueror']
    },
    description: {
      type: String,
      required: true,
      validate: validateString
    },
    users: {
      default: undefined,
      type: [Schema.Types.ObjectId],
      _id: false,
      validate: ValidateSubDocsArray
    },
    image: {
      type: String,
      required: true,
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

hakiAbilitySchema.set('validateBeforeSave', false);

generateImageField(hakiAbilitySchema, 'haki_abilities');
generateUrlField(hakiAbilitySchema, 'haki_abilities');
generateCreatedField(hakiAbilitySchema);
setLastUpdatedField(hakiAbilitySchema);
validation(hakiAbilitySchema);

export default mongoose.model<HakiAbilityDocument>('Haki_ability', hakiAbilitySchema);
