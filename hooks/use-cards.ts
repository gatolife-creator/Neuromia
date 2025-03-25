import { materialDB } from "@/lib/db";
import { CardData } from "@/lib/interfaces";
import { useEffect, useState } from "react";

export function useCards(materialId: string) {
  const [cards, setCards] = useState<CardData[]>([]);
  useEffect(() => {
    materialDB.materials
      .where("id")
      .equals(materialId)
      .first()
      .then((material) => {
        if (material) {
          setCards(JSON.parse(material.serializedCards));
        } else {
          console.error("Material not found");
        }
      });
  }, [materialId]);

  return { cards, setCards };
}
