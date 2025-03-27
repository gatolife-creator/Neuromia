"use client";

import React, { useEffect, useState } from "react";
import { FlashcardDeck } from "@/components/flashcard-deck";
import { CardData } from "@/lib/interfaces";
import { materialDB } from "@/lib/db";
import { State } from "ts-fsrs";

export default function MaterialPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const [title, setTitle] = useState("");
  const [cards, setCards] = useState<CardData[]>([
    {
      id: "",
      front: "",
      back: "",
      due: new Date(),
      stability: 0,
      difficulty: 0,
      elapsed_days: 0,
      scheduled_days: 0,
      reps: 0,
      lapses: 0,
      state: State.New,
    },
  ]);
  useEffect(() => {
    (async () => {
      const { materialId } = await params;

      const material = await materialDB.materials.get(materialId);
      if (material) {
        const { title, cards } = material;
        setCards(cards);
        setTitle(title);
      } else {
        console.error("Material not found");
      }
    })();
  }, [params]);

  return (
    <div>
      <FlashcardDeck cards={cards} title={title} />
    </div>
  );
}
