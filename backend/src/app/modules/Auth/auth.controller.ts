import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const createStudent = catchAsync(async (req, res) => {
  const userData = { ...req.body };
  const result = await authServices.createStudentIntoDB(userData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Student registered successfully',
    data: result,
  });
});
const createTutor = catchAsync(async (req, res) => {
  const userData = { ...req.body };
  const result = await authServices.createTutorIntoDB(userData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Student registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const userData = { ...req.body };
  const result = await authServices.loginUser(userData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

export const authController = {
  createStudent,
  createTutor,
  loginUser,
};
