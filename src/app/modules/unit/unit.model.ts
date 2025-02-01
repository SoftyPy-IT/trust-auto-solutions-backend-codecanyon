import mongoose, { Schema } from 'mongoose';
import { TUnit } from './unit.interface';

const unitSchema: Schema = new Schema<TUnit>(
  {
    unit: {
      type: String,
      required: [true, 'Unit is required'],
    },
    short_name: {
      type: String,
      required: [true, 'Short name is required'],
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const Unit = mongoose.model<TUnit>('Unit', unitSchema);
