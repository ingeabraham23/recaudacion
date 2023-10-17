// eslint-disable-next-line no-unused-vars
import React from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';
import CopiarDatos from "./components/CopiarDatos";
import TablaPresentacion from "./components/TablaPresentacion";
import TablaEdicion from "./components/TablaEdicion";
import AgregarPersona from "./components/AgregarPersona";
import Navbar from "./components/NavBar";
import RespaldoYRestauracion from "./components/RespaldoYRestauracion";

function App() {
  return (
    <HashRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<TablaPresentacion />} />
          <Route path="/edicion" element={<TablaEdicion />} />
          <Route path="/agregar" element={<AgregarPersona />} />
          <Route path="/cargar" element={<CopiarDatos />} />
          <Route path="/respaldar" element={<RespaldoYRestauracion />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
