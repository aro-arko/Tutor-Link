import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { subjectService } from './subject.service';
import httpStatus from 'http-status';

const createSubject = catchAsync(async (req, res) => {
  const user = req.user;
  console.log(user);
  const subjectData = req.body;
  const subject = await subjectService.createSubject(subjectData, user);

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

const getSubjectById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const subject = await subjectService.getSubjectById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: subject,
  });
});

const updateSubject = catchAsync(async (req, res) => {
  const user = req.user;
  // console.log(user);
  const subjectData = req.body;
  const { id } = req.params;
  const updatedSubject = await subjectService.updateSubject(
    user,
    id,
    subjectData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subject updated successfully',
    data: updatedSubject,
  });
});

export const subjectController = {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
};
