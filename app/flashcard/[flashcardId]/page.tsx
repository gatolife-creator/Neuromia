import { FlashcardDeck } from "@/components/flashcard-deck";
import React from "react";

const cards = [
  {
    id: 1,
    front: "What is React?",
    back: "A JavaScript library for building user interfaces",
  },
  {
    id: 2,
    front: "What is JSX?",
    back: "A syntax extension for JavaScript that looks similar to HTML",
  },
  {
    id: 3,
    front: "What is a React component?",
    back: "A reusable piece of code that returns React elements describing what should appear on the screen",
  },
  {
    id: 4,
    front: "What is the virtual DOM?",
    back: "A programming concept where a virtual representation of a UI is kept in memory and synced with the real DOM",
  },
  {
    id: 5,
    front: "What are React hooks?",
    back: "Functions that let you use state and other React features without writing a class",
  },
];

export default async function flashcardPage({
  params,
}: {
  params: Promise<{ flashcardId: string }>;
}) {
  const flashcardId = (await params).flashcardId;
  console.log(flashcardId);
  return (
    <div>
      <FlashcardDeck cards={cards} title="React Fundamentals" />
    </div>
  );
}
