import { materialDB } from "@/lib/db";
import { CardData, MaterialData } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useDatabaseById(materialId: string) {
  const [tags, setTags] = useState<string[]>([]);
  const [cards, setCards] = useState<CardData[]>([]);
  const [material, setMaterial] = useState<MaterialData>();

  useEffect(() => {
    materialDB.materials
      .where("id")
      .equals(materialId)
      .first()
      .then((material) => {
        if (material) {
          setTags(material.tags);
          setCards(material.cards);
          setMaterial(material);
        } else {
          console.error("Material not found");
        }
      });
  }, [materialId]);

  const editFrontSideOfCard = (index: number, front: string) => {
    setCards((prevCards) =>
      prevCards.map((card, i) => (i === index ? { ...card, front } : card))
    );
  };

  const editBackSideOfCard = (index: number, back: string) => {
    setCards((prevCards) =>
      prevCards.map((card, i) => (i === index ? { ...card, back } : card))
    );
  };

  const addCard = () => {
    setCards([...cards, { id: uuidv4(), front: "", back: "" }]);
  };

  const addTag = (tag: string) => {
    setTags([...tags, tag]);
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

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
        cards: cards.filter(
          (card) => card.front.trimEnd() && card.back.trimEnd()
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
        cards: cards.filter(
          (card) => card.front.trimEnd() && card.back.trimEnd()
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

  const getAllData = (callback: (material: MaterialData) => void) => {
    materialDB.materials.get(materialId).then((material) => {
      if (material) {
        callback(material);
      }
    });
  };

  return {
    tags,
    cards,
    material,
    setTags,
    setCards,
    editFrontSideOfCard,
    editBackSideOfCard,
    addCard,
    addTag,
    removeTag,
    setMaterial,
    updateMaterial,
    putMaterial,
    deleteMaterial,
    getAllData,
  };
}
