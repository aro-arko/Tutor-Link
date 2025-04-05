import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TipsService } from './tips.service';
import httpStatus from 'http-status';

const getTips = catchAsync(async (req, res) => {
  const result = await TipsService.getTips();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tips retrieved successfully',
    data: result,
  });
});

const tutorTipsOfTheDay = catchAsync(async (req, res) => {
  const { user, body } = req;

  const result = await TipsService.tutorTipsOfTheDay(user, body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tip posted successfully',
    data: result,
  });
});

export const TipsController = {
  getTips,
  tutorTipsOfTheDay,
};
