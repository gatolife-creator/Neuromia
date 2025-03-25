import { materialDB } from "@/lib/db";
import { useEffect, useState } from "react";

export function useMaterial(materialId: string) {
  const [material, setMaterial] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    materialDB.materials
      .where("id")
      .equals(materialId)
      .first()
      .then((material) => {
        if (material) {
          setMaterial(material);
        } else {
          console.error("Material not found");
        }
      });
  }, [materialId]);

  return { material, setMaterial };
}
