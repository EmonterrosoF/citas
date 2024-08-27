import {
  SP_OBTENER_PROVEEDORES_POR_SERVICIO,
  SP_CITAS_RESERVADAS,
} from "../utils/sp.js";
import { ejecutarSP } from "../data/dbConexion.js";

export const getProveedoresPorServicio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await ejecutarSP(SP_OBTENER_PROVEEDORES_POR_SERVICIO, [
      id,
    ]);
    if (!resultado) {
      const error = new Error("Error interno  del servidor");
      return next(error);
    }
    res.json(resultado);
  } catch (err) {
    console.log(err);
    const error = new Error("Error interno del servidor");
    next(error);
  }
};

export const getCitasReservadasProveedor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await ejecutarSP(SP_CITAS_RESERVADAS, [id]);
    res.json(resultado);
  } catch (err) {
    console.log(err);
    const error = new Error("Error interno del servidor");
    next(error);
  }
};
