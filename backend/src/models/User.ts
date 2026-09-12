import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  phone: string;
  role: 'Farmer' | 'Buyer' | 'FPO';
  fullName: string;
  language: string;
  avatar?: string;
  location?: {
    village?: string;
    district?: string;
    state?: string;
  };
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  phone: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Farmer', 'Buyer', 'FPO'], required: true },
  fullName: { type: String, required: true },
  language: { type: String, default: 'hi' },
  avatar: { type: String },
  location: {
    village: { type: String },
    district: { type: String },
    state: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>('User', UserSchema);
