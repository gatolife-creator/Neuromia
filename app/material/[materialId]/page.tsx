"use client";

import React, { useEffect, useState } from "react";
import { FlashcardDeck } from "@/components/flashcard-deck";
import { useDatabaseByMaterialId } from "@/hooks/use-database-by-materialId";

export default function MaterialPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const [materialId, setMaterialId] = useState("");
  const { cards, material } = useDatabaseByMaterialId(materialId);

  useEffect(() => {
    (async () => {
      const { materialId } = await params;
      setMaterialId(materialId);
    })();
  });

  return (
    <div>{cards && <FlashcardDeck cards={cards} title={material.title} />}</div>
  );
}
