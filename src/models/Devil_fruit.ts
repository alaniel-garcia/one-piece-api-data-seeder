import {
  generateCreatedField,
  generateImageField,
  generateUrlField,
  setLastUpdatedField,
  validation
} from '@middlewares/index';
import {
  ValidateSubDoc,
  validateIsoStringDate,
  validatePositiveNonZeroInteger,
  validateString,
  validateUrl
} from '@utils/helpers/validations';
import { validateDevilFruitName, validateDevilFruitType } from '@utils/helpers/validations/devilFruitValidations';
import mongoose from 'mongoose';
import type { DevilFruitDocument } from 'types';

const { Schema } = mongoose;

const devilFruitSchema = new Schema<DevilFruitDocument>(
  {
    id: {
      $type: Number,
      required: true,
      unique: true,
      validate: validatePositiveNonZeroInteger
    },
    name: {
      $type: String,
      required: true,
      unique: true,
      validate: validateDevilFruitName
    },
    alias: {
      $type: String,
      enum: ['Gomu Gomu no Mi']
    },
    type: {
      $type: String,
      required: true,
      enum: ['Paramecia', 'Logia', 'Zoan', 'Mythical Zoan'],
      validate: validateDevilFruitType
    },
    meaning: {
      $type: String,
      required: true,
      validate: validateString
    },
    description: {
      $type: String,
      required: true,
      validate: validateString
    },
    current_user: {
      $type: Schema.Types.ObjectId,
      _id: false,
      validate: ValidateSubDoc
    },
    image: {
      $type: String,
      unique: true,
      validate: validateUrl
    },
    url: {
      $type: String,
      unique: true,
      required: true,
      validate: validateUrl
    },
    created: {
      $type: String,
      required: true,
      validate: validateIsoStringDate
    },
    last_updated: {
      $type: String,
      required: true,
      validate: validateIsoStringDate
    }
  },
  { typeKey: '$type', versionKey: false }
);

devilFruitSchema.set('validateBeforeSave', false);

generateImageField(devilFruitSchema, 'devil_fruits');
generateUrlField(devilFruitSchema, 'devil_fruits');
generateCreatedField(devilFruitSchema);
setLastUpdatedField(devilFruitSchema);
validation(devilFruitSchema);

export default mongoose.model<DevilFruitDocument>('Devil_fruit', devilFruitSchema);
