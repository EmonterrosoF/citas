import { Router } from "express";
import {
  getProveedoresPorServicio,
  getProveedores,
  getCitas,
  getHorarioLaboral,
  getClientes,
  getUsuarios,
  guardarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  getUsuario,
  actualizarPerfil,
} from "../controllers/usuariosController.js";

const usuariosRoute = Router();

usuariosRoute.get("/proveedores/servicio/:id", getProveedoresPorServicio);
usuariosRoute.get("/proveedores", getProveedores);
usuariosRoute.get("/citas", getCitas);
usuariosRoute.get("/horarioLaboral", getHorarioLaboral);
usuariosRoute.get("/clientes", getClientes);
usuariosRoute.get("/usuarios", getUsuarios);
usuariosRoute.post("/guardarUsuario", guardarUsuario);
usuariosRoute.put("/actualizarUsuario", actualizarUsuario);
usuariosRoute.delete("/eliminarUsuario/:id", eliminarUsuario);
usuariosRoute.get("/usuario/:id", getUsuario);
usuariosRoute.put("/actualizarPerfil", actualizarPerfil);

export default usuariosRoute;
