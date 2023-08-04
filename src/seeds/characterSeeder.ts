import fs from 'fs';
import Character from '@models/Character';
import type { CharacterDocument } from 'types';
import { getDevilFruitInCharacterReference, getRaceInCharacterReference } from 'references';

const characterDocuments: Array<CharacterDocument> = JSON.parse(
  fs.readFileSync('src/data/copyOfCharacters.json', 'utf-8')
);

export async function characterSeeder(): Promise<void> {
  for (const doc of characterDocuments) {
    await saveDocument(doc);
  }
}

async function saveDocument(doc: CharacterDocument): Promise<void> {
  const newCharacter = new Character();

  newCharacter.id = doc.id;
  newCharacter.name = doc.name;
  newCharacter.gender = doc.gender;
  newCharacter.race = await getRaceInCharacterReference(doc.race as unknown as number);
  newCharacter.origin = doc.origin;
  newCharacter.status = doc.status;
  if (doc.birthday != null) newCharacter.birthday = doc.birthday;
  if (doc.main_occupations != null) newCharacter.main_occupations = doc.main_occupations;
  if (doc.devil_fruit != null)
    newCharacter.devil_fruit = await getDevilFruitInCharacterReference(doc.devil_fruit as number | Array<number>);
  if (doc.haki_abilities != null) newCharacter.haki_abilities = doc.haki_abilities;
  if (doc.bounties != null) newCharacter.bounties = doc.bounties;
  if (doc.height != null) newCharacter.height = doc.height;
  newCharacter.debut = doc.debut;
  newCharacter.backstory = doc.backstory;
  if (doc.image != null) newCharacter.image = doc.image;

  try {
    await newCharacter.save();
  } catch (err: any) {
    throw new Error(err);
  }
}
