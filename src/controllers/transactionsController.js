import { ObjectId } from "mongodb";
import { connectToDatabase } from "../config/db.js";

export async function createTransaction(req, res) {
  const { value, description, type } = req.body;
  const clientId = req.user._id;

  try {
    const db = await connectToDatabase();

    const newTransaction = {
      clientId,
      value,
      description,
      type,
      date: new Date(),
    };

    await db.collection("transactions").insertOne(newTransaction);

    return res.status(201).send("Transaction created successfully");
  } catch (error) {
    return res.status(500).send("Error creating transaction");
  }
}

export async function getTransactions(req, res) {
  const clientId = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  if (page <= 0) {
    return res.status(400).send("Page number must be a positive integer.");
  }

  try {
    const db = await connectToDatabase();

    const transactions = await db
      .collection("transactions")
      .find({ clientId })
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalTransactions = await db
      .collection("transactions")
      .countDocuments({ clientId });

    const totalPages = Math.ceil(totalTransactions / limit);

    return res.status(200).json({
      transactions,
      page,
      totalPages,
      totalTransactions,
    });
  } catch (error) {
    return res.status(500).send("Error retrieving transactions");
  }
}

export async function updateTransaction(req, res) {
  const { value, description, type } = req.body;
  const transactionId = req.params.id;
  const clientId = req.user._id;

  try {
    const db = await connectToDatabase();

    const transaction = await db
      .collection("transactions")
      .findOne({ _id: new ObjectId(transactionId), clientId });

    if (!transaction) {
      return res.status(401).send("Unauthorized update.");
    }

    await db
      .collection("transactions")
      .updateOne(
        { _id: new ObjectId(transactionId) },
        { $set: { value, description, type, date: new Date() } }
      );

    return res.status(204).send("Transaction updated successfully");
  } catch (error) {
    return res.status(500).send("Error updating transaction");
  }
}

export async function deleteTransaction(req, res) {
  const transactionId = req.params.id;
  const clientId = req.user._id;

  try {
    const db = await connectToDatabase();

    const transaction = await db
      .collection("transactions")
      .findOne({ _id: new ObjectId(transactionId), clientId });

    if (!transaction) {
      return res.status(401).send("Unauthorized.");
    }

    await db
      .collection("transactions")
      .deleteOne({ _id: new ObjectId(transactionId) });

    return res.status(204).send("Transaction deleted successfully");
  } catch (error) {
    return res.status(500).send("Error deleting transaction");
  }
}

export async function getBalance(req, res) {
  const clientId = req.user._id;

  try {
    const db = await connectToDatabase();

    const transactions = await db
      .collection("transactions")
      .find({ clientId })
      .toArray();

    const balance = transactions.reduce((acc, transaction) => {
      if (transaction.type === "deposit") {
        return acc + transaction.value;
      } else if (transaction.type === "withdraw") {
        return acc - transaction.value;
      }
      return acc;
    }, 0);

    const formattedBalance = parseFloat(balance.toFixed(2));

    return res.status(200).json({ balance: formattedBalance });
  } catch (error) {
    return res.status(500).send("Error retrieving balance");
  }
}
