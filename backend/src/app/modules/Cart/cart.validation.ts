import { z } from 'zod';

const addToCartValidation = z.object({
  body: z.object({
    tutorId: z.string().nonempty('Tutor ID is required'),
  }),
});

export const cartValidation = {
  addToCartValidation,
};
