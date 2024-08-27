import http from "./http";

export const obtenerCitasPorProveedor = async (idProveedor) => {
  try {
    const { data } = await http.get(`api/citas/proveedor/${idProveedor}`);

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

export const obtenerDiasNoLaborales = async () => {
  try {
    const { data } = await http.get(`api/citas/diasNoLaborales`);

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

export const obtenerHorariosDisponiblesPorFecha = async (
  fecha,
  idProveedor,
  duracionServicio
) => {
  try {
    const { data } = await http.get(
      `api/citas/horarioDisponible?fecha=${fecha}&idProveedor=${idProveedor}&duracionServicio=${duracionServicio}`
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

export const guardarCita = async (
  idServicio,
  duracionServicio,
  idProveedor,
  fechaInicio,
  hora,
  nombreCliente,
  apellidoCliente,
  correoCliente,
  telefonoCliente,
  notasCLiente
) => {
  try {
    const { data } = await http.post(`api/citas/guardarCita`, {
      idServicio,
      duracionServicio,
      idProveedor,
      fechaInicio,
      hora,
      nombreCliente,
      apellidoCliente,
      correoCliente,
      telefonoCliente,
      notasCLiente,
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
