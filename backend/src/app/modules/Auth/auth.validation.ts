import { z } from 'zod';

const registerValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
      })
      .min(1, 'Name cannot be empty'),

    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email('Email must be a valid string'),

    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long'),
  }),
});

const loginValidation = z.object({
  body: z.object({
    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email('Email must be a valid string'),

    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long'),
  }),
});

const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z
      .string({
        invalid_type_error: 'Old password must be a string',
      })
      .min(8, 'Old password must be at least 8 characters')
      .max(100, 'Old password is too long'),

    newPassword: z
      .string({
        invalid_type_error: 'New password must be a string',
      })
      .min(8, 'New password must be at least 8 characters')
      .max(100, 'New password is too long'),
  }),
});

export const authValidation = {
  registerValidation,
  loginValidation,
  changePasswordValidation,
};
