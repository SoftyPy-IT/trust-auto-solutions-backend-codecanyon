import { ObjectId } from 'mongoose';

export type TAdjustment = {
  date: Date;
  referenceNo: string;
  attachDocument?: string;
  products: {
    productId: ObjectId;
    productName: string;
    productCode: string;
    type: 'Subtraction' | 'Addition';
    quantity: number | string ;
    serialNumber?: string;
  }[];
  note: string;
  
};
