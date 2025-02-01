import { z } from 'zod';

const createProduct = z.object({
  body: z.object({
    product_name: z.string({ required_error: "Product name is requried" }),
    product_type: z.array(z.string()).optional(),
    suppliers: z.array(z.string()).optional(),
    category: z.array(z.string()).optional(),
    product_code: z.string().optional(),
    shipping: z.union([z.number(), z.string()]).optional(),
    brand: z.array(z.string()).optional(),
    unit: z.array(z.string()).optional(),
    product_price:z.union([z.number(), z.string()]),
    expense: z.union([z.number(), z.string()]).optional(),
    unit_price: z.union([z.number(), z.string()]),
    product_tax: z.union([z.number(), z.string()]),
    discount:z.union([z.number(), z.string()]),
    stock_alert: z.union([z.number(), z.string()]),
  }),
});

const updateProduct = z.object({
  body: z.object({
    product_name: z.string().optional(),
    product_type: z.array(z.string()).optional(),
    suppliers: z.array(z.string()).optional(),
    category: z.array(z.string()).optional(),
    shipping: z.number().optional(),
    product_code: z.string().optional(),
    brand: z.array(z.string()).optional(),
   
    unit: z.array(z.string()).optional(),
    product_price: z.number().optional(),
    expense: z.number().optional(),
    unit_price: z.number().optional(),
    product_tax: z.union([z.number(), z.string()]),
    discount: z.number().optional(),
    stock_alert: z.number().optional(),
  }),
});

export const ProductValidations = {
  createProduct,
  updateProduct,
};
