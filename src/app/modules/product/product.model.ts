/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Types, model } from 'mongoose';
import { TProduct } from './product.interface';

const ProductSchema = new Schema<TProduct>(
  {
    product_name: {
      type: String,
    },
    product_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductType',
      required: true,
    },
    image: {
      type: [String],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    suppliers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    product_code: {
      type: String,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
    },
    barcode: {
      type: [String],
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Unit',
    },
    product_price: {
      type: Number,
    },
    expense: {
      type: Number,
    },
    unit_price: {
      type: Number,
    },
    product_tax: {
      type: Number,
    },
    shipping: {
      type: Number,
    },
    tax_method: {
      type: String,
    },
    discount: {
      type: Number,
    },
    stock_alert: {
      type: Number,
    },
    product_quantity: {
      type: Number,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>('Product', ProductSchema);
