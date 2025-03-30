"use client";

import { useDatabase } from "@/hooks/use-database";
import { useEffect, useState } from "react";
import { FlashcardDeck } from "@/components/flashcard-deck";
import { CardDataWithMaterialId } from "@/lib/interfaces";

export default function SpecialMaterialPage() {
  const { getDueCards, editCard } = useDatabase();
  const [cards, setCards] = useState<CardDataWithMaterialId[]>([]);

  useEffect(() => {
    getDueCards((cards) => {
      setCards(cards);
    });
  }, []);

  return (
    <div>
      <FlashcardDeck<CardDataWithMaterialId>
        title="忘却曲線に基づいた教材"
        cards={cards}
        handleRating={(_, card) => {
          editCard(card, () => {
            setCards((prevCards) =>
              prevCards.map((c) => (c.id === card.id ? card : c))
            );
          });
        }}
      />
    </div>
  );
}
