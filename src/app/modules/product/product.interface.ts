import { ObjectId } from 'mongoose';

export type TProduct = {
  product_name: string;
  product_type: ObjectId;
  image: string[];
  category: ObjectId;
  product_code: string;
  brand: ObjectId;
  barcode: [string];
  unit: ObjectId;
  product_price: number;
  expense: number;
  unit_price: number;
  product_tax: number;
  tax_method: string;
  discount: number;
  stock_alert: number;
  product_quantity: number;
  suppliers:ObjectId;
  productCost:number;
  isDeleted:boolean;
  shipping:number;
};

