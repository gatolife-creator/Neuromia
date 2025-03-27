import Dexie, { EntityTable } from "dexie";
import { MaterialData } from "./interfaces";

const materialDB = new Dexie("materials") as Dexie & {
  materials: EntityTable<MaterialData, "id">;
};

materialDB.version(1).stores({
  materials: "id,title,description,serializedCards",
});

export { materialDB };
