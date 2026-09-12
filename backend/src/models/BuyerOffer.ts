import mongoose, { Schema, Document } from 'mongoose';

export interface IBuyerOffer extends Document {
  lotId?: mongoose.Types.ObjectId;
  buyerId?: mongoose.Types.ObjectId;
  buyerName: string;
  buyerAvatar?: string;
  verified: boolean;
  crop: string;
  quantity: number;
  unit: string;
  offeredPricePerKg: number;
  totalAmount: number;
  advanceAmount: number;
  balanceAmount: number;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  escrowStatus: 'IN_NEGOTIATION' | 'AWAITING_BUYER_DEPOSIT' | 'ADVANCE_PAID' | 'DISBURSED';
  escrowStage?: string;
  paymentGatewayTxn?: string;
  paymentMethod?: string;
  advancePaidAt?: Date;
  finalPaidAt?: Date;
  biltyNumber?: string;
  negotiatedBy?: string;
  note?: string;
  createdAt: Date;
}

const BuyerOfferSchema: Schema = new Schema({
  lotId: { type: Schema.Types.ObjectId, ref: 'ProduceLot' },
  buyerId: { type: Schema.Types.ObjectId, ref: 'User' },
  buyerName: { type: String, required: true },
  buyerAvatar: { type: String },
  verified: { type: Boolean, default: true },
  crop: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  offeredPricePerKg: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  advanceAmount: { type: Number, required: true },
  balanceAmount: { type: Number, required: true },
  status: { type: String, enum: ['PENDING', 'ACCEPTED', 'DECLINED'], default: 'PENDING' },
  escrowStatus: { 
    type: String, 
    enum: ['IN_NEGOTIATION', 'AWAITING_BUYER_DEPOSIT', 'ADVANCE_PAID', 'DISBURSED'], 
    default: 'IN_NEGOTIATION' 
  },
  escrowStage: { type: String },
  paymentGatewayTxn: { type: String },
  paymentMethod: { type: String },
  advancePaidAt: { type: Date },
  finalPaidAt: { type: Date },
  biltyNumber: { type: String },
  negotiatedBy: { type: String },
  note: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const BuyerOffer = mongoose.model<IBuyerOffer>('BuyerOffer', BuyerOfferSchema);
