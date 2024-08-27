import { Router } from "express";

import {
  getCitasReservadasProveedor,
  getdiasNoLaborales,
  getHorarioDisponiblePorFecha,
  guardarCita,
} from "../controllers/citasController.js";

const citasRoute = Router();

citasRoute.get("/proveedor/:id", getCitasReservadasProveedor);
citasRoute.get("/diasNoLaborales", getdiasNoLaborales);
citasRoute.get("/horarioDisponible", getHorarioDisponiblePorFecha);
citasRoute.post("/guardarCita", guardarCita);

export default citasRoute;
