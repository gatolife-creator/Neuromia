"use client";

import { EditingFlashcardList } from "@/components/editing-flashcard-list";
import { materialDB } from "@/lib/db";
import { CardData } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";
import { EditingFlashcardForm } from "../../../../components/editing-flashcard-form";

export default function EditMaterialPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const [material, setMaterial] = useState({ title: "", description: "" });
  const [cards, setCards] = useState<CardData[]>([{ front: "", back: "" }]);

  // const onClickDelete = (index: number) => {
  //   console.log(index);
  // };

  useEffect(() => {
    (async () => {
      const { materialId } = await params;

      if (materialId) {
        const material = await materialDB.materials.get({ id: materialId });
        if (material) {
          const { title, description, serializedCards } = material;
          setMaterial({ title, description });
          setCards(JSON.parse(serializedCards));
        } else {
          console.error("Material not found");
        }
      }
    })();
  }, [params, material, cards]);
  return (
    <>
      <EditingFlashcardForm
        type="edit"
        title={material.title}
        description={material.description}
      />
      <EditingFlashcardList
        cards={cards}
        onClickDelete={() => {
          // onClickDelete(NaN);
        }}
      />
    </>
  );
}
