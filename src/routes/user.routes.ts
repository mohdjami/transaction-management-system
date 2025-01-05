import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.get('/:id', async (req, res) => {
    await userController.getUserById(req, res)
});
router.get('/', async (req , res) => {
    await userController.getAllUsers(req, res)
})
export default router;

