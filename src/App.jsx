// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CopiarDatos from "./components/CopiarDatos";
import TablaPresentacion from "./components/TablaPresentacion";
import TablaEdicion from "./components/TablaEdicion";
import AgregarPersona from "./components/AgregarPersona";
import Navbar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/vista" element={<TablaPresentacion />} />
          <Route path="/edicion" element={<TablaEdicion />} />
          <Route path="/agregar" element={<AgregarPersona />} />
          <Route path="/cargar" element={<CopiarDatos />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
