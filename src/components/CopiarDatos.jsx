// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import db from "../db";
import Arreglo from "../arreglo";

function CopiarDatos() {
  const rojos = Arreglo();
  const encabezado = "Recaudación para apoyar al compañero Operador de la unidad ";
  const [copyCompleted, setCopyCompleted] = useState(false);
  const [texto, setTexto] = useState("");

  const CopiarDatosToDB = async () => {
    const personasCount = await db.personas.count();
    

    if (personasCount === 0) {
      await db.personas.bulkPut(rojos);

      // Guarda el texto del encabezado en la tabla db.encabezado
      await db.encabezado.clear();
      await db.encabezado.add({ texto: encabezado });

      setCopyCompleted(true);
      setTexto("Los datos se han copiado correctamente.")
    }else{
      setTexto("Los datos ya existen.")
      setCopyCompleted(true);
    }
  };

  return (
    <div>
      {copyCompleted ? (
        <p>{texto}</p>
      ) : (
        <button onClick={CopiarDatosToDB}>Copiar datos a la base de datos</button>
      )}
    </div>
  );
}

export default CopiarDatos;


