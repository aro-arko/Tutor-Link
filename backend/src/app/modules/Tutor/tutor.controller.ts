import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { tutorService } from './tutor.service';
import httpStatus from 'http-status';

const getMe = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await tutorService.getMe(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor fetched successfully',
    data: result,
  });
});

const updateTutor = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await tutorService.updateTutor(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor updated successfully',
    data: result,
  });
});

export const tutorController = {
  getMe,
  updateTutor,
};
