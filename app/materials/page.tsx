import React from "react";
import { FlashcardsThumbnail } from "../../components/flashcards-thumnail";

export default function Material() {
  return (
    <div className="container mx-auto p-6 my-5 grid grid-cols-3 gap-x-4 gap-y-10">
      <FlashcardsThumbnail />
      <FlashcardsThumbnail />
      <FlashcardsThumbnail />
      <FlashcardsThumbnail />
      <FlashcardsThumbnail />
      <FlashcardsThumbnail />
      <FlashcardsThumbnail />
      <FlashcardsThumbnail />
    </div>
  );
}
