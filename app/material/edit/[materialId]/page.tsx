"use client";

import { EditingFlashcardList } from "@/components/editing-flashcard-list";
import { materialDB } from "@/lib/db";
import { CardData } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";

export default function EditMaterialPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const [cards, setCards] = useState<CardData[]>([{ front: "", back: "" }]);

  const onClickDelete = (index: number) => {
    console.log(index);
  };

  useEffect(() => {
    (async () => {
      const { materialId } = await params;

      if (materialId) {
        const material = await materialDB.materials.get({ id: materialId });
        if (material) {
          const { serializedCards } = material;
          setCards(JSON.parse(serializedCards));
        } else {
          console.error("Material not found");
        }
      }
    })();
  }, [params]);
  return (
    <EditingFlashcardList
      cards={cards}
      onClickDelete={() => {
        // onClickDelete(NaN);
      }}
    />
  );
}
