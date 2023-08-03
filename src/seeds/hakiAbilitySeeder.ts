import fs from 'fs';
import Haki_ability from '@models/Haki_ability';
import type { HakiAbilityDocument } from 'types';
import { getUsersInDevilFruitReference } from 'references';

const hakiAbilityDocuments: Array<HakiAbilityDocument> = JSON.parse(
  fs.readFileSync('src/data/copyOfHakiAbilities.json', 'utf-8')
);

export async function hakiAbilitySeeder(): Promise<void> {
  for (const doc of hakiAbilityDocuments) {
    await saveDocument(doc);
  }
}

async function saveDocument(doc: HakiAbilityDocument): Promise<void> {
  const newHakiAbility = new Haki_ability();

  newHakiAbility.id = doc.id;
  newHakiAbility.name = doc.name;
  newHakiAbility.description = doc.description;
  newHakiAbility.users = await getUsersInDevilFruitReference(doc.users as unknown as Array<number>);

  try {
    await newHakiAbility.save();
  } catch (err: any) {
    throw new Error(err);
  }
}
