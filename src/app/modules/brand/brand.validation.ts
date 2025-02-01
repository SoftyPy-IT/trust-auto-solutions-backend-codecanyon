import { z } from 'zod';

const createbrandValidationSchema = z.object({
  body: z.object({
    brand: z
      .string({
        required_error: 'Brand is required',
      }),
    image: z
      .string({
        required_error: 'Image URL is required',
      })
      .url('Image must be a valid URL'),
  }),
});
const updatebrandValidationSchema = z.object({
  body: z.object({
    brand: z
      .string().optional(),
    image: z
      .string().optional()
  }),
});

export const BrandValidations = {
    createbrandValidationSchema,
    updatebrandValidationSchema
};
