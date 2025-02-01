import { ObjectId } from "mongoose";

export interface TPurchase {
  date: string;
  referenceNo: string;
  warehouse: string;
  attachDocument:string,
  suppliers: ObjectId;
  shipping: string;
  purchasStatus: 'Incomplete' | 'Complete' | 'Draft';
  note:string;
  paymentMethod:string;
  products: {
    productId: ObjectId;
    productName: string;
    productUnit: string;
    discount:number | string ;
    productPrice:number | string ;
    tax:number | string;
    quantity: number | string ;
    serialNumber?: string;
  }[]
}

