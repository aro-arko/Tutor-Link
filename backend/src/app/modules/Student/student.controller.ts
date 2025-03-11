import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { studentService } from './student.service';
import httpStatus from 'http-status';

const getMe = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await studentService.getMe(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data retrieved successfully',
    data: result,
  });
});

export const studentController = {
  getMe,
};
