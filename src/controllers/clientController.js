import { connectToDatabase } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerClient(req, res) {
  const { name, email, password } = req.body;

  try {
    const db = await connectToDatabase(); // Usa a conexão compartilhada

    // Verifica se o email já está em uso
    const existingUser = await db.collection("clients").findOne({ email });
    if (existingUser) {
      return res.status(409).send("Email already in use");
    }

    // Insere o novo cliente no banco de dados
    await db.collection("clients").insertOne({ name, email, password });

    return res.status(201).send("User registered successfully");
  } catch (error) {
    return res.status(500).send("Error registering user");
  }
}

export async function loginClient(req, res) {
  const { email, password } = req.body;

  try {
    const db = await connectToDatabase();

    // Verifica se o usuário existe
    const user = await db.collection("clients").findOne({ email });
    if (!user) {
      return res.status(404).send("Email not found.");
    }

    // Verifica se a senha está correta
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send("Invalid email or password");
    }

    // Gera o token JWT
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).send(token);
  } catch (error) {
    return res.status(500).send("Error logging in");
  }
}
