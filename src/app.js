import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import transactionsRoutes from "./routes/transactionsRoutes.js";
import { connectToDatabase } from "./config/db.js"; // Importa a função de conexão ao banco de dados

// Carrega as variáveis de ambiente
dotenv.config();

// Configurações do Express
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Estabelece a conexão com o banco de dados
connectToDatabase()
  .then(() => {
    // Inicia o servidor apenas após a conexão com o banco de dados
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1); // Encerra o processo se a conexão falhar
  });

app.use("/", authRoutes);
app.use("/", transactionsRoutes);
