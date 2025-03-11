import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { tutorController } from './tutor.controller';

const router = express.Router();

router.get('/me', auth(USER_ROLE.tutor), tutorController.getMe);
router.patch('/update', auth(USER_ROLE.tutor), tutorController.updateTutor);

export const TutorRoutes = router;
