import mongoose from 'mongoose';
import dotenv from 'dotenv';
import models from './models';
import { characterSeeder } from '@seeds/characterSeeder';
import { raceSeeder } from '@seeds/raceSeeder';
import Race from '@models/Race';
import { devilFruitSeeder } from '@seeds/devilFruitSeeder';
import Devil_fruit from '@models/Devil_fruit';
import { hakiAbilitySeeder } from '@seeds/hakiAbilitySeeder';
import Haki_ability from '@models/Haki_ability';
import { updateCurrentUserInDevilFruit, updateHakiAbilitiesInCharacter } from 'references';

dotenv.config();

const db = process.env.NODE_ENV === 'development' ? process.env.MONGO_DB_DEV_URI : '';
const Character = models.characters;

(async () => {
  await mongoose.connect(db as string);
  console.log('Connected to Database!');

  await Character.deleteMany({});
  await Race.deleteMany({});
  await Devil_fruit.deleteMany({});
  await Haki_ability.deleteMany({});

  await raceSeeder();
  console.log('Total races: ', await Race.countDocuments());
  await devilFruitSeeder();
  console.log('Total devil fruits: ', await Devil_fruit.countDocuments());
  await characterSeeder();
  console.log('Total characters: ', await Character.countDocuments());
  await hakiAbilitySeeder();
  console.log('Total haki abilities: ', await Haki_ability.countDocuments());
  await updateHakiAbilitiesInCharacter();
  console.log('Haki abilities references in characters updated');
  await updateCurrentUserInDevilFruit();
  console.log('Current user references in devil fruits updated');
})().catch((error) => {
  console.log('Error while connecting to Database', error);
});
