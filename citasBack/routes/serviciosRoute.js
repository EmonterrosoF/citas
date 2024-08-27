import { Router } from "express";
import { getServicios } from "../controllers/serviciosController.js";

const serviciosRoute = Router();

serviciosRoute.get("/", getServicios);

export default serviciosRoute;
