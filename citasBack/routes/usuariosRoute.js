import { Router } from "express";
import { getProveedoresPorServicio } from "../controllers/usuariosController.js";

const usuariosRoute = Router();

usuariosRoute.get("/proveedores/servicio/:id", getProveedoresPorServicio);

export default usuariosRoute;
