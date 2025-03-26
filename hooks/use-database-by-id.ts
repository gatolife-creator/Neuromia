import { MaterialDataOnDB, materialDB } from "@/lib/db";
import { CardData } from "@/lib/interfaces";
import { useEffect, useState } from "react";

export function useDatabaseById(materialId: string) {
  const [tags, setTags] = useState<string[]>([]);
  const [cards, setCards] = useState<CardData[]>([]);
  const [material, setMaterial] = useState<MaterialDataOnDB>();

  useEffect(() => {
    materialDB.materials
      .where("id")
      .equals(materialId)
      .first()
      .then((material) => {
        if (material) {
          setTags(material.tags);
          setCards(JSON.parse(material.serializedCards));
          setMaterial(material);
        } else {
          console.error("Material not found");
        }
      });
  }, [materialId]);

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

  return {
    tags,
    cards,
    material,
    setTags,
    setCards,
    setMaterial,
    updateMaterial,
    putMaterial,
    deleteMaterial,
  };
}
