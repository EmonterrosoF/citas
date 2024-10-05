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

export const obtenerProveedores = async () => {
  try {
    const { data } = await http.get(`api/usuarios/proveedores`);

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

export const obtenerCitas = async () => {
  try {
    const { data } = await http.get(`api/usuarios/citas`);

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

export const obtenerHorarioLaboral = async () => {
  try {
    const { data } = await http.get(`api/usuarios/horarioLaboral`);

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

export const obtenerClientes = async () => {
  try {
    const { data } = await http.get(`api/usuarios/clientes`);

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

export const obtenerUsuarios = async () => {
  try {
    const { data } = await http.get(`api/usuarios/usuarios`);

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

export const guardarUsuario = async (
  nombre,
  apellido,
  email,
  telefono,
  direccion,
  username,
  privado,
  servicios
) => {
  try {
    const { data } = await http.post(`api/usuarios/guardarUsuario`, {
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      username,
      privado,
      servicios,
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

export const actualizarUsuario = async (
  idUsuario,
  nombre,
  apellido,
  email,
  telefono,
  direccion,
  username,
  privado,
  servicios,
  actualizarPassword
) => {
  try {
    const { data } = await http.put(`api/usuarios/actualizarUsuario`, {
      idUsuario,
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      username,
      privado,
      servicios,
      actualizarPassword,
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

export const eliminarUsuario = async (idUsuario) => {
  try {
    const { data } = await http.delete(
      `api/usuarios/eliminarUsuario/` + idUsuario
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

export const obtenerUsuario = async () => {
  try {
    const { data } = await http.get(`api/usuarios/usuario/`);

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

export const actualizarPerfil = async (
  idUsuario,
  nombre,
  apellido,
  email,
  telefono,
  direccion,
  username,
  password
) => {
  try {
    const { data } = await http.put(`api/usuarios/actualizarPerfil`, {
      idUsuario,
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      username,
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

export const recuperarUsuario = async (correo, usuario) => {
  try {
    const { data } = await http.post(`api/auth/recuperarUsuario`, {
      correo,
      usuario,
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
