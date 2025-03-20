import { EditingFlashcard } from "./editing-flashcard";

interface EditingFlashcardListProps {
  cards: Array<{
    front: string;
    back: string;
  }>;
}

export function EditingFlashcardList({ ...props }: EditingFlashcardListProps) {
  const { cards } = props;
  return (
    <div>
      {cards.map((card, index) => (
        <EditingFlashcard
          key={index}
          front={card.front}
          back={card.back}
          index={index + 1}
        />
      ))}
    </div>
  );
}
