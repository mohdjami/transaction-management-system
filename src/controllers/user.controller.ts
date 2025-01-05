import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import l from '../utils/logger';

export class UserController {
  private userService = new UserService();

  async getUserById(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return res.status(500).json({ message: errorMessage });
    }
  }
  async getAllUsers(req:Request, res:Response) {
    try {
        const users = await this.userService.getAllUsers();
        l.info(users)
        if(!users){
            return res.status(404).json({
                message : "We do not have any users!"
            })
        }
        
        return res.json(users)
    } catch (error) {
        
    }
  }
}