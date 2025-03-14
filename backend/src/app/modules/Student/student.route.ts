import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { studentController } from './student.controller';

const router = express.Router();

// search for tutors by query
router.get('/search', studentController.searchTutors);

router.get('/me', auth(USER_ROLE.student), studentController.getMe);
router.patch('/update', auth(USER_ROLE.student), studentController.updateMe);

// giving review to a tutor
// router.post(
//   '/review/:tutorId',
//   auth(USER_ROLE.student),
//   studentController.reviewTutor,
// );

// update review
// router.patch(
//   '/review/:reviewId',
//   auth(USER_ROLE.student),
//   studentController.updateReview,
// );

router.get(
  '/:email',
  auth(USER_ROLE.student),
  studentController.getStudentByEmail,
);

export const StudentRoutes = router;
