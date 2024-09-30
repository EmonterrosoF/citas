import {
  SP_ACTUALIZAR_USUARIO,
  SP_ELIMINAR_USUARIO,
  SP_GUARDAR_USUARIO,
  SP_HORARIO_LABORAL,
  SP_OBTENER_CITAS,
  SP_OBTENER_CLIENTES,
  SP_OBTENER_PROVEEDORES,
  SP_OBTENER_PROVEEDORES_POR_SERVICIO,
  SP_OBTENER_USUARIO,
  SP_OBTENER_USUARIOS,
} from "../utils/sp.js";
import { ejecutarSP } from "../data/dbConexion.js";

import { diaMap } from "../utils/diasDeLaSemana.js";

export const getProveedoresPorServicio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const proveedores = await ejecutarSP(SP_OBTENER_PROVEEDORES_POR_SERVICIO, [
      id,
    ]);
    res.json({
      resultado: proveedores,
      ocurrioError: false,
      mensaje: "exito",
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error al obtener los proveedores, por favor intenta nuevamente o mas tarde"
    );
    next(error);
  }
};

export const getProveedores = async (req, res, next) => {
  try {
    const proveedores = await ejecutarSP(SP_OBTENER_PROVEEDORES);
    res.json({
      resultado: proveedores,
      ocurrioError: false,
      mensaje: "exito",
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error al obtener los proveedores, por favor intenta nuevamente o mas tarde"
    );
    next(error);
  }
};

export const getCitas = async (req, res, next) => {
  try {
    const citas = await ejecutarSP(SP_OBTENER_CITAS);
    res.json({
      resultado: citas,
      ocurrioError: false,
      mensaje: "exito",
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error al obtener las citas, por favor intenta nuevamente o mas tarde"
    );
    next(error);
  }
};

export const getHorarioLaboral = async (req, res, next) => {
  try {
    const horariolaboral = await ejecutarSP(SP_HORARIO_LABORAL);
    // Función para convertir el string de "09:00" a un objeto Date en un día específico
    const convertirHora = (hora) => {
      const fecha = new Date();
      const [hours, minutes] = hora?.split(":")?.map(Number);

      fecha.setHours(hours, minutes, 0, 0); // Establece las horas localmente
      return fecha;
    };

    const horario = JSON.parse(horariolaboral[0].valor);

    // formatear el horario
    const horariosPorDia = Object.keys(horario).reduce((acc, dia, index) => {
      const dataDia = horario[dia];

      if (dataDia) {
        const descanso = dataDia?.descanso?.map((d) => {
          const minHora = convertirHora(d.inicio);
          const maxHora = convertirHora(d.fin);
          const inicioDescanso = minHora.getHours() * 60 + minHora.getMinutes();
          const finDescanso = maxHora.getHours() * 60 + maxHora.getMinutes();
          return [inicioDescanso, finDescanso];
        });

        const minHora = convertirHora(dataDia.inicio);
        const maxHora = convertirHora(dataDia.fin);

        acc[diaMap[dia]] = {
          min: minHora.getHours() * 60 + minHora.getMinutes(),
          max: maxHora.getHours() * 60 + maxHora.getMinutes(),
          descanso,
        };
      } else {
        acc[diaMap[dia]] = null; // Si no hay horario, lo deja como null
      }

      return acc;
    }, {});

    res.json({
      resultado: horariosPorDia,
      ocurrioError: false,
      mensaje: "exito",
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error al obtener el horario laboral, por favor intenta nuevamente o mas tarde"
    );
    next(error);
  }
};

export const getClientes = async (req, res, next) => {
  try {
    const clientes = await ejecutarSP(SP_OBTENER_CLIENTES);
    res.json({
      resultado: clientes,
      ocurrioError: false,
      mensaje: "exito",
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error al obtener clientes, por favor intenta nuevamente o mas tarde"
    );
    next(error);
  }
};

export const getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await ejecutarSP(SP_OBTENER_USUARIOS);
    res.json({
      resultado: usuarios,
      ocurrioError: false,
      mensaje: "exito",
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error al obtener usuarios, por favor intenta nuevamente o mas tarde"
    );
    next(error);
  }
};

export const guardarUsuario = async (req, res, next) => {
  try {
    const {
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      username,
      privado,
      servicios,
    } = req.body;

    const serviciosSeleccionados = JSON.stringify(servicios);

    const resultado = await ejecutarSP(SP_GUARDAR_USUARIO, [
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      username,
      privado,
      serviciosSeleccionados,
    ]);

    if (resultado && resultado[0]?.existeUsername) {
      return res.json({
        resultado: null,
        ocurrioError: true,
        mensaje: `El nombre de usuario ya existe`,
      });
    }

    if (resultado && resultado[0]?.existeEmail) {
      return res.json({
        resultado: null,
        ocurrioError: true,
        mensaje: `El correo electronico del usuario ya existe`,
      });
    }

    res.json({
      resultado: null,
      ocurrioError: false,
      mensaje: `Usuario creado exitosamente`,
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error, por favor intenta mas tarde"
    );
    next(error);
  }
};

export const actualizarUsuario = async (req, res, next) => {
  try {
    const {
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
    } = req.body;

    const serviciosSeleccionados = JSON.stringify(servicios);

    const password = actualizarPassword ? "123456" : null;

    const resultado = await ejecutarSP(SP_ACTUALIZAR_USUARIO, [
      idUsuario,
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      username,
      privado,
      serviciosSeleccionados,
      password,
    ]);

    if (resultado && resultado[0]?.existeUsername) {
      return res.json({
        resultado: null,
        ocurrioError: true,
        mensaje: `El nombre de usuario ya existe`,
      });
    }

    if (resultado && resultado[0]?.existeEmail) {
      return res.json({
        resultado: null,
        ocurrioError: true,
        mensaje: `El correo electronico del usuario ya existe`,
      });
    }

    res.json({
      resultado: null,
      ocurrioError: false,
      mensaje: `Usuario actualizado exitosamente`,
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error, por favor intenta mas tarde"
    );
    next(error);
  }
};

export const eliminarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    await ejecutarSP(SP_ELIMINAR_USUARIO, [id]);

    res.json({
      resultado: null,
      ocurrioError: false,
      mensaje: `Usuario eliminado exitosamente`,
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error, por favor intenta mas tarde"
    );
    next(error);
  }
};

export const getUsuario = async (req, res, next) => {
  const { id } = req.params;
  try {
    const usuario = await ejecutarSP(SP_OBTENER_USUARIO, [id]);
    res.json({
      resultado: usuario[0],
      ocurrioError: false,
      mensaje: "exito",
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error al obtener usuarios, por favor intenta nuevamente o mas tarde"
    );
    next(error);
  }
};

export const actualizarPerfil = async (req, res, next) => {
  try {
    const {
      idUsuario,
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      username,
      password,
    } = req.body;

    const resultado = await ejecutarSP(SP_ACTUALIZAR_USUARIO, [
      idUsuario,
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      username,
      false,
      "[]",
      password,
    ]);

    if (resultado && resultado[0]?.existeUsername) {
      return res.json({
        resultado: null,
        ocurrioError: true,
        mensaje: `El nombre de usuario ya existe`,
      });
    }

    if (resultado && resultado[0]?.existeEmail) {
      return res.json({
        resultado: null,
        ocurrioError: true,
        mensaje: `El correo electronico del usuario ya existe`,
      });
    }

    res.json({
      resultado: null,
      ocurrioError: false,
      mensaje: `Perfil actualizado exitosamente`,
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error, por favor intenta mas tarde"
    );
    next(error);
  }
};
