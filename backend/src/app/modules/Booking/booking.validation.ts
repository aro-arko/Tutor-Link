import { z } from 'zod';

const bookingCreateValidationSchema = z.object({
  body: z.object({
    tutorId: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'Invalid tutor ID (must be a valid ObjectId)',
    }),
    subject: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'Invalid subject ID (must be a valid ObjectId)',
    }),
    timeSlotId: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'Invalid time slot ID (must be a valid ObjectId)',
    }),
    sessionStartDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format for session start date',
    }),
    sessionEndDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format for session end date',
    }),
  }),
});

export const bookingValidation = {
  bookingCreateValidationSchema,
};
