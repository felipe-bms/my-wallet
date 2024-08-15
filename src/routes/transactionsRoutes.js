import express from "express";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import transactionSchema from "../schemas/transactionSchema.js";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getBalance,
} from "../controllers/transactionsController.js";

const transactionsRoutes = express.Router();

transactionsRoutes.use(authenticateToken);

transactionsRoutes.post(
  "/transactions",
  validateSchema(transactionSchema),
  createTransaction
);
transactionsRoutes.get("/transactions", getTransactions);
transactionsRoutes.put(
  "/transactions/:id",
  validateSchema(transactionSchema),
  updateTransaction
);
transactionsRoutes.delete("/transactions/:id", deleteTransaction);
transactionsRoutes.get("/balance", getBalance);

export default transactionsRoutes;
