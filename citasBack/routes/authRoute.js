import { Router } from "express";
import {
  autenticar,
  logout,
  preAutenticar,
  refreshToken,
} from "../controllers/authController.js";

const authRoute = Router();

authRoute.post("/preAutenticar", preAutenticar);
authRoute.post("/autenticar", autenticar);
authRoute.get("/logout", logout);
authRoute.get("/refreshToken", refreshToken);

export default authRoute;
