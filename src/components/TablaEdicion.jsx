// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import db from "../db"; // Importa la instancia de Dexie
import "./TablaEdicion.css"; // Importa el archivo CSS

function TablaEdicion() {
  const [personas, setPersonas] = useState([]);
  const [encabezado, setEncabezado] = useState("");

  useEffect(() => {
    async function fetchPersonas() {
      try {
        const data = await db.personas.toArray(); // Obtiene los datos de la tabla de Dexie
        setPersonas(data);
        const header = await db.encabezado.get(1); // Obtiene el valor del encabezado de la tabla de Dexie
        if (header) {
          setEncabezado(header.texto);
        }
      } catch (error) {
        console.error(
          "Error al obtener los datos de la tabla de Dexie:",
          error
        );
      }
    }

    fetchPersonas();
  }, []);

  const handleInputChange = (event, index, field) => {
    const value =
      field === "estado" ? parseInt(event.target.value) : event.target.value;
    const updatedPersonas = [...personas];
    updatedPersonas[index][field] = value;
    setPersonas(updatedPersonas);
  };

  const handleEncabezadoChange = async (event) => {
    const texto = event.target.value;
    setEncabezado(texto);

    try {
      await db.encabezado.clear(); // Borra el encabezado existente en la tabla de Dexie
      await db.encabezado.put({ id: 1, texto }); // Agrega el nuevo valor del encabezado a la tabla de Dexie
      console.log("Encabezado guardado en la tabla de Dexie");
    } catch (error) {
      console.error(
        "Error al guardar el encabezado en la tabla de Dexie:",
        error
      );
    }
  };

  const handleSave = async () => {
    try {
      await db.personas.clear(); // Limpia la tabla existente en Dexie
      await db.personas.bulkAdd(personas); // Agrega los datos actualizados a la tabla de Dexie
      console.log("Datos guardados en la tabla de Dexie");
    } catch (error) {
      console.error("Error al guardar los datos en la tabla de Dexie:", error);
    }
  };

  return (
    <div>
      <div className="container-encabezado">
        <label htmlFor="encabezadoInput"></label>
        <input
          className="input-encabezado"
          id="encabezadoInput"
          type="text"
          value={encabezado}
          onChange={handleEncabezadoChange}
        />
      </div>
      <div style={{ width: "50%", margin: "0 auto" }}>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr style={{ backgroundColor: "#F41010" }}>
              <td>0: Fuera de servicio</td>
            </tr>
            <tr style={{ backgroundColor: "#AAFF00" }}>
              <td>1: Activo</td>
            </tr>
            <tr style={{ backgroundColor: "#EFEF0F" }}>
              <td>2: Taller</td>
            </tr>
            <tr style={{ backgroundColor: "#0FB5EF" }}>
              <td>3: Checador</td>
            </tr>
            <tr style={{ backgroundColor: "#ED7FFA" }}>
              <td>4: Aportador externo</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr></hr>
      <table>
        <thead>
          <tr>
            <th colSpan={5}>{encabezado}</th>
          </tr>
          <tr>
            <th>U</th>
            <th>Nombre</th>
            <th>$</th>
            <th>St</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona, index) => (
            <tr key={persona.unidad}>
              <td>{persona.unidad}</td>
              <td>
                <input
                  className="input-nombre"
                  type="text"
                  value={persona.nombre}
                  onChange={(e) => handleInputChange(e, index, "nombre")}
                />
              </td>
              <td>
                <input
                  className="input-cooperacion"
                  type="number"
                  value={persona.cooperacion}
                  onChange={(e) => handleInputChange(e, index, "cooperacion")}
                />
              </td>
              <td>
                <input
                  className="input-cooperacion"
                  type="number"
                  value={persona.estado}
                  onChange={(e) => handleInputChange(e, index, "estado")}
                />
              </td>
              <td>
                <button onClick={handleSave}>Guardar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaEdicion;
