import TransactionModel from "../models/transaction";
import { CreateTransaction, UpdateTransaction } from "../types/transaction";

const createTransaction = async (data: CreateTransaction) => {
  const transaction = new TransactionModel(data);
  await transaction.save();
  return transaction;
};

const allTransactions = async () => {
  return await TransactionModel.find();
};

const getOneTransaction = async (id: string) => {
  return await TransactionModel.findById(id);
};

const updateTransaction = async (id: string, query: UpdateTransaction) => {
  return await TransactionModel.findByIdAndUpdate(id, query, { new: true });
};

export {
  createTransaction,
  allTransactions,
  getOneTransaction,
  updateTransaction,
};
