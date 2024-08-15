import { MongoClient } from "mongodb";

let db;

export async function connectToDatabase() {
  if (db) return db; // Retorna a conexão existente

  try {
    const client = await MongoClient.connect(process.env.DATABASE_URL);
    db = client.db(); // Conecta ao banco de dados padrão da connection string
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1); // Encerra o processo em caso de falha na conexão
  }
}
