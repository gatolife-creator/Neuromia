"use client";

import { EditingFlashcard } from "./editing-flashcard";
import { EditingFlashcardAdditionButton } from "./editing-flashcard-addition-button";

interface EditingFlashcardListProps {
  cards: Array<{
    front: string;
    back: string;
  }>;
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
  return (
    <div>
      {cards.map((card, index) => (
        <EditingFlashcard
          key={index}
          front={card.front}
          back={card.back}
          index={index + 1}
          onClickDelete={() => {
            onClickDelete(index);
          }}
          onChangeFrontInput={(front: string) => {
            onChangeFrontInput(index, front);
          }}
          onChangeBackInput={(back: string) => {
            onChangeBackInput(index, back);
          }}
          onClickEdit={() => {}}
        />
      ))}
      <EditingFlashcardAdditionButton
        onClickCardAddition={onClickCardAddition}
      />
    </div>
  );
}
