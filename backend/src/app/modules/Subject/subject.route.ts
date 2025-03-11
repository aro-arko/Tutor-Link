import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { subjectValidation } from './subject.validation';
import { subjectController } from './subject.controller';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLE.admin, USER_ROLE.tutor),
  validateRequest(subjectValidation.subjectCreateValidationSchema),
  subjectController.createSubject,
);

router.get('/', subjectController.getSubjects);

router.get('/:id', subjectController.getSubjectById);

export const SubjectRoutes = router;
