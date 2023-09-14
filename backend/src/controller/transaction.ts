import { Router, Request, Response } from "express";
import { allTransactions, updateTransaction, getById } from "../service/index";
import { ServiceResp, Transaction } from "../types/transaction";

class TransactionController {
  all = async (req: Request, res: Response) => {
    try {
      const transactions: Transaction[] = await allTransactions();

      // const suspeciosTrans = transactions.filter((tran) => tran.isSuspicious);

      if (!transactions.length)
        return res.status(404).send({ message: "No recorrd found", data: [] });

      res.json({ message: "data found", data: transactions });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const transaction: Transaction | undefined = await getById(id);
      if (!transaction)
        return res.status(404).send({ message: "No recorrd found", data: {} });

      res.json({ message: "data found", data: transaction });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  setFlag = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { isSuspicious } = req.body;

      const isExist = getById(id);

      if (!isExist)
        return res.status(404).send({
          message: "No data found",
        });

      const transaction: ServiceResp = await updateTransaction(id, {
        isSuspicious,
      });

      if (!transaction.status)
        res
          .status(500)
          .json({ message: transaction.message, data: transaction.data });

      res.json(transaction);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  allowTransaction = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { isAllowed } = req.body;

      const isExist = getById(id);

      if (!isExist)
        return res.status(404).send({
          message: "No data found",
        });

      const transaction: ServiceResp = await updateTransaction(id, {
        isAllowed,
      });

      if (!transaction.status)
        res
          .status(500)
          .json({ message: transaction.message, data: transaction.data });

      res.json(transaction);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  addComment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { comment } = req.body;

      const isExist = getById(id);

      if (!isExist)
        return res.status(404).send({
          message: "No data found",
        });

      const transaction: ServiceResp = await updateTransaction(id, { comment });

      if (!transaction.status)
        res
          .status(500)
          .json({ message: transaction.message, data: transaction.data });

      res.json(transaction);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

const Transaction = new TransactionController();

export default Transaction;
