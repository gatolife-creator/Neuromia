"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Flashcard } from "./flashcard";
import { CardData } from "@/lib/interfaces";
import { motion } from "framer-motion";

interface FlashcardDeckProps {
  cards: CardData[];
  title: string;
}

export function FlashcardDeck({ ...props }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { cards, title } = props;

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
    <div className="w-full mx-auto space-y-6">
      {title && (
        <h2 className="text-2xl font-bold text-center bg-[#FAFAFA] w-full leading-16">
          {title}
        </h2>
      )}

      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {cards.length}
          </span>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            リセット
          </Button>
        </div>

        <Progress value={progress} className="h-2" />

        <motion.div
          animate={{ x: `-${currentIndex * (100 / cards.length)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            display: "flex",
            width: `${cards.length * 100}%`,
          }}
          className="my-8"
        >
          {cards.map((card, index) =>
            index === currentIndex ? (
              <motion.div
                key={index}
                style={{
                  width: `${100 / cards.length}%`,
                  flexShrink: 0,
                  scale: 1,
                }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Flashcard front={card.front} back={card.back} isStudying />
              </motion.div>
            ) : (
              <motion.div
                key={index}
                style={{
                  width: `${100 / cards.length}%`,
                  flexShrink: 0,
                  scale: 0.8,
                }}
                animate={{ scale: 0.8, opacity: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Flashcard front={card.front} back={card.back} />
              </motion.div>
            )
          )}
        </motion.div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            戻る
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
          >
            次へ
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
