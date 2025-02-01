import mongoose, { Schema } from 'mongoose';
import { TAdjustment } from './adjustment.interface';

const adjustmentSchema: Schema = new Schema<TAdjustment>(
  {
    date: { type: Date, required: true },
    referenceNo: { type: String, required: true },
    attachDocument: { type: String, required: false },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, required: true },
        productName: { type: String, required: true },
        productCode: { type: String, required: true },
        type: {
          type: String,
          enum: ['Subtraction', 'Addition'],
          required: true,
        },
        quantity: { type: mongoose.Schema.Types.Mixed, },
        serialNumber: { type: String, required: false },
      },
    ],
    note: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Adjustment = mongoose.model<TAdjustment>(
  'Adjustment',
  adjustmentSchema,
);
