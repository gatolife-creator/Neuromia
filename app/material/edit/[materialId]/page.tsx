"use client";

import { EditingFlashcardList } from "@/components/editing-flashcard-list";
import { materialDB } from "@/lib/db";
import { CardData, MaterialData } from "@/lib/interfaces";
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
    setCards(newCards);
  };

  const onCardCreationFormSubmit = (values: CardData) => {
    const { front, back } = values;
    setCards([...cards, { front, back }]);
  };

  const onMaterialCreationFormSubmit = async (values: MaterialData) => {
    const { title, description } = values;
    materialDB.materials
      .where("id")
      .equals(materialId)
      .modify({
        title,
        description,
        serializedCards: JSON.stringify(cards),
      });
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
  }, [params]);
  return (
    <>
      <EditingFlashcardForm
        type="edit"
        title={material.title}
        description={material.description}
        onCardCreationFormSubmit={onCardCreationFormSubmit}
        onMaterialCreationFormSubmit={onMaterialCreationFormSubmit}
      />
      <EditingFlashcardList cards={cards} onClickDelete={onClickDelete} />
    </>
  );
}
