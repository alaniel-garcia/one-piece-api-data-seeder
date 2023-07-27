import Race from '@models/Race';
import type { Schema } from 'mongoose';

export async function getRaceInCharacterReference(id: number): Promise<Schema.Types.ObjectId> {
  // const characters = await Character.find();

  // for (const character of characters) {
  //   // Find the corresponding Race document based on the id field
  //   const race = await Race.findOne({ id: character.race });

  //   if (race != null) {
  //     // Set the race field of the Character document to the _id of the Race document
  //     character.race = race._id;
  //     await character.save();
  //   }
  // }

  const race = await Race.findOne({ id });

  return race!._id;
}
