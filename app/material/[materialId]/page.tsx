"use client";

import React, { useEffect, useState } from "react";
import { FlashcardDeck } from "@/components/flashcard-deck";
import { useDatabaseByMaterialId } from "@/hooks/use-database-by-material-id";
import { CardData } from "@/lib/interfaces";

export default function MaterialPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const [materialId, setMaterialId] = useState("");
  const { cards, material, editCardByIndex } =
    useDatabaseByMaterialId(materialId);

  const handleRating = (index: number, card: CardData) => {
    console.log(card);
    editCardByIndex(index, card);
  };

  useEffect(() => {
    (async () => {
      const { materialId } = await params;
      setMaterialId(materialId);
    })();
  });

  return (
    <div>
      {cards && (
        <FlashcardDeck
          cards={cards}
          title={material.title}
          handleRating={handleRating}
        />
      )}
    </div>
  );
}
