"use client";

import { EditingFlashcardList } from "@/components/editing-flashcard-list";
import { materialDB } from "@/lib/db";
import { CardData } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";

export default function EditMaterialPage(
  params: Promise<{ materialId: string }>
) {
  const [cards, setCards] = useState<CardData[]>([{ front: "", back: "" }]);
  useEffect(() => {
    (async () => {
      const { materialId } = await params;

      if (materialId) {
        const material = await materialDB.materials.get({ id: materialId });
        const { serializedCards } = material;
        if (material) {
          setCards(JSON.parse(serializedCards));
        } else {
          console.error("Material not found");
        }
      }
    })();
  }, []);
  return <EditingFlashcardList cards={cards} />;
}
