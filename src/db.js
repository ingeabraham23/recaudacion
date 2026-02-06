import Dexie from "dexie";

const database = new Dexie("MiBaseDeDatos");
database.version(2).stores({
  personas: "++id, unidad, nombre, cooperacion, estado",
  encabezado: "++id, texto",
  recaudador: "++id, texto",
  motivo: "++id, texto"
});

export default database;
