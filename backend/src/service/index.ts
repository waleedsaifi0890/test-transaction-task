import {
  ServiceResp,
  Transaction,
  UpdateTransaction,
} from "../types/transaction";
import textDB from "../dataStore/index.json";
import fs from "fs";
import path from "path";

const DBPATH = path.join(__dirname, "../dataStore/index.json");

const allTransactions = async (): Promise<Transaction[]> => {
  const sortedTransaction = textDB.sort((a, b) => {
    const dateA: number = new Date(a.createdAt).getTime();
    const dateB: number = new Date(b.createdAt).getTime();

    return dateB - dateA;
  });
  return sortedTransaction;
};

const getById = async (id: string): Promise<Transaction | undefined> => {
  return textDB.find((trans) => trans.id == id);
};

const updateTransaction = async (
  id: string,
  query: UpdateTransaction
): Promise<ServiceResp> => {
  return new Promise((resolve, reject) => {
    const attribute = Object.keys(query)[0];
    const value = Object.values(query)[0];

    fs.readFile(DBPATH, "utf-8", (err, data) => {
      if (err) {
        reject({
          status: false,
          message: "Some issue while reading the data",
          data: {},
        });
      }
      const tranData = JSON.parse(data);

      const targetIndex = tranData.findIndex(
        (transaction: Transaction) => transaction.id == id
      );

      tranData[targetIndex][attribute] = value;

      const strigifydata = JSON.stringify(tranData);

      fs.writeFile(DBPATH, strigifydata, "utf8", (writeErr) => {
        if (writeErr) {
          reject({
            status: false,
            message: "Some issue while writing the data",
            data: {},
          });
        } else {
          resolve({
            status: true,
            message: "Record updated",
            data: tranData[targetIndex],
          });
        }
      });
    });
  });
};

export { allTransactions, updateTransaction, getById };
