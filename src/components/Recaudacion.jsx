// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from "react";
import "./Recaudacion.css";
import html2canvas from "html2canvas";

function Recaudacion() {
  const tablaRef = useRef(null);

  const [inputs, setInputs] = useState({
    nombre: "",
    numero: "",
    motivo: "",
    recaudador: "",
    fecha: "",
    hora: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica para guardar los datos, si es necesario
  };

  function capturarTabla(tabla) {
    html2canvas(tabla, { scale: 6 }).then(function (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `apoyo.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la persona que se apoyará:"
            value={inputs.nombre}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="text"
            name="numero"
            placeholder="Numero de la unidad que maneja"
            value={inputs.numero}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="text"
            name="motivo"
            placeholder="Motivo:"
            value={inputs.motivo}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="text"
            name="recaudador"
            placeholder="Recaudador:"
            value={inputs.recaudador}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="text"
            name="fecha"
            placeholder="Fecha:"
            value={inputs.fecha}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="text"
            name="hora"
            placeholder="Hora:"
            value={inputs.hora}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Agregar</button>
      </form>
      <hr></hr>
      <table className="tabla" ref={tablaRef}>
        <thead>
          <tr>
            <th className="encabezado-recaudacion">
              <div className="decoracion-superior">
                <img src="/corazon.png" alt="" />

                <img src="/solidaridad.png" alt="" />

                <img src="/paloma.png" alt="" />
              </div>

              <img
                className="logo-urbanos"
                src="/urbanos-rojos.png"
                alt="Urbanos Rojos"
              />

              <div className="titulo-apoyo">APOYO VOLUNTARIO</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="apoya">Apoya al compañero:</td>
          </tr>
          <tr></tr>
          <tr>
            <td className="al-compañero">{inputs.nombre}</td>
          </tr>
          <tr>
            <td className="apoya">Operador de la la unidad número: </td>
          </tr>
          <tr></tr>
          <tr>
            <td className="al-compañero">{inputs.numero}</td>
          </tr>
          <tr>
            <td className="lamentablemente-recaudacion">
              Ya que lamentablemente:
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td className="motivo">{inputs.motivo}</td>
          </tr>
          <tr>
            <td className="apoya">La recaudación la realizara el compañero:</td>
          </tr>
          <tr>
            <td className="al-compañero">{inputs.recaudador}</td>
          </tr>
          <tr>
            <td className="fecha">{inputs.fecha}</td>
          </tr>
          <tr>
            <td className="hora">{inputs.hora}</td>
          </tr>
          <tr>
  <td className="tips-encabezado">
    ♥ ACUERDOS DE SOLIDARIDAD ♥
  </td>
</tr>

<tr>
  <td className="tips-recaudacion">
    ♥ Estas recaudaciones son voluntarias y representan un acto de apoyo y solidaridad entre compañeros.
  </td>
</tr>

<tr>
  <td className="tips-recaudacion">
    ♥ El apoyo aplica cuando un familiar directo del compañero se encuentre hospitalizado o haya fallecido.
  </td>
</tr>

<tr>
  <td className="tips-recaudacion">
    ♥ No aplica en casos donde el compañero o su familiar cuente con respaldo del IMSS.
  </td>
</tr>

<tr>
  <td className="tips-recaudacion">
    ♥ Se solicita que quien reciba el apoyo haya participado anteriormente en las recaudaciones del grupo, ya sea aportando o colaborando.
  </td>
</tr>
        </tbody>
        <tfoot>
          <tr>
            <td className="copyright-recaudacion">@el.joyboy.de.chignautla</td>
          </tr>
        </tfoot>
      </table>
      <button
        className="boton-capturar"
        onClick={() => capturarTabla(tablaRef.current)}
      >
        Capturar
      </button>
    </div>
  );
}

export default Recaudacion;
