import { z } from 'zod';

// Product Schema Validation
const productSchema = z.object({
  productId: z.string({ required_error: 'Product ID is required' }),
  productName: z.string({ required_error: 'Product name is required' }),
  productUnit: z.string({ required_error: 'Product unit is required' }),
  discount: z.union([z.number(), z.string()]),
  productPrice: z.union([z.number(), z.string()]),
  tax: z.union([z.number(), z.string()]),
  quantity: z.union([z.number(), z.string()]),
  serialNumber: z.string().optional(),
});

// Create Purchase Validation Schema
const createPurchase = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is required' }),
    referenceNo: z.string({ required_error: 'Reference number is required' }),
    warehouse: z.string({ required_error: 'Warehouse is required' }),
    attachDocument: z.string().optional(),
    suppliers: z.string({ required_error: 'Supplier ID is required' }),
    shipping: z.string({ required_error: 'Shipping method is required' }),
    paymentMethod: z.string({ required_error: 'Payment method is required' }),
    purchasStatus: z
      .enum(['Incomplete', 'Complete', 'Draft'], {
        required_error: 'Purchase status is required',
      })
      .default('Incomplete'),
    products: z
      .array(productSchema)
      .nonempty({ message: 'At least one product is required' }),
  }),
});

// Update Purchase Validation Schema
const updatePurchase = z.object({
  body: z.object({
    date: z.string().optional(),
    referance_no: z.string().optional(),
    warehouse: z.string().optional(),
    attachDocument: z.string().optional(),
    supplier: z.string().optional(),
    shipping: z.string().optional(),
    paymentMethod: z.string().optional(),
    purchasStatus: z.enum(['Incomplete', 'Complete', 'Draft']).optional(),
    products: z.array(productSchema).optional(),
  }),
});

export const PurchaseValidations = {
  createPurchase,
  updatePurchase,
};
