import { z } from 'zod';

const createUnitValidationSchema = z.object({
  body: z.object({
    unit: z
      .string({
        required_error: 'Unit is required',
      }),
    image: z
      .string({
        required_error: 'Image URL is required',
      })
      .url('Image must be a valid URL'),
  }),
});
const updateUnitValidationSchema = z.object({
  body: z.object({
    brand: z
      .string().optional(),
    image: z
      .string().optional()
  }),
});

export const UnitValidations = {
    createUnitValidationSchema,
    updateUnitValidationSchema
};
