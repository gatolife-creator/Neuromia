"use client";

import React, { useEffect, useState } from "react";
import { FlashcardDeck } from "@/components/flashcard-deck";
import { CardData } from "@/lib/interfaces";
import { materialDB } from "@/lib/db";

export default function MaterialPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const [title, setTitle] = useState("");
  const [cards, setCards] = useState<CardData[]>([{ front: "", back: "" }]);
  useEffect(() => {
    (async () => {
      const { materialId } = await params;

      const { title, serializedCards } = await materialDB.materials.get(
        materialId
      );
      setCards(JSON.parse(serializedCards));
      setTitle(title);
    })();
  }, []);

  return (
    <div>
      <FlashcardDeck cards={cards} title={title} />
    </div>
  );
}
