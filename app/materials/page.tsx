"use client";

import React, { useEffect, useState } from "react";
import { FlashcardsThumbnail } from "../../components/flashcards-thumnail";
import { materialDB } from "@/lib/db";
import { MaterialMetaData } from "@/lib/interfaces";

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<MaterialMetaData[]>([]);

  useEffect(() => {
    (async () => {
      const materials = await materialDB.materials.toArray();
      setMaterials(materials);
    })();
  }, []);
  return (
    <div className="container mx-auto p-6 my-5">
      {materials.map((material) => (
        <FlashcardsThumbnail
          key={material.id}
          id={material.id}
          title={material.title}
        />
      ))}
    </div>
  );
}
