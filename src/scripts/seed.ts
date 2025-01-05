// scripts/seed.ts
import mongoose from 'mongoose';
import { User } from '../models/user.model';
import { Transaction } from '../models/transaction.model';
import * as dotenv from 'dotenv'
dotenv.config()

async function seed() {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI!);

  // Clear existing data
  await User.deleteMany({});
  await Transaction.deleteMany({});

  // Create 10 users
  const users = await User.insertMany(
    Array.from({ length: 10 }, (_, i) => ({
      name: `User ${i + 1}`,
      phoneNumber: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`
    }))
  );

  // Create 5 transactions per user
  const transactions = [];
  for (const user of users) {
    for (let i = 0; i < 5; i++) {
      transactions.push({
        userId: user._id,
        status: ['success', 'pending', 'failed'][Math.floor(Math.random() * 3)],
        type: ['debit', 'credit'][Math.floor(Math.random() * 2)],
        amount: Math.floor(Math.random() * 10000),
        transactionDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
      });
    }
  }

  await Transaction.insertMany(transactions);
  console.log('Sample data inserted successfully');
  process.exit(0);
}

seed().catch(console.error);