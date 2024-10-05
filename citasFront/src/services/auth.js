import http from "./http";

export const preAutenticar = async (usuario, password) => {
  try {
    const { data } = await http.post(`api/auth/preAutenticar/`, {
      usuario,
      password,
    });

    return data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      return {
        ocurrioError: true,
        mensaje:
          "Tiempo de respuesta agotado, por favor revisa tu conexion a internet o intenta nuevamente o mas tarde",
        resultado: null,
      };
    }
    return error.response.data;
  }
};

export const autenticar = async (usuario, password, token) => {
  try {
    const { data } = await http.post(`api/auth/autenticar/`, {
      usuario,
      password,
      token,
    });

    return data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      return {
        ocurrioError: true,
        mensaje:
          "Tiempo de respuesta agotado, por favor revisa tu conexion a internet o intenta nuevamente o mas tarde",
        resultado: null,
      };
    }
    return error.response.data;
  }
};

export const cerrarSesion = async () => {
  try {
    const { data } = await http.get(`api/auth/logout/`);

    return data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      return {
        ocurrioError: true,
        mensaje:
          "Tiempo de respuesta agotado, por favor revisa tu conexion a internet o intenta nuevamente o mas tarde",
        resultado: null,
      };
    }
    return error.response.data;
  }
};

export const refreshToken = async () => {
  try {
    const { data } = await http.get(`api/auth/refreshToken/`);

    return data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      return {
        ocurrioError: true,
        mensaje:
          "Tiempo de respuesta agotado, por favor revisa tu conexion a internet o intenta nuevamente o mas tarde",
        resultado: null,
      };
    }
    return error.response.data;
  }
};
