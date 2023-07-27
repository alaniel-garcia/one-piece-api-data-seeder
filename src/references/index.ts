import Devil_fruit from '@models/Devil_fruit';
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
