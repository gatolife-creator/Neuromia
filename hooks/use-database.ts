import { materialDB } from "@/lib/db";
import { CardDataWithMaterialId, MaterialData } from "@/lib/interfaces";

export function useDatabase() {
  const getAllData = (callback: (materials: MaterialData[]) => void) => {
    materialDB.materials.toArray().then((data) => {
      callback(data);
    });
  };

  const deleteAllData = () => {
    materialDB.materials.clear();
  };

  const getAllCards = (callback: (cards: CardDataWithMaterialId[]) => void) => {
    getAllData((materials) => {
      const cards: CardDataWithMaterialId[] = [];
      materials.forEach((material) => {
        material.cards.forEach((card) => {
          cards.push({ ...card, materialId: material.id });
        });
      });
      callback(cards);
    });
  };

  const getCardById = (
    cardId: string,
    callback: (card: CardDataWithMaterialId) => void
  ) => {
    getAllCards((cards) => {
      const card = cards.find((card) => card.id === cardId);
      if (card) {
        callback(card);
      }
    });
  };

  const editCard = async (
    card: CardDataWithMaterialId,
    callback: () => void
  ) => {
    materialDB.materials
      .where("id")
      .equals(card.materialId)
      .modify((material, ref) => {
        ref.value.cards = material.cards.map((c) => {
          if (c.id === card.id) {
            return { ...c, ...card };
          }
          return c;
        });
      })
      .then(() => {
        callback();
      });
  };

  const getDueCards = (callback: (cards: CardDataWithMaterialId[]) => void) => {
    getAllCards((cards) => {
      const dueCards = cards.filter((card) => card.due <= new Date());
      callback(dueCards);
    });
  };

  return {
    getAllData,
    deleteAllData,
    getAllCards,
    getCardById,
    editCard,
    getDueCards,
  };
}
