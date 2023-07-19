import mongoose from 'mongoose';
import dotenv from 'dotenv';
import models from './models';
import { characterSeeder } from '@seeds/characterSeeder';

dotenv.config();

const db = process.env.NODE_ENV === 'development' ? process.env.MONGO_DB_DEV_URI : '';
const Character = models.characters;

(async () => {
  await mongoose.connect(db as string);
  console.log('Connected to Database!');

  await Character.deleteMany({});

  await characterSeeder();

  console.log(await Character.countDocuments());
})().catch((error) => {
  console.log('Error while connecting to Database', error);
});
