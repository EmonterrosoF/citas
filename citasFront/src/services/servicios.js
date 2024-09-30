import http from "./http";

export const obtenerServiciosCliente = async () => {
  try {
    const { data } = await http.get("/api/servicios/obtenerServiciosCliente");

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

export const obtenerServicios = async () => {
  try {
    const { data } = await http.get("/api/servicios");

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

export const guardarServicio = async (
  nombre,
  precio,
  duracion,
  privado,
  descripcion
) => {
  try {
    const { data } = await http.post(`api/servicios/guardarServicio`, {
      nombre,
      precio,
      duracion,
      privado,
      descripcion,
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

export const actualizarServicio = async (
  idServicio,
  nombre,
  precio,
  duracion,
  privado,
  descripcion
) => {
  try {
    const { data } = await http.put(`api/servicios/actualizarServicio`, {
      idServicio,
      nombre,
      precio,
      duracion,
      privado,
      descripcion,
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

export const eliminarServicio = async (idServicio) => {
  try {
    const { data } = await http.delete(
      `api/servicios/eliminarServicio/` + idServicio
    );

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

export const obtenerServiciosPorUsuario = async (idUsuario) => {
  try {
    const { data } = await http.get(
      `/api/servicios/obtenerServiciosPorUsuario/${idUsuario}`
    );

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
