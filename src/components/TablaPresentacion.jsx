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
  const tableRef = useRef(null);

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
        return "red"; //Fuera de servicio
      case 1:
        return "#95F562"; //Activo
      case 2:
        return "#EFEF0F"; //Taller
      case 3:
        return "#0FB5EF"; //Checador
      default:
        return "white";
    }
  };

  const handleCaptureTable = () => {
    if (tableRef.current) {
      html2canvas(tableRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = imgData;
        downloadLink.download = "tabla.png";
        downloadLink.click();
      });
    }
  };

  return (
    <div>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th colSpan="4">{encabezado}</th>
          </tr>
          <tr>
            <th colSpan="4">Fecha: {fecha}</th>
          </tr>
          <tr>
            <th></th>
            <th>Unidad</th>
            <th>Operador</th>
            <th>Aporte</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona, index) => (
            <tr
              key={persona.unidad}
              style={{ backgroundColor: obtenerColorFila(persona.estado) }}
            >
              <td className="celda-contador">{index + 1}</td>
              <td>{persona.unidad}</td>
              <td>{persona.nombre}</td>
              <td>$ {persona.cooperacion}.00</td>
            </tr>
          ))}
          <tr>
            <td className="fila-total" colSpan="2">
              <strong>Total:</strong>
            </td>
            <td className="fila-total" colSpan="2">
              <strong>
                ${" "}
                {personas
                  .reduce(
                    (total, persona) => total + parseFloat(persona.cooperacion),
                    0
                  )
                  .toFixed(2)}
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button onClick={handleCaptureTable}>Capturar Tabla</button>
      </div>
    </div>
  );
}

export default TablaPresentacion;
