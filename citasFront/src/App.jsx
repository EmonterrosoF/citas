import "./App.css";

import Home from "./pages/HomePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./pages/privadas/Layout";
import CalendarioPage from "./pages/privadas/CalendarioPage";
import ClientesPage from "./pages/privadas/ClientesPage";
import ServiciosPage from "./pages/privadas/ServiciosPage";
import UsuariosPage from "./pages/privadas/usuariosPage";
import { PerfilPage } from "./pages/privadas/PerfilPage";
import ConfigPage from "./pages/privadas/configPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/panel" element={<Layout />}>
          <Route index element={<CalendarioPage />}></Route>
          <Route path="clientes" element={<ClientesPage />}></Route>
          <Route path="servicios" element={<ServiciosPage />}></Route>
          <Route path="usuarios" element={<UsuariosPage />}></Route>
          <Route path="perfil" element={<PerfilPage />}></Route>
          <Route path="configuraciones" element={<ConfigPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
