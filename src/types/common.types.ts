export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface TransactionFilters {
  status?: "success" | "pending" | "failed";
  type?: "debit" | "credit";
  fromDate?: Date;
  toDate?: Date;
}
