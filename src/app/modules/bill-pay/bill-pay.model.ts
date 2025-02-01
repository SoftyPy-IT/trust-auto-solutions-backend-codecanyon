import mongoose, { Schema } from 'mongoose';
import { TBillPay } from './bill-pay.interface';

const billPaySchema: Schema<TBillPay> = new Schema<TBillPay>(
  {
    supplier: {
      type: Schema.ObjectId,
      ref: 'Supplier',
      required: [true, 'Supplier is required'],
    },
    supplierId: {
      type: String,
      required: [true, 'Supplier ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    mobile_number: {
      type: String,

    },
    address: {
      type: String,
 
    },
    email: {
      type: String,
    },
    shop_name: {
      type: String,

    },
    against_bill: {
      type: String,
      required: [true, 'Against bill is required'],
    },
    category: {
      type: String,
  
    },
    amount: {
      type: Number,
   
    },
    payment_against_bill: {
      type: String,

    },
    paid_on: {
      type: String,
 
    },
    individual_markup: {
      type: String,

    },
    payment_method: {
      type: String,

    },

    transaction_no: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    expense_note: {
      type: String,
    },
    selected_bank: {
      type: String,
    },

    bank_account_no: {
      type: String,
    },

    card_number: {
      type: String,
    },
    check_no: {
      type: String,
    },

    card_holder_name: {
      type: String,
    },
    card_transaction_no: {
      type: String,
    },
    card_type: {
      type: String,
    },
    month_first: {
      type: String,
    },
    year: {
      type: String,
    },
    month_second: {
      type: String,
    },
    security_code: {
      type: String,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const BillPay = mongoose.model<TBillPay>('BillPay', billPaySchema);
