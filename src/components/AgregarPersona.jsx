// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import db from "../db"; // Importa la instancia de Dexie

function AgregarPersona() {
  const [nuevaPersona, setNuevaPersona] = useState({
    unidad: "",
    nombre: "",
    cooperacion: 0,
    estado: 0
  });

  const handleInputChange = (event, field) => {
    const value = field === "estado" ? parseInt(event.target.value) : event.target.value;
    setNuevaPersona({ ...nuevaPersona, [field]: value });
  };

  const handleAgregarPersona = async () => {
    try {
      await db.personas.add(nuevaPersona);
      setNuevaPersona({
        unidad: "",
        nombre: "",
        cooperacion: 0,
        estado: 0
      });
      console.log("Persona agregada a la tabla de Dexie");
    } catch (error) {
      console.error("Error al agregar la persona a la tabla de Dexie:", error);
    }
  };

  return (
    <div>
      <h3>Agregar Persona</h3>
      <div>
        <label htmlFor="unidadInput">Unidad:</label>
        <input
          id="unidadInput"
          type="text"
          value={nuevaPersona.unidad}
          onChange={(e) => handleInputChange(e, "unidad")}
        />
      </div>
      <div>
        <label htmlFor="nombreInput">Nombre:</label>
        <input
          id="nombreInput"
          type="text"
          value={nuevaPersona.nombre}
          onChange={(e) => handleInputChange(e, "nombre")}
        />
      </div>
      <div>
        <label htmlFor="cooperacionInput">Cooperación:</label>
        <input
          id="cooperacionInput"
          type="number"
          value={nuevaPersona.cooperacion}
          onChange={(e) => handleInputChange(e, "cooperacion")}
        />
      </div>
      <div>
        <label htmlFor="estadoInput">Estado:</label>
        <input
          id="estadoInput"
          type="number"
          value={nuevaPersona.estado}
          onChange={(e) => handleInputChange(e, "estado")}
        />
      </div>
      <button onClick={handleAgregarPersona}>Agregar Persona</button>
    </div>
  );
}

export default AgregarPersona;
