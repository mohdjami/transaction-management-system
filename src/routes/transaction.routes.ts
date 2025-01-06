import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";

const router = Router();
const transactionController = new TransactionController();

router.get("/user/:userId", async (req, res) => {
  await transactionController.getUserTransactions(req, res);
});

router.get("/", async (req, res) => {
  await transactionController.getAllTransactionsWithUserDetails(req, res);
});

export default router;
