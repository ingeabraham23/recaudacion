/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import db from "../db";
import html2canvas from "html2canvas";
import "./TablaPresentacion.css"; // Importa el archivo CSS

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from "date-fns/locale/es";
import { registerLocale } from "react-datepicker";

registerLocale("es", es);

function TablaPresentacion() {
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const [personas, setPersonas] = useState([]);
  const [encabezado, setEncabezado] = useState(
    "Recaudación para apoyar al compañero: , Operador de la unidad: .",
  );
  const [recaudador, setRecaudador] = useState("Recaudador: .");
  const [motivo, setMotivo] = useState("Ya que lamentablemente: .");
  const containerRef = useRef(null);

  const fechaActual = new Date(); // Obtiene la fecha actual
  const [fechaSeleccionada, setFechaSeleccionada] = useState(fechaActual); // Estado para la fecha seleccionada en el DatePicker, se inicializa con la fecha en que se esta ejecutando la aplicación

  useEffect(() => {
    async function fetchPersonas() {
      try {
        const data = await db.personas.toArray();
        setPersonas(data);
      } catch (error) {
        console.error(
          "Error al obtener los datos de la tabla de Dexie:",
          error,
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
          error,
        );
      }
    }

    async function fetchRecaudador() {
      try {
        const data = await db.recaudador.toArray();
        if (data.length > 0) {
          setRecaudador(data[0].texto);
        }
      } catch (error) {
        console.error(
          "Error al obtener el recaudador de la tabla de Dexie:",
          error,
        );
      }
    }

    async function fetchMotivo() {
      try {
        const data = await db.motivo.toArray();
        if (data.length > 0) {
          setMotivo(data[0].texto);
        }
      } catch (error) {
        console.error(
          "Error al obtener el motivo de la tabla de Dexie:",
          error,
        );
      }
    }

    fetchPersonas();
    fetchEncabezado();
    fetchRecaudador();
    fetchMotivo();
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
      case 4:
        return "#ED7FFA"; //Aportador externo
      case 5:
        return "#FF8503"; //Posturero
      case 6:
        return "white"; //No se le pidio
      case 7:
        return "#000000"; //No quiso dar
      case 8:
        return "DarkGreen"; //Dijo que a la vuelta y ya no se reporto
      case 9:
        return "#3700ff"; //Dijo que al otro día y ya no se reporto
      default:
        return "white";
    }
  };

  const obtenerColorTexto = (estado) => {
    switch (estado) {
      case 0:
        return "#000000"; //Fuera de servicio
      case 1:
        return "#000000"; //Activo
      case 2:
        return "#000000"; //Taller
      case 3:
        return "#000000"; //Checador
      case 4:
        return "#000000"; //Aportador externo
      case 5:
        return "#000000"; //Posturero
      case 6:
        return "#000000"; //No se le pidio
      case 7:
        return "red"; //No quiso dar
      case 8:
        return "#FFFFFF"; //Dijo que a la vuelta y ya no se reporto
      case 9:
        return "#FFFFFF"; //Dijo que al otro día y ya no se reporto
      default:
        return "#000000";
    }
  };

  const handleCaptureTable = () => {
    if (containerRef.current) {
      const scale = 6;
      html2canvas(containerRef.current, { scale }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = imgData;
        downloadLink.download =
          encabezado + fechaSeleccionada.toLocaleDateString("es-MX", opciones);
        downloadLink.click();
      });
    }
  };

  function controlarFechaSeleccionada(fecha) {
    setFechaSeleccionada(fecha);
  }

  const personasConCooperacion = personas.filter(
    (persona) => parseFloat(persona.cooperacion) > 0,
  );
  const personasSinCooperacion = personas.filter(
    (persona) => parseFloat(persona.cooperacion) === 0,
  );

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <div ref={containerRef} style={{ width: "100%" }}>
        {/* LEYENDA DE COLORES */}
        <div className="contenedor-leyenda">
          <table className="tabla-leyenda">
            <tbody>
              <tr style={{ backgroundColor: "#F41010" }}>
                <td>0: Fuera de servicio.</td>
              </tr>
              <tr style={{ backgroundColor: "#AAFF00" }}>
                <td>1: Activo.</td>
              </tr>
              <tr style={{ backgroundColor: "#EFEF0F" }}>
                <td>2: Taller.</td>
              </tr>
              <tr style={{ backgroundColor: "#0FB5EF" }}>
                <td>3: Checador.</td>
              </tr>
              <tr style={{ backgroundColor: "#ED7FFA" }}>
                <td>4: Aportador externo.</td>
              </tr>
            </tbody>
          </table>

          <table className="tabla-leyenda">
            <tbody>
              <tr style={{ backgroundColor: "#FF8503" }}>
                <td>5: Posturero.</td>
              </tr>
              <tr style={{ backgroundColor: "white" }}>
                <td>6: No se le pidió.</td>
              </tr>
              <tr style={{ backgroundColor: "black", color: "red" }}>
                <td>7: No quiso dar.</td>
              </tr>
              <tr style={{ backgroundColor: "DarkGreen", color: "white" }}>
                <td>8: Dijo que a la vuelta y ya no se reportó.</td>
              </tr>
              <tr style={{ backgroundColor: "#3700ff", color: "white" }}>
                <td>9: Dijo que al otro día y ya no se reportó.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ENCABEZADOS */}
        <div className="encabezado-recaudacion-presentacion">{encabezado}</div>

        <div className="encabezado-motivo">{motivo}</div>

        <div className="encabezado-recaudador">{recaudador}</div>

        <div className="container">
          Fecha: {fechaSeleccionada.toLocaleDateString("es-MX", opciones)}
        </div>

        {/* --- TABLAS EN FLEXBOX (ya sin float) --- */}
        <div className="contenedor-tablas">
          {/* TABLA IZQUIERDA */}
          <div style={{ width: "49%" }}>
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
                      style={{
                        backgroundColor: obtenerColorFila(persona.estado),
                        color: obtenerColorTexto(persona.estado),
                      }}
                    >
                      <td>{persona.unidad}</td>
                      <td>{persona.nombre}</td>
                      <td>$ {persona.cooperacion}.00</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* TABLA DERECHA */}
          <div style={{ width: "49%" }}>
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
                  .map((persona) => (
                    <tr
                      key={persona.unidad}
                      style={{
                        backgroundColor: obtenerColorFila(persona.estado),
                        color: obtenerColorTexto(persona.estado),
                      }}
                    >
                      <td>{persona.unidad}</td>
                      <td>{persona.nombre}</td>
                      <td>$ {persona.cooperacion}.00</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PIE DE TOTALES */}
        <div className="container-pie">
          Total:{" "}
          {formatNumberWithCommas(
            personas
              .reduce(
                (total, persona) => total + parseFloat(persona.cooperacion),
                0,
              )
              .toFixed(2),
          )}
        </div>

        <div
          className="container-pie2"
          style={{ backgroundColor: "DeepSkyBlue" }}
        >
          Total de Personas: {personas.length}
        </div>

        <div
          className="container-pie2"
          style={{ backgroundColor: "Chartreuse" }}
        >
          Total Personas que colaboraron: {personasConCooperacion.length}
        </div>

        <div className="container-pie2" style={{ backgroundColor: "red" }}>
          Total Personas que no colaboraron: {personasSinCooperacion.length}
        </div>
        <div className="container-pie2" style={{ backgroundColor: "gray" }}>
          @el.joyboy.de.chignautla
        </div>
      </div>

      {/* BOTÓN Y CALENDARIO */}
      <div className="container-calendar">
        <button onClick={handleCaptureTable}>Capturar Tabla</button>
      </div>

      <div className="container-calendar">
        <DatePicker
          selected={fechaSeleccionada}
          showIcon
          withPortal
          onChange={controlarFechaSeleccionada}
          locale="es"
          onFocus={(e) => {
            e.target.readOnly = true;
            e.target.blur();
          }}
        />
      </div>
    </div>
  );
}

export default TablaPresentacion;
