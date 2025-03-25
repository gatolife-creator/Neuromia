import { materialDB } from "@/lib/db";
import { useEffect, useState } from "react";

export function useTags(materialId: string) {
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    materialDB.materials
      .where("id")
      .equals(materialId)
      .first()
      .then((material) => {
        if (material) {
          setTags(material.tags);
        } else {
          console.error("Material not found");
        }
      });
  }, [materialId]);
  return { tags, setTags };
}
