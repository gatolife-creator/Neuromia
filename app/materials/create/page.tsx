"use client";

import React, { useState } from "react";
import { EditingFlashcardList } from "../../../components/editing-flashcard-list";
import { CardData, MaterialMetaData } from "@/lib/interfaces";
import { materialDB } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { EditingFlashcardForm } from "../../../components/editing-flashcard-form";

export default function CreateMaterialPage() {
  const [cards, setCards] = useState<CardData[]>([]);

  const onCardCreationFormSubmit = (values: CardData) => {
    const { front, back } = values;
    setCards([...cards, { front, back }]);
  };

  const onClickDelete = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
    console.log(cards);
  };

  const onMaterialCreationFormSubmit = async (values: MaterialMetaData) => {
    const { title, description } = values;
    const id = uuidv4();
    materialDB.materials.add({
      id,
      title,
      description,
      serializedCards: JSON.stringify(cards),
    });
    console.log(await materialDB.materials.get({ id }));
  };

  return (
    <div>
      <EditingFlashcardForm
        onCardCreationFormSubmit={onCardCreationFormSubmit}
        onMaterialCreationFormSubmit={onMaterialCreationFormSubmit}
      />

      <EditingFlashcardList cards={cards} onClickDelete={onClickDelete} />
    </div>
  );
}
