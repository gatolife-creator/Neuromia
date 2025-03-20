import Dexie, { EntityTable } from "dexie";

interface MaterialDataOnDB {
  id: string;
  title: string;
  description: string;
  serializedCards: string;
}

const materialDB = new Dexie("materials") as Dexie & {
  materials: EntityTable<MaterialDataOnDB, "id">;
};

materialDB.version(1).stores({
  materials: "id,title,description,serializedCards",
});

export type { MaterialDataOnDB };
export { materialDB };
