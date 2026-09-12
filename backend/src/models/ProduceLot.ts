import mongoose, { Schema, Document } from 'mongoose';

export interface IProduceLot extends Document {
  farmerId: mongoose.Types.ObjectId;
  farmerName: string;
  crop: string;
  quantity: number;
  unit: string;
  harvestDate: Date;
  grade: string;
  qualityBonus?: number;
  aiConfidence?: number;
  location: string;
  distanceKm?: number;
  organic: boolean;
  qualityNotes?: string;
  images: string[];
  status: 'ACTIVE' | 'SOLD' | 'DRAFT' | 'EXPIRED';
  createdAt: Date;
}

const ProduceLotSchema: Schema = new Schema({
  farmerId: { type: Schema.Types.ObjectId, ref: 'User' },
  farmerName: { type: String, required: true },
  crop: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  harvestDate: { type: Date, default: Date.now },
  grade: { type: String, default: 'A' },
  qualityBonus: { type: Number, default: 0 },
  aiConfidence: { type: Number, default: 90 },
  location: { type: String, default: 'Local Mandi' },
  distanceKm: { type: Number, default: 10 },
  organic: { type: Boolean, default: false },
  qualityNotes: { type: String },
  images: [{ type: String }],
  status: { type: String, enum: ['ACTIVE', 'SOLD', 'DRAFT', 'EXPIRED'], default: 'ACTIVE' },
  createdAt: { type: Date, default: Date.now },
});

export const ProduceLot = mongoose.model<IProduceLot>('ProduceLot', ProduceLotSchema);
