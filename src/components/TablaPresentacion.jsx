/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import db from "../db";
import html2canvas from "html2canvas";
import "./TablaPresentacion.css"; // Importa el archivo CSS

function TablaPresentacion() {
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const [personas, setPersonas] = useState([]);
  const [encabezado, setEncabezado] = useState("");
  const [fecha, setFecha] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    async function fetchPersonas() {
      try {
        const data = await db.personas.toArray();
        setPersonas(data);
      } catch (error) {
        console.error(
          "Error al obtener los datos de la tabla de Dexie:",
          error
        );
      }
    }

    async function fetchEncabezado() {
      try {
        const data = await db.encabezado.toArray();
        if (data.length > 0) {
          setEncabezado(data[0].texto);
        }
      } catch (error) {
        console.error(
          "Error al obtener el encabezado de la tabla de Dexie:",
          error
        );
      }
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("es-MX", opciones);
    setFecha(formattedDate);

    fetchPersonas();
    fetchEncabezado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const obtenerColorFila = (estado) => {
    switch (estado) {
      case 0:
        return "#F41010"; //Fuera de servicio
      case 1:
        return "#AAFF00"; //Activo
      case 2:
        return "#EFEF0F"; //Taller
      case 3:
        return "#0FB5EF"; //Checador
      default:
        return "white";
    }
  };

  const handleCaptureTable = () => {
    if (containerRef.current) {
      const scale = 2; 
      html2canvas(containerRef.current, { scale }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = imgData;
        downloadLink.download = encabezado + fecha;
        downloadLink.click();
      });
    }
  };

  return (
    <div ref={containerRef}>
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
      <div className="container">
        {encabezado}
        <hr></hr>
        Fecha: {fecha}
      </div>

      <div className="tabla-container">
        <table className="tabla-izquierda">
          <thead>
            <tr>
              <th>Unidad</th>
              <th>Operador</th>
              <th>Aporte</th>
            </tr>
          </thead>
          <tbody>
            {personas
              .slice(0, Math.ceil(personas.length / 2))
              .map((persona, index) => (
                <tr
                  key={index}
                  style={{ backgroundColor: obtenerColorFila(persona.estado) }}
                >
                  <td>{persona.unidad}</td>
                  <td>{persona.nombre}</td>
                  <td>${persona.cooperacion}.00</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="tabla-container-derecha">
        <table className="tabla-derecha">
          <thead>
            <tr>
              <th>Unidad</th>
              <th>Operador</th>
              <th>Aporte</th>
            </tr>
          </thead>
          <tbody>
            {personas
              .slice(Math.ceil(personas.length / 2))
              .map((persona, index) => (
                <tr
                  key={persona.unidad}
                  style={{ backgroundColor: obtenerColorFila(persona.estado) }}
                >
                  <td>{persona.unidad}</td>
                  <td>{persona.nombre}</td>
                  <td>${persona.cooperacion}.00</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="container-pie2"></div>
      <div className="container-pie">
        Total: ${" "}
        {personas
          .reduce(
            (total, persona) => total + parseFloat(persona.cooperacion),
            0
          )
          .toFixed(2)}
      </div>
      <div>
        <button onClick={handleCaptureTable}>Capturar Tabla</button>
      </div>
    </div>
  );
}

export default TablaPresentacion;
