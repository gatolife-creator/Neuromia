import { materialDB } from "@/lib/db";
import { CardData } from "@/lib/interfaces";

export function useDatabase(materialId: string) {
  const updateDatabase = (
    title: string,
    description: string,
    tags: string[],
    cards: CardData[],
    callback?: () => void
  ) => {
    materialDB.materials
      .where("id")
      .equals(materialId)
      .modify({
        title,
        description,
        tags,
        serializedCards: JSON.stringify(
          cards.filter((card) => card.front.trimEnd() && card.back.trimEnd())
        ),
      })
      .then(() => {
        if (callback) {
          callback();
        }
      });
  };

  const deleteMaterial = (callback?: () => void) => {
    materialDB.materials
      .where("id")
      .equals(materialId)
      .delete()
      .then(() => {
        if (callback) {
          callback();
        }
      });
  };

  return { updateDatabase, deleteMaterial };
}
