"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Flashcard } from "./flashcard";

export interface FlashcardItem {
  id: string | number;
  front: string;
  back: string;
}

interface FlashcardDeckProps {
  cards: FlashcardItem[];
  title?: string;
}

export function FlashcardDeck({ cards, title }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {title && <h2 className="text-2xl font-bold text-center">{title}</h2>}

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Card {currentIndex + 1} of {cards.length}
        </span>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <Progress value={progress} className="h-2" />

      <Flashcard
        front={cards[currentIndex].front}
        back={cards[currentIndex].back}
        className="my-8"
      />

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
