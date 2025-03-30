"use client";

import React, { useEffect, useState } from "react";
import { FlashcardsThumbnail } from "@/components/flashcards-thumnail";
import { materialDB } from "@/lib/db";
import { MaterialMetaData } from "@/lib/interfaces";
import { PageTitle } from "@/components/page-title";

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<MaterialMetaData[]>([]);

  useEffect(() => {
    (async () => {
      const materials = await materialDB.materials.toArray();
      setMaterials(materials);
    })();
  }, []);
  return (
    <div>
      <PageTitle>教材一覧</PageTitle>
      <div className="container mx-auto my-5 p-6">
        {materials.map((material) => (
          <FlashcardsThumbnail
            className="my-5"
            key={material.id}
            id={material.id}
            title={material.title}
            tags={material.tags}
          />
        ))}
      </div>
    </div>
  );
}
