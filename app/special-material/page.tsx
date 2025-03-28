"use client";

import { useDatabase } from "@/hooks/use-database";
import { useEffect, useState } from "react";
import { FlashcardDeck } from "../../components/flashcard-deck";
import { CardData, CardDataWithMaterialId } from "@/lib/interfaces";

export default function SpecialMaterialPage() {
  const { getDueCards } = useDatabase();
  const [cards, setCards] = useState<CardDataWithMaterialId[]>([]);

  useEffect(() => {
    getDueCards((cards) => {
      setCards(cards);
    });
  }, []);

  return (
    <div>
      <FlashcardDeck
        title="忘却曲線に基づいた教材"
        cards={cards}
        handleRating={function (index: number, card: CardData): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
