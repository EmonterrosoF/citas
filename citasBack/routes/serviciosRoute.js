import { Router } from "express";
import {
  actualizarServicio,
  eliminarServicio,
  getServicios,
  getServiciosCliente,
  getServiciosPorUsuario,
  guardarServicio,
} from "../controllers/serviciosController.js";

const serviciosRoute = Router();

serviciosRoute.get("/obtenerServiciosCliente", getServiciosCliente);
serviciosRoute.get("/", getServicios);
serviciosRoute.get("/obtenerServiciosPorUsuario/:id", getServiciosPorUsuario);

serviciosRoute.post("/guardarServicio", guardarServicio);
serviciosRoute.put("/actualizarServicio", actualizarServicio);
serviciosRoute.delete("/eliminarServicio/:id", eliminarServicio);

export default serviciosRoute;
