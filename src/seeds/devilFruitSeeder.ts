import fs from 'fs';
import Devil_fruit from '@models/Devil_fruit';
import type { DevilFruitDocument } from 'types';

const devilFruitDocuments: Array<DevilFruitDocument> = JSON.parse(
  fs.readFileSync('src/data/Devil_fruits.json', 'utf-8')
);

export async function devilFruitSeeder(): Promise<void> {
  for (const doc of devilFruitDocuments) {
    await saveDocument(doc);
  }
}

async function saveDocument(doc: DevilFruitDocument): Promise<void> {
  const newDevilFruit = new Devil_fruit();

  newDevilFruit.id = doc.id;
  newDevilFruit.name = doc.name;
  if (doc.alias != null && doc.id === 1) newDevilFruit.alias = doc.alias;
  newDevilFruit.type = doc.type;
  newDevilFruit.meaning = doc.meaning;
  newDevilFruit.description = doc.description;
  if (doc.current_user != null) newDevilFruit.current_user = doc.current_user;
  newDevilFruit.image = doc.image;

  try {
    await newDevilFruit.save();
  } catch (err: any) {
    throw new Error(err);
  }
}
