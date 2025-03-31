import { materialDB } from "@/lib/db";
import {
  CardData,
  CardDataWithMaterialId,
  MaterialData,
} from "@/lib/interfaces";
import { useEffect, useState } from "react";
import { createEmptyCard } from "ts-fsrs";
import { v4 as uuidv4 } from "uuid";

export function useDatabaseByMaterialId(materialId: string) {
  const [tags, setTags] = useState<string[]>([]);
  const [cards, setCards] = useState<CardDataWithMaterialId[]>([]);
  const [material, setMaterial] = useState<MaterialData>({
    id: "",
    title: "",
    description: "",
    tags: [],
    cards: [],
  });

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
    const fsrsCard = createEmptyCard();
    setCards([
      ...cards,
      { ...fsrsCard, id: uuidv4(), front: "", back: "", materialId },
    ]);
  };

  const editCardByIndex = (index: number, editedCard: CardData) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...editedCard, materialId: card.materialId } : card
      )
    );

    materialDB.materials
      .where("id")
      .equals(materialId)
      .modify({
        cards: cards.map((card) =>
          card.materialId ? card : { ...card, materialId }
        ),
      });
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
        cards: cards
          .filter((card) => card.front.trimEnd() && card.back.trimEnd())
          .map((card) => ({ ...card, materialId })),
      })
      .then(() => {
        fetch("http://localhost:3000/api/material", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: materialId,
            title,
            description,
            tags,
            cards: cards
              .filter((card) => card.front.trimEnd() && card.back.trimEnd())
              .map((card) => ({ ...card, materialId })),
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Material updated successfully:", data);
            if (callback) {
              callback();
            }
          })
          .catch((error) => {
            console.error("Error updating material:", error);
          });
      });
  };

  const putMaterial = (
    title: string,
    description: string,
    tags: string[],
    cards: CardDataWithMaterialId[],
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
        fetch("http://localhost:3000/api/material", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: materialId,
            title,
            description,
            tags,
            cards: cards.filter(
              (card) => card.front.trimEnd() && card.back.trimEnd()
            ),
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Material updated successfully:", data);
            if (callback) {
              callback();
            }
          })
          .catch((error) => {
            console.error("Error updating material:", error);
          });
      });
  };

  const deleteMaterial = (callback?: () => void) => {
    materialDB.materials
      .where("id")
      .equals(materialId)
      .delete()
      .then(() => {
        console.log("Material deletion on supabase in progress");
        fetch("http://localhost:3000/api/material", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: materialId,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Material deleted successfully:", data);
            if (callback) {
              callback();
            }
          })
          .catch((error) => {
            console.error("Error deleting material:", error);
          });
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
    editCardByIndex,
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
