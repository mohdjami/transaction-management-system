import { Types, PipelineStage } from 'mongoose';
import { Transaction } from '../models/transaction.model';
import { TransactionFilters, PaginationParams } from '../types/common.types';

export class TransactionService {
  async getUserTransactions(
    userId: string,
    filters: TransactionFilters,
    pagination: PaginationParams
  ) {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const matchStage: any = { userId: new Types.ObjectId(userId) };
    
    if (filters.status) matchStage.status = filters.status;
    if (filters.type) matchStage.type = filters.type;
    if (filters.fromDate || filters.toDate) {
      matchStage.transactionDate = {};
      if (filters.fromDate) matchStage.transactionDate.$gte = filters.fromDate;
      if (filters.toDate) matchStage.transactionDate.$lte = filters.toDate;
    }

    const pipeline: PipelineStage[] = [
      { $match: matchStage },
      { $sort: { transactionDate: -1 as const } },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: skip }, { $limit: limit }]
        }
      }
    ];

    const result = await Transaction.aggregate(pipeline);
    return {
      data: result[0].data,
      total: result[0].metadata[0]?.total || 0,
      page,
      limit
    };
  }

  async getAllTransactionsWithUserDetails(
    filters: TransactionFilters,
    pagination: PaginationParams
  ) {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const matchStage: any = {};
    
    if (filters.status) matchStage.status = filters.status;
    if (filters.type) matchStage.type = filters.type;
    if (filters.fromDate || filters.toDate) {
      matchStage.transactionDate = {};
      if (filters.fromDate) matchStage.transactionDate.$gte = filters.fromDate;
      if (filters.toDate) matchStage.transactionDate.$lte = filters.toDate;
    }

    const pipeline: PipelineStage[] = [
      { $match: matchStage },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' as const },
      { $sort: { transactionDate: -1 as const } },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                _id: 1,
                status: 1,
                type: 1,
                transactionDate: 1,
                amount: 1,
                user: {
                  _id: 1,
                  name: 1,
                  phoneNumber: 1
                }
              }
            }
          ]
        }
      }
    ];

    const result = await Transaction.aggregate(pipeline);
    return {
      data: result[0].data,
      total: result[0].metadata[0]?.total || 0,
      page,
      limit
    };
  }
}