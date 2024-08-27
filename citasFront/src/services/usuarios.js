import http from "./http";

export const obtenerProveedoresPorServicio = async (idServicio) => {
  try {
    const { data } = await http.get(
      `api/usuarios/proveedores/servicio/${idServicio}`
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
