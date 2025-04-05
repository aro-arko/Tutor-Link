import { z } from 'zod';

const createTipsValidation = z.object({
  body: z.object({
    tip: z
      .string({
        required_error: 'Tips is required',
      })
      .min(40, 'Tips must be at least 40 characters long')
      .max(250, 'Tips must not exceed 250 characters'),
  }),
});

export const tipsValidation = {
  createTipsValidation,
};
