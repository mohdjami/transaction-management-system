import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { UserService } from '../../src/services/user.service.js';
import { User } from '../../src/models/user.model.js';

describe('UserService', () => {
    let userService;
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        userService = new UserService();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getUserById', () => {
        it('should return user when valid ID is provided', async () => {
            const userId = new mongoose.Types.ObjectId();
            const mockUser = {
                _id: userId,
                name: 'Test User',
                phoneNumber: '+1234567890'
            };

            sandbox.stub(User, 'findById').resolves(mockUser);

            const result = await userService.getUserById(userId.toString());

            expect(result).to.deep.equal(mockUser);
        });

        it('should return null for non-existent user', async () => {
            const userId = new mongoose.Types.ObjectId();
            sandbox.stub(User, 'findById').resolves(null);

            const result = await userService.getUserById(userId.toString());

            expect(result).to.be.null;
        });

        it('should throw error for invalid ID format', async () => {
            const invalidId = 'invalid-id';

            try {
                await userService.getUserById(invalidId);
                expect.fail('Should have thrown an error');
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.message).to.include('Invalid user ID');
            }
        });
    });
});