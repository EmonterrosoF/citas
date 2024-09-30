import http from "./http";

export const obtenerHorarioLaboral = async () => {
  try {
    const { data } = await http.get(`api/config/horarioLaboral`);

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

export const guardarHorarioLaboral = async (horarioLaboral) => {
  try {
    const { data } = await http.put(`api/config/guardarHorarioLaboral`, {
      horarioLaboral,
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
