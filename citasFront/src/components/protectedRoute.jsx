/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { Spinner } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { refreshToken } from "../services/auth";
import { AuthContext } from "../context/authProvider";

// Componente para proteger las rutas
const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const obtenerRefreshToken = async () => {
    const data = await refreshToken();
    if (!data.ocurrioError) {
      setUser(data.resultado);
    } else {
      setUser(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken); // Decodifica el token
      setUser(decodedToken); // Asume que el token contiene el usuario
      setLoading(false);
      return;
    }
    obtenerRefreshToken();
  }, []);

  if (loading) {
    // Puedes mostrar un spinner o mensaje de carga mientras se verifica el token
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <Spinner size="lg" label="Cargando..." />
      </div>
    );
  }

  // Si el usuario no está autenticado, redirige al login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, renderiza los hijos (rutas privadas)
  return children;
};

export default ProtectedRoute;
