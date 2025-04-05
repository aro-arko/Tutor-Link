import express from 'express';
import { TipsController } from './tips.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { tipsValidation } from './tips.validation';

const router = express.Router();

router.get('/', TipsController.getTips);

router.post(
  '/',
  auth(USER_ROLE.tutor),
  validateRequest(tipsValidation.createTipsValidation),
  TipsController.tutorTipsOfTheDay,
);

export const TipsRoute = router;
