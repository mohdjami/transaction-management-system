import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phoneNumber: string;
}


const userSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true }
}, {
  timestamps: true,
  versionKey: false
});

export const User = model<IUser>('User', userSchema);

