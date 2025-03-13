import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';
import httpStatus from 'http-status';

const getUser = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await userService.getUser(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User data retrieved successfully',
    data: result,
  });
});

export const userController = {
  getUser,
};
