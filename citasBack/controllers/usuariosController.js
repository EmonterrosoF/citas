import { SP_OBTENER_PROVEEDORES_POR_SERVICIO } from "../utils/sp.js";
import { ejecutarSP } from "../data/dbConexion.js";

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
