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

      const material = await materialDB.materials.get(materialId);
      if (material) {
        const { title, serializedCards } = material;
        setCards(JSON.parse(serializedCards));
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
