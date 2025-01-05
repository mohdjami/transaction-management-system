import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { TransactionService } from '../../src/services/transaction.service.js';
import { Transaction } from '../../src/models/transaction.model.js';

describe('TransactionService', () => {
    let transactionService;
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        transactionService = new TransactionService();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getUserTransactions', () => {
        it('should return user transactions with pagination', async () => {
            const userId = new mongoose.Types.ObjectId().toString();
            const mockTransactions = [{
                _id: new mongoose.Types.ObjectId(),
                status: 'success',
                type: 'credit',
                amount: 100,
                transactionDate: new Date(),
                userId: new mongoose.Types.ObjectId(userId)
            }];

            // Mock aggregate function
            const aggregateStub = sandbox.stub(Transaction, 'aggregate').resolves([{
                metadata: [{ total: 1 }],
                data: mockTransactions
            }]);

            const filters = {
                status: 'success',
                type: 'credit',
                fromDate: new Date('2024-01-01'),
                toDate: new Date('2024-12-31')
            };

            const pagination = {
                page: 1,
                limit: 10
            };

            const result = await transactionService.getUserTransactions(
                userId,
                filters,
                pagination
            );

            expect(result).to.have.property('data').that.is.an('array');
            expect(result.total).to.equal(1);
            expect(result.page).to.equal(1);
            expect(result.limit).to.equal(10);
            
            // Verify aggregate was called correctly
            expect(aggregateStub.calledOnce).to.be.true;
        });

        it('should handle empty results', async () => {
            sandbox.stub(Transaction, 'aggregate').resolves([{
                metadata: [],
                data: []
            }]);

            const result = await transactionService.getUserTransactions(
                new mongoose.Types.ObjectId().toString(),
                {},
                { page: 1, limit: 10 }
            );

            expect(result.data).to.be.an('array').that.is.empty;
            expect(result.total).to.equal(0);
        });
    });

    describe('getAllTransactionsWithUserDetails', () => {
        it('should return transactions with user details', async () => {
            const mockTransactions = [{
                _id: new mongoose.Types.ObjectId(),
                status: 'success',
                type: 'credit',
                amount: 100,
                transactionDate: new Date(),
                user: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Test User',
                    phoneNumber: '+1234567890'
                }
            }];

            sandbox.stub(Transaction, 'aggregate').resolves([{
                metadata: [{ total: 1 }],
                data: mockTransactions
            }]);

            const result = await transactionService.getAllTransactionsWithUserDetails(
                { status: 'success' },
                { page: 1, limit: 10 }
            );

            expect(result.data).to.be.an('array');
            expect(result.data[0]).to.have.property('user');
            expect(result.total).to.equal(1);
        });
    });
});