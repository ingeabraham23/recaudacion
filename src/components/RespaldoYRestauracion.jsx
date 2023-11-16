// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import db from "../db";
import jsonData from "./backupRecaudacion.json";
import "./RespaldoYRestauracion.css"

function RespaldoYRestauracion() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Función para respaldar la base de datos en un Archivo JSON
const handleBackup = async () => {
  try {
    // Abre la conexión a la base de datos
    await db.open();

    // Obtiene los datos de personas desde la base de datos
    const personas = await db.personas.toArray();

    // Obtiene los datos de encabezado desde la base de datos (asumiendo que db.encabezado es una entidad válida)
    const encabezado = await db.encabezado.toArray();

     // Obtiene los datos de recaudador desde la base de datos (asumiendo que db.recaudador es una entidad válida)
     const recaudador = await db.recaudador.toArray();

    // Combina los datos de personas y encabezado en un objeto
    const backupData = {
      personas,
      encabezado,
      recaudador,
    };

    // Convierte el objeto a formato JSON con formato legible
    const jsonData = JSON.stringify(backupData, null, 2);

    // Crea un objeto Blob a partir del JSON
    const blob = new Blob([jsonData], { type: "application/json" });

    // Crea una URL para el Blob
    const url = URL.createObjectURL(blob);

    // Crea un elemento <a> temporal para la descarga
    const a = document.createElement("a");
    a.href = url;
    a.download = "backupRecaudacion.json";

    // Simula un clic en el enlace para iniciar la descarga
    a.click();

    // Limpia la URL del objeto Blob
    URL.revokeObjectURL(url);

    console.log("Base de datos respaldada correctamente");
  } catch (error) {
    // Maneja los errores de manera adecuada, por ejemplo, mostrando un mensaje al usuario
    console.error("Error al respaldar la base de datos:", error);
  }
};

  // Función para restaurar la base de datos
const handleRestore = async () => {
  try {
    // Abre la conexión a la base de datos
    await db.open();

    // Verifica si se ha seleccionado un archivo
    if (selectedFile) {
      // Lee el contenido del archivo como texto
      const fileContent = await selectedFile.text();

      // Intenta analizar el contenido del archivo JSON
      const parsedData = JSON.parse(fileContent);

      // Verifica si parsedData contiene la propiedad 'personas' antes de realizar la restauración
      if (parsedData && parsedData.personas) {
        // Borrar todos los registros actuales antes de restaurar las personas
        await db.personas.clear();

        // Insertar los nuevos registros de personas desde el archivo JSON
        await db.personas.bulkAdd(parsedData.personas);

        // Puedes realizar acciones similares para restaurar los datos del encabezado
        if (parsedData.encabezado) {
          await db.encabezado.clear();
          await db.encabezado.bulkAdd(parsedData.encabezado);
        }

        // Puedes realizar acciones similares para restaurar los datos del recaudador
        if (parsedData.recaudador) {
          await db.recaudador.clear();
          await db.recaudador.bulkAdd(parsedData.recaudador);
        }

        console.log("Base de datos restaurada correctamente");
      } else {
        console.error("El archivo no tiene el formato esperado. No se puede restaurar la base de datos.");
      }
    } else {
      console.error("No se ha seleccionado ningún archivo para la restauración.");
    }
  } catch (error) {
    // Maneja los errores de manera adecuada, por ejemplo, mostrando un mensaje al usuario
    console.error("Error al restaurar la base de datos:", error);
  }
};

const handleLoadFromJSON = async () => {
  try {
    // Abre la conexión a la base de datos
    await db.open();

    // Borrar todos los registros actuales antes de cargar desde JSON
    await db.personas.clear();

    // Insertar los nuevos registros desde los datos importados del archivo JSON
    await db.personas.bulkAdd(jsonData.personas);

    // Supongamos que jsonData también tiene la propiedad 'encabezado'
    // Insertar o actualizar los datos del encabezado
      await db.encabezado.clear();
      await db.encabezado.bulkAdd(jsonData.encabezado);

      await db.recaudador.clear();
      await db.recaudador.bulkAdd(jsonData.recaudador);

    console.log("Datos cargados desde JSON correctamente");
  } catch (error) {
    console.error("Error al cargar datos desde JSON:", error);
  }
};


  return (
    <div className="container-respaldo">
      <h3>Respaldar y Restaurar Base de Datos</h3>
      <div className="input-container">
        <label className="label" htmlFor="backupFile">Seleccionar archivo de respaldo:</label>
        <input className="input-file"
          type="file"
          id="backupFile"
          accept=".json"
          onChange={handleFileChange}
        />
        <button className="button restore" onClick={handleRestore}>Restaurar respaldo desde archivo JSON</button>
      </div>
      <div className="button-container">
        <button className="button backup" onClick={handleBackup}>Crear respaldo</button>
        
        
      </div>
      <div className="button-container"><button className="button load" onClick={handleLoadFromJSON}>Cargar datos guardados anteriormente</button></div>
    </div>
  );
}

export default RespaldoYRestauracion;