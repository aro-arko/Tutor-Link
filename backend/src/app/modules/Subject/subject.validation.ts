import { z } from 'zod';

const subjectCreateValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .max(100, 'Name must not exceed 100 characters'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters long')
      .max(500, 'Description must not exceed 500 characters'),
    gradeLevel: z.string().optional(),
    category: z.string().optional(),
  }),
});

const updateSubjectValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .max(100, 'Name must not exceed 100 characters')
      .optional(),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters long')
      .max(500, 'Description must not exceed 500 characters')
      .optional(),
    gradeLevel: z.string().optional(),
    category: z.string().optional(),
  }),
});

export const subjectValidation = {
  subjectCreateValidationSchema,
  updateSubjectValidationSchema,
};
