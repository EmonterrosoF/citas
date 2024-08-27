import { SP_OBTENER_SERVICIOS } from "../utils/sp.js";
import { ejecutarSP } from "../data/dbConexion.js";

export const getServicios = async (req, res, next) => {
  try {
    const servicios = await ejecutarSP(SP_OBTENER_SERVICIOS);

    res.json({
      resultado: servicios,
      ocurrioError: false,
      mensaje: "exito",
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error al obtener los servicios, por favor intenta nuevamente o mas tarde"
    );
    next(error);
  }
};
