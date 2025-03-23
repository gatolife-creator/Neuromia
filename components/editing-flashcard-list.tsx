"use client";

import { CardData } from "@/lib/interfaces";
import { EditingFlashcard } from "./editing-flashcard";
import { EditingFlashcardAdditionButton } from "./editing-flashcard-addition-button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface EditingFlashcardListProps {
  cards: CardData[];
  onClickDelete: (index: number) => void;
  onChangeFrontInput: (index: number, front: string) => void;
  onChangeBackInput: (index: number, back: string) => void;
  onClickCardAddition: () => void;
}

export function EditingFlashcardList({ ...props }: EditingFlashcardListProps) {
  const {
    cards,
    onClickDelete,
    onChangeFrontInput,
    onChangeBackInput,
    onClickCardAddition,
  } = props;

  const [, setDeleting] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    setDeleting(index);
    setTimeout(() => {
      onClickDelete(index);
      setDeleting(null);
    }, 300); // Delay matches exit animation duration
  };

  return (
    <div className="p-4">
      <AnimatePresence>
        <motion.div layout>
          {cards.map((card, index) => (
            <motion.div
              layout
              key={card.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }} // Slide out with slight scale and downward movement
              transition={{ duration: 0.3, ease: "linear" }}
            >
              <EditingFlashcard
                front={card.front}
                back={card.back}
                index={index + 1}
                onClickDelete={() => handleDelete(index)}
                onChangeFrontInput={(front: string) => {
                  onChangeFrontInput(index, front);
                }}
                onChangeBackInput={(back: string) => {
                  onChangeBackInput(index, back);
                }}
              />
            </motion.div>
          ))}
          <EditingFlashcardAdditionButton
            onClickCardAddition={onClickCardAddition}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
