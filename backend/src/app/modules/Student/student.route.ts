import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { studentController } from './student.controller';

const router = express.Router();

router.get('/me', auth(USER_ROLE.student), studentController.getMe);
router.patch('/update', auth(USER_ROLE.student));

export const StudentRoutes = router;
