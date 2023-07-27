import mongoose from 'mongoose';
import {
  validateBackstory,
  validateBirthday,
  validateBounties,
  validateCharacterDevilFruit,
  validateDebut,
  validateCharacterHakiAbilities,
  validateHeight,
  validateStatus
} from '@utils/helpers/validations/characterValidations';
import {
  validateIsoStringDate,
  validateNewSubDoc,
  validatePositiveNonZeroInteger,
  validateString,
  validateStringArray,
  validateUrl
} from '@utils/helpers/validations';
import type { CharacterDocument } from 'types';
import {
  generateCreatedField,
  generateImageField,
  setLastUpdatedField,
  generateUrlField,
  validation
} from '@middlewares/index';

const { Schema } = mongoose;

const characterSchema: mongoose.Schema<CharacterDocument> = new Schema<CharacterDocument>(
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
    gender: {
      type: String,
      required: true,
      validate: validateString
    },
    race: {
      type: Schema.Types.ObjectId,
      _id: false,
      required: true,
      validate: validateNewSubDoc
    },
    origin: {
      type: String,
      required: true,
      validate: validateString
    },
    status: {
      type: String,
      required: true,
      validate: validateStatus,
      enum: ['Alive', 'Deceased', 'Unknown']
    },
    birthday: {
      type: String,
      validate: validateBirthday
    },
    main_occupations: {
      default: undefined,
      type: [String],
      validate: validateStringArray
    },
    devil_fruit: {
      type: Schema.Types.Mixed,
      _id: false,
      validate: validateCharacterDevilFruit
    },
    haki_abilities: {
      default: undefined,
      type: [
        {
          id: {
            type: Number,
            required: true,
            validate: validatePositiveNonZeroInteger
          },
          name: {
            type: String,
            required: true,
            enum: ['Armament', 'Observation', 'Conqueror']
          },
          url: {
            type: String
            // required: true
          }
        }
      ],
      _id: false,
      validate: validateCharacterHakiAbilities
    },
    bounties: {
      default: undefined,
      type: [String],
      validate: validateBounties
    },
    height: {
      type: String,
      validate: validateHeight
    },
    debut: {
      default: undefined,
      type: [String],
      required: true,
      validate: validateDebut
    },
    backstory: {
      type: String,
      required: true,
      validate: validateBackstory
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

characterSchema.set('validateBeforeSave', false);

characterSchema.pre('save', function () {
  // In case bounties does exist and its length is greater than 1 it sorts bounties most recent to oldest
  if (this.bounties != null && this.bounties.length > 1) {
    this.bounties = this.bounties.sort((a, b) => parseInt(b.replaceAll(',', '')) - parseInt(a.replaceAll(',', '')));
  }
});

generateImageField(characterSchema, 'characters');
generateUrlField(characterSchema, 'characters');
generateCreatedField(characterSchema);
setLastUpdatedField(characterSchema);
validation(characterSchema);

export default mongoose.model<CharacterDocument>('Character', characterSchema);
