import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { subjectService } from './subject.service';
import httpStatus from 'http-status';

const createSubject = catchAsync(async (req, res) => {
  const subjectData = req.body;
  const subject = await subjectService.createSubject(subjectData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Subject created successfully',
    data: subject,
  });
});

const getSubjects = catchAsync(async (req, res) => {
  const subjects = await subjectService.getSubjects();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: subjects,
  });
});

export const subjectController = {
  createSubject,
  getSubjects,
};
