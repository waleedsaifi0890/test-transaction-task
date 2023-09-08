import { Router, Request, Response } from "express";
import TransactionModel from "../models/transaction";

const router = Router();

class TransactionController {
  create = async (req: Request, res: Response) => {
    try {
      const { amount, description } = req.body;

      // Validate input data
      if (!amount || !description) {
        return res
          .status(400)
          .json({ error: "Amount and description are required" });
      }

      const newTransaction = new TransactionModel({ amount, description });
      const savedTransaction = await newTransaction.save();
      res.status(201).json(savedTransaction);
    } catch (error) {
      console.error("Error creating transaction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  all = async (req: Request, res: Response) => {
    try {
      const transactions = await TransactionModel.find();
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const transaction = await TransactionModel.findById(id);
      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.json(transaction);
    } catch (error) {
      console.error("Error fetching transaction by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { isSuspicious, isAllowed, comment } = req.body;

      // Validate input data
      if (
        typeof isSuspicious !== "boolean" ||
        typeof isAllowed !== "boolean" ||
        typeof comment !== "string"
      ) {
        return res.status(400).json({ error: "Invalid input data" });
      }

      const updatedTransaction = await TransactionModel.findByIdAndUpdate(
        id,
        { isSuspicious, isAllowed, comment },
        { new: true }
      );

      if (!updatedTransaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      res.json(updatedTransaction);
    } catch (error) {
      console.error("Error updating transaction by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedTransaction = await TransactionModel.findByIdAndDelete(id);
      if (!deletedTransaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
      console.error("Error deleting transaction by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  setFlag = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // Find the transaction by ID
      const transaction = await TransactionModel.findById(id);

      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      // Set the 'isSuspicious' field to true
      transaction.isSuspicious = true;

      // Save the updated transaction
      const updatedTransaction = await transaction.save();

      res.json(updatedTransaction);
    } catch (error) {
      console.error("Error flagging transaction as suspicious:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  allowTransaction = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // Find the transaction by ID
      const transaction = await TransactionModel.findById(id);

      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      // Set the 'isAllowed' field to true
      transaction.isAllowed = true;

      // Save the updated transaction
      const updatedTransaction = await transaction.save();

      res.json(updatedTransaction);
    } catch (error) {
      console.error("Error allowing transaction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  addComment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { comment } = req.body;

      // Find the transaction by ID
      const transaction = await TransactionModel.findById(id);

      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      // Set the 'comment' field
      transaction.comment = comment;

      // Save the updated transaction
      const updatedTransaction = await transaction.save();

      res.json(updatedTransaction);
    } catch (error) {
      console.error("Error adding comment to transaction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

const Transaction = new TransactionController();

export default Transaction;
