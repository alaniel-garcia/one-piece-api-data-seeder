/* eslint-disable array-callback-return */
import Character from '@models/Character';
import Devil_fruit from '@models/Devil_fruit';
import Haki_ability from '@models/Haki_ability';
import Race from '@models/Race';
import type { Schema } from 'mongoose';

export async function getRaceInCharacterReference(id: number): Promise<Schema.Types.ObjectId> {
  const race = await Race.findOne({ id });

  return race!._id;
}

export async function getDevilFruitInCharacterReference(
  devil_fruit: number | Array<number>
): Promise<Schema.Types.ObjectId | Array<Schema.Types.ObjectId>> {
  if (Array.isArray(devil_fruit)) {
    const objectIds: Array<Schema.Types.ObjectId> = [];
    for (const df of devil_fruit) {
      const retrievedDF = await Devil_fruit.findOne({ id: df });

      objectIds.push(retrievedDF!._id);
    }

    return objectIds;
  }

  const retrievedDF = await Devil_fruit.findOne({ id: devil_fruit });

  return retrievedDF!._id;
}

export async function getUsersInDevilFruitReference(idArray: Array<number>): Promise<Array<Schema.Types.ObjectId>> {
  const objectIdArray: Array<Schema.Types.ObjectId> = [];
  for (const id of idArray) {
    const user = await Character.findOne({ id });

    objectIdArray.push(user!._id);
  }

  return objectIdArray;
}

interface hakiAbilitiesReferences {
  [key: string]: Schema.Types.ObjectId;
  1: Schema.Types.ObjectId;
  2: Schema.Types.ObjectId;
  3: Schema.Types.ObjectId;
}

// circular reference for haki abilities in character after haki abilities collection is populated and already has its references
export async function updateHakiAbilitiesInCharacter(): Promise<void> {
  const characterDocuments = await Character.find({});
  const hakiAbilityDocuments = await Haki_ability.find({});

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const idToObjectId = {} as hakiAbilitiesReferences;

  hakiAbilityDocuments.forEach((doc) => {
    if (doc.id === 1) idToObjectId[1] = doc._id;
    if (doc.id === 2) idToObjectId[2] = doc._id;
    if (doc.id === 3) idToObjectId[3] = doc._id;
  });

  await Promise.all(
    characterDocuments.map(async (doc) => {
      if (doc.haki_abilities != null) {
        const updatedReferences: Array<Schema.Types.ObjectId> = [];

        doc.haki_abilities.forEach((id) => {
          updatedReferences.push(idToObjectId[id as unknown as number]);
        });

        doc.haki_abilities = updatedReferences;

        await doc.save();
      }
    })
  );
}

export async function updateCurrentUserInDevilFruit(): Promise<void> {
  const devilFruitDocuments = await Devil_fruit.find({});
  const characterDocuments = await Character.find({});

  await Promise.all(
    devilFruitDocuments.map(async (doc) => {
      if (doc.current_user != null) {
        for (const character of characterDocuments) {
          if (character.id === doc.current_user) {
            doc.current_user = character._id;
          }
        }

        await doc.save();
      }
    })
  );
}
