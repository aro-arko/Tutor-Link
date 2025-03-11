import { z } from 'zod';

const bookingCreateValidationSchema = z.object({
  body: z.object({
    tutorId: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'Invalid tutor ID (must be a valid ObjectId)',
    }),
    subject: z
      .string()
      .min(3, 'Subject must be at least 3 characters long')
      .max(100, 'Subject must not exceed 100 characters'),
    sessionDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
    duration: z
      .number()
      .min(1, 'Duration must be at least 1 hour')
      .max(24, 'Duration must not exceed 24 hours'),
    status: z
      .enum(['pending', 'confirmed', 'completed', 'canceled'])
      .default('pending'),
    paymentStatus: z.enum(['unpaid', 'paid']).default('unpaid'),
    price: z
      .number()
      .min(0, 'Price must be a positive number')
      .max(10000, 'Price must not exceed 10000'),
  }),
});

export const bookingValidation = {
  bookingCreateValidationSchema,
};
