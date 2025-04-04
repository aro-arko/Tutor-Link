import express from 'express';
import { cartController } from './cart.controller';
import validateRequest from '../../middlewares/validateRequest';
import { cartValidation } from './cart.validation';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth(USER_ROLE.student), cartController.getCart);
router.post(
  '/',
  auth(USER_ROLE.student),
  validateRequest(cartValidation.addToCartValidation),
  cartController.addToCart,
);
router.delete('/:id', auth(USER_ROLE.student), cartController.removeFromCart);

export const CartRoutes = router;
