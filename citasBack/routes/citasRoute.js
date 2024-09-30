import { Router } from "express";

import {
  cancelarCita,
  getCitasReservadasProveedor,
  getdiasNoLaborales,
  getHorarioDisponiblePorFecha,
  guardarCita,
} from "../controllers/citasController.js";

const citasRoute = Router();

citasRoute.get("/proveedor/:id", getCitasReservadasProveedor);
citasRoute.get("/diasNoLaborales", getdiasNoLaborales);
citasRoute.get("/horarioDisponible", getHorarioDisponiblePorFecha);
citasRoute.post("/guardarCitaCliente", guardarCita);
citasRoute.post("/guardarCita", guardarCita);
citasRoute.delete("/cancelarCita", cancelarCita);

export default citasRoute;
