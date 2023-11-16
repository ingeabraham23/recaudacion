import Dexie from "dexie";

const database = new Dexie("MiBaseDeDatos");
database.version(1).stores({
  personas: "++id, unidad, nombre, cooperacion, estado",
  encabezado: "++id, texto",
  recaudador: "++id, texto"
});

export default database;
