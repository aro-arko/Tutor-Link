/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';
import { ZodError } from 'zod';

const handleValidationError = (
  err: mongoose.Error.ValidationError | ZodError,
): TGenericErrorResponse => {
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation error',
  };
};

export default handleValidationError;
