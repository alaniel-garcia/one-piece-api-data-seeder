import fs from 'fs';
import Race from '@models/Race';
import type { RaceDocument } from 'types';

const raceDocuments: Array<RaceDocument> = JSON.parse(fs.readFileSync('src/data/Races.json', 'utf-8'));

export async function raceSeeder(): Promise<void> {
  for (const doc of raceDocuments) {
    await saveDocument(doc);
  }

  // when race collection is populated, this function updates references for race in character
}

async function saveDocument(doc: RaceDocument): Promise<void> {
  const newRace = new Race();

  newRace.id = doc.id;
  newRace.name = doc.name;
  newRace.homeland = doc.homeland;
  newRace.about = doc.about;
  if (doc.image != null) newRace.image = doc.image;

  try {
    await newRace.save();
  } catch (err: any) {
    throw new Error(err);
  }
}
