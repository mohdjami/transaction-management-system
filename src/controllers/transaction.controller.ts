import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';

export class TransactionController {
  private transactionService = new TransactionService();

  async getUserTransactions(req: Request, res: Response) {
    try {
      const filters = {
        status: req.query.status as any,
        type: req.query.type as any,
        fromDate: req.query.fromDate ? new Date(req.query.fromDate as string) : undefined,
        toDate: req.query.toDate ? new Date(req.query.toDate as string) : undefined
      };

      const pagination = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10
      };

      const transactions = await this.transactionService.getUserTransactions(
        req.params.userId,
        filters,
        pagination
      );

      return res.json(transactions);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return res.status(500).json({ message: errorMessage });
    }
  }

  async getAllTransactionsWithUserDetails(req: Request, res: Response) {
    try {
      const filters = {
        status: req.query.status as any,
        type: req.query.type as any,
        fromDate: req.query.fromDate ? new Date(req.query.fromDate as string) : undefined,
        toDate: req.query.toDate ? new Date(req.query.toDate as string) : undefined
      };

      const pagination = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10
      };

      const transactions = await this.transactionService.getAllTransactionsWithUserDetails(
        filters,
        pagination
      );

      return res.json(transactions);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return res.status(500).json({ message: errorMessage });
    }
  }
}