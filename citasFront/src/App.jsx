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
import LoginPage from "./pages/privadas/LoginPage";
import RecuperarPage from "./pages/privadas/RecuperarPage";
import { AuthProvider } from "./context/authProvider";
import ProtectedRoute from "./components/protectedRoute";
import VerificateIsLogin from "./components/verificateIsLogin";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/panel"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CalendarioPage />}></Route>
            <Route path="clientes" element={<ClientesPage />}></Route>
            <Route path="servicios" element={<ServiciosPage />}></Route>
            <Route path="usuarios" element={<UsuariosPage />}></Route>
            <Route path="perfil" element={<PerfilPage />}></Route>
            <Route path="configuraciones" element={<ConfigPage />}></Route>
          </Route>
          <Route
            path="/login"
            element={
              <VerificateIsLogin>
                <LoginPage />
              </VerificateIsLogin>
            }
          />
          <Route
            path="/recuperar"
            element={
              <VerificateIsLogin>
                <RecuperarPage />
              </VerificateIsLogin>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
