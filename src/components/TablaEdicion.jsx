// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import db from "../db";
import "./TablaEdicion.css";

function TablaEdicion() {
  const [personas, setPersonas] = useState([]);
  const [encabezado, setEncabezado] = useState(
    "Recaudación para apoyar al compañero: , Operador de la unidad: ."
  );
  const [recaudador, setRecaudador] = useState("Recaudador: .");
  const [motivo, setMotivo] = useState("Ya que lamentablemente: .");

  useEffect(() => {
    async function fetchPersonas() {
      try {
        const data = await db.personas.toArray();
        setPersonas(data);
        const header = await db.encabezado.get(1);
        if (header) {
          setEncabezado(header.texto);
        }
        const recauda = await db.recaudador.get(1);
        if (recauda) {
          setRecaudador(recauda.texto);
        }
        const motivo = await db.motivo.get(1);
        if (motivo) {
          setMotivo(motivo.texto);
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
      await db.encabezado.clear();
      await db.encabezado.put({ id: 1, texto });
      console.log("Encabezado guardado en la tabla de Dexie");
    } catch (error) {
      console.error(
        "Error al guardar el encabezado en la tabla de Dexie:",
        error
      );
    }
  };

  const handleRecaudadorChange = async (event) => {
    const texto = event.target.value;
    setRecaudador(texto);

    try {
      await db.recaudador.clear();
      await db.recaudador.put({ id: 1, texto });
      console.log("Recaudador guardado en la tabla de Dexie");
    } catch (error) {
      console.error(
        "Error al guardar el recaudador en la tabla de Dexie:",
        error
      );
    }
  };

  const handleMotivoChange = async (event) => {
    const texto = event.target.value;
    setMotivo(texto);

    try {
      await db.motivo.clear();
      await db.motivo.put({ id: 1, texto });
      console.log("Motivo guardado en la tabla de Dexie");
    } catch (error) {
      console.error(
        "Error al guardar el motivo en la tabla de Dexie:",
        error
      );
    }
  };

  const handleDelete = (index) => {
    const updatedPersonas = [...personas];
    updatedPersonas.splice(index, 1);
    setPersonas(updatedPersonas);
  };

  const handleSave = async () => {
    try {
      await db.personas.clear();
      await db.personas.bulkAdd(personas);
      console.log("Datos guardados en la tabla de Dexie");
    } catch (error) {
      console.error("Error al guardar los datos en la tabla de Dexie:", error);
    }
  };


  return (
    <div>
      <br></br>
      <br></br>
      {/* LEYENDA DE COLORES */}
      <div
        style={{
          width: "98%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between", // una a la izquierda y otra a la derecha
          alignItems: "flex-start",
        }}
      >
        <table
          style={{
            width: "40%",
            display: "inline-block",
            verticalAlign: "top",
            border: 0,
            tableLayout: "fixed",   // 👈 fuerza el ancho
          }}
        >
          <tbody>
            <tr style={{ backgroundColor: "#F41010" }}>
              <td style={{ fontSize: "12px" }}>0: Fuera de servicio.</td>
            </tr>
            <tr style={{ backgroundColor: "#AAFF00" }}>
              <td style={{ fontSize: "12px" }}>1: Activo.</td>
            </tr>
            <tr style={{ backgroundColor: "#EFEF0F" }}>
              <td style={{ fontSize: "12px" }}>2: Taller.</td>
            </tr>
            <tr style={{ backgroundColor: "#0FB5EF" }}>
              <td style={{ fontSize: "12px" }}>3: Checador.</td>
            </tr>
            <tr style={{ backgroundColor: "#ED7FFA" }}>
              <td style={{ fontSize: "12px" }}>4: Aportador externo.</td>
            </tr>
            <tr style={{ backgroundColor: "#FF8503" }}>
              <td style={{ fontSize: "12px" }}>5: Posturero.</td>
            </tr>
          </tbody>
        </table>

        <table
          style={{
            width: "50%",
            display: "inline-block",
            verticalAlign: "top",
            border: 0,
            tableLayout: "fixed",   // 👈 fuerza el ancho
          }}
        >
          <tbody>


            <tr style={{ backgroundColor: "white" }}>
              <td style={{ fontSize: "12px" }}>6: No se le pidió.</td>
            </tr>
            <tr style={{ backgroundColor: "black", color: "red" }}>
              <td style={{ fontSize: "12px" }}>7: No quiso dar.</td>
            </tr>
            <tr style={{ backgroundColor: "DarkGreen", color: "white" }}>
              <td style={{ fontSize: "12px" }}>
                8: Dijo que a la vuelta y ya no se reportó.
              </td>
            </tr>
            <tr style={{ backgroundColor: "#3700ff", color: "white" }}>
              <td style={{ fontSize: "12px" }}>
                9: Dijo que al otro día y ya no se reportó.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container-encabezado">
        <label htmlFor="encabezadoInput"></label>
        <textarea
          className="input-encabezado"
          id="encabezadoInput"
          value={encabezado}
          onChange={handleEncabezadoChange}
          rows={4} // Puedes ajustar el número de filas según tus necesidades
        />
        
      </div>
      <div className="container-encabezado">
        <label htmlFor="encabezadoInput"></label>
        <textarea
          className="input-encabezado"
          id="motivoInput"
          value={motivo}
          onChange={handleMotivoChange}
          rows={4} // Puedes ajustar el número de filas según tus necesidades
        />

      </div>
      <div className="container-encabezado">
      <input
          className="input-recaudador"
          id="recaudadorInput"
          type="text"
          value={recaudador}
          onChange={handleRecaudadorChange}
        />
      </div>
      <div style={{ width: "50%", margin: "0 auto" }}>
        <table style={{ width: "100%" }}>
          <tbody>
            {/* Tabla de leyenda */}
            {/* ... (omitido por brevedad) */}
          </tbody>
        </table>
      </div>
      <hr></hr>
      <table>
        <thead>
          {/* Encabezado de la tabla */}
          {/* ... (omitido por brevedad) */}
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
                <button onClick={() => handleDelete(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleSave}>Guardar cambios</button>
      </div>
    </div>
  );
}

export default TablaEdicion;
