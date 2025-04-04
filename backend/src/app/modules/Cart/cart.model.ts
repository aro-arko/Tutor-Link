import { model, Schema } from 'mongoose';
import { TCart } from './cart.interface';

const cartSchema = new Schema<TCart>(
  {
    tutorId: { type: Schema.Types.ObjectId, ref: 'Tutor', required: true },
    studentEmail: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Cart = model<TCart>('Cart', cartSchema);
