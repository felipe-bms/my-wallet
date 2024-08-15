import express from "express";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { hashPassword } from "../middlewares/hashPassword.js";
import {
  registerClient,
  loginClient,
} from "../controllers/clientController.js";
import clientSchema from "../schemas/clientSchema.js";

const authRoutes = express.Router();

authRoutes.post(
  "/sign-up",
  validateSchema(clientSchema),
  hashPassword,
  registerClient
);
authRoutes.post("/sign-in", loginClient);

export default authRoutes;
