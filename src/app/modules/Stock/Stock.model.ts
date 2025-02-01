import { Schema, model } from 'mongoose';
import { IStock, IStockModel } from './Stock.interface';

const StockSchema = new Schema<IStock, IStockModel>(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reference: { type: String, required: true },
    type: { type: String, enum: ['Partial', 'Full'], required: true },
    brands: [{ type: Schema.Types.ObjectId, ref: 'Brand' }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    initialStockCSV: {
      url: { type: String, required: false },
      publicId: { type: String, required: false },
    },
    finalStockCSV: {
      url: { type: String, required: false },
      publicId: { type: String, required: false },
    },
    isFinalCalculation: { type: Boolean, required: true, default: false },
    counts: [
      {
        no: {
          type: Number,
          required: false,
          default: 0,
        },
        description: { type: String, required: false, default: '' },
        expected: { type: Number, required: false, default: 0 },
        counted: { type: Number, required: false, default: 0 },
        difference: { type: Number, required: false, default: 0 },
        cost: { type: Number, required: false, default: 0 },
      },
    ],
    note: { type: String },
  },
  {
    timestamps: true,
  },
);

const Stock = model<IStock, IStockModel>('Stock', StockSchema);
export default Stock;
