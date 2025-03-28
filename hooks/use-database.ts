import { materialDB } from "@/lib/db";

export function useDatabase() {
  const deleteAllData = () => {
    materialDB.materials.clear();
  };

  return { deleteAllData };
}
