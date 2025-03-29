"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Flashcard } from "./flashcard";
import { CardData } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { fsrs, IPreview, Rating } from "ts-fsrs";

interface FlashcardDeckProps<T extends CardData> {
  cards: T[];
  title: string;
  handleRating: (index: number, card: T) => void;
}

export function FlashcardDeck<T extends CardData>({
  ...props
}: FlashcardDeckProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { cards, title } = props;
  const [isFlipped, setIsFlipped] = useState(false);
  const [repeatScenario, setRepeatScenario] = useState<IPreview>();
  const f = fsrs({ enable_fuzz: true });

  const handleFlip = (state: boolean) => {
    setIsFlipped(state);
  };

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

  const handleRating = (
    rating: Rating.Again | Rating.Hard | Rating.Good | Rating.Easy
  ) => {
    if (repeatScenario) {
      props.handleRating(currentIndex, repeatScenario[rating].card as T);
      handleNext();
    }
  };

  const progress = ((currentIndex + 1) / cards.length) * 100;

  useEffect(() => {
    setIsFlipped(false);
    if (cards?.length) {
      setRepeatScenario(f.repeat<IPreview>(cards[currentIndex], new Date()));
    }
  }, [currentIndex, cards]);

  return (
    <div className="mx-auto w-full space-y-6">
      {title && (
        <h2 className="w-full bg-[#FAFAFA] text-center text-2xl leading-16 font-bold">
          {title}
        </h2>
      )}

      <div className="mx-auto w-full max-w-2xl p-2">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-muted-foreground text-sm">
            {currentIndex + 1} / {cards.length}
          </span>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
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
                <Flashcard
                  front={card.front}
                  back={card.back}
                  isStudying
                  onFlip={handleFlip}
                />
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

        <div className="grid grid-cols-5 gap-1">
          <Button
            className="h-12"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="mr-3 h-4 w-4" />
            戻る
          </Button>
          <Button
            className="block h-12 cursor-pointer"
            onClick={() => repeatScenario && handleRating(Rating.Again)}
            variant="destructive"
            disabled={!isFlipped}
          >
            <div className="w-full">もう1回</div>
            <small className="w-full">
              {repeatScenario &&
                repeatScenario[Rating.Again].card.scheduled_days}
              日後
            </small>
          </Button>
          <Button
            className="block h-12 cursor-pointer"
            onClick={() => handleRating(Rating.Hard)}
            variant="warning"
            disabled={!isFlipped}
          >
            <div className="w-full">難しい</div>
            <small className="w-full">
              {repeatScenario &&
                repeatScenario[Rating.Hard].card.scheduled_days}
              日後
            </small>
          </Button>
          <Button
            className="block h-12 cursor-pointer"
            onClick={() => handleRating(Rating.Good)}
            variant="success"
            disabled={!isFlipped}
          >
            <div className="w-full">できた</div>
            <small className="w-full">
              {repeatScenario &&
                repeatScenario[Rating.Good].card.scheduled_days}
              日後
            </small>
          </Button>
          <Button
            className="block h-12 cursor-pointer"
            onClick={() => handleRating(Rating.Easy)}
            variant="easy"
            disabled={!isFlipped}
          >
            <div className="w-full">簡単</div>
            <small className="w-full">
              {repeatScenario &&
                repeatScenario[Rating.Easy].card.scheduled_days}
              日後
            </small>
          </Button>
        </div>
      </div>
    </div>
  );
}
