import { Types } from 'mongoose';

export interface TQuotation {
  quotation_no: string;
  user_type: 'customer' | 'company' | 'showRoom';
  Id: string;

  job_no: string;
  date: string;
  customer: Types.ObjectId;
  company: Types.ObjectId;
  showRoom: Types.ObjectId;
  vehicle: Types.ObjectId;

  input_data: [
    {
      description: string;
      quantity: number;
      rate: number;
      unit: string;
      total: number;
    },
  ];
  service_input_data: [
    {
      description: string;
      quantity: number;
      rate: number;
      unit: string;
      total: number;
    },
  ];
  total_amount: number;
  parts_total: number;
  parts_total_In_words: string;
  service_total: number;
  service_total_in_words: string;
  discount: number;
  vat: number;
  net_total: number;
  logo: string;
  net_total_in_words: string;
  status: 'running' | 'completed';
  isCompleted: boolean;
  isRecycled: boolean;
  recycledAt: Date;
}
