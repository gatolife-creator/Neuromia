import { materialDB } from "@/lib/db";
import { CardData } from "@/lib/interfaces";

export function useDatabase(materialId: string) {
  const updateMaterial = (
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

  const putMaterial = (
    title: string,
    description: string,
    tags: string[],
    cards: CardData[],
    callback?: () => void
  ) => {
    materialDB.materials
      .put({
        id: materialId,
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

  return { updateMaterial, putMaterial, deleteMaterial };
}
