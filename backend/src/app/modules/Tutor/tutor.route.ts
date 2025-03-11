import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { tutorController } from './tutor.controller';

const router = express.Router();

router.get('/me', auth(USER_ROLE.tutor), tutorController.getMe);

export const TutorRoutes = router;
