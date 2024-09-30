import { Router } from "express";
import {
  getHorarioLaboral,
  guardarHorarioLaboral,
} from "../controllers/configuracionesController.js";

const configRoute = Router();

configRoute.get("/horarioLaboral", getHorarioLaboral);

configRoute.put("/guardarHorarioLaboral", guardarHorarioLaboral);

export default configRoute;
