import { Types } from "mongoose";
import { User, IUser } from "../models/user.model";

export class UserService {
  async getUserById(id: string): Promise<IUser | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID");
    }
    return User.findById(id);
  }
  async getAllUsers(): Promise<IUser[]> {
    return User.find();
  }
}
