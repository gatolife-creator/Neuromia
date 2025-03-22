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
  const [materialId, setMaterialId] = useState("");
  const [material, setMaterial] = useState({ title: "", description: "" });
  const [cards, setCards] = useState<CardData[]>([]);

  const onClickDelete = (index: number) => {
    // console.log(materialId);
    const newCards = cards.filter((_, i) => i !== index);
    materialDB.materials
      .where("id")
      .equals(materialId)
      .modify({ serializedCards: JSON.stringify(newCards) });
    setCards(newCards);
  };

  useEffect(() => {
    (async () => {
      const { materialId } = await params;

      if (materialId) {
        const material = await materialDB.materials.get({ id: materialId });
        setMaterialId(materialId);
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
      <EditingFlashcardList cards={cards} onClickDelete={onClickDelete} />
    </>
  );
}
