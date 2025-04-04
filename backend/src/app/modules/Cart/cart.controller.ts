import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { cartService } from './cart.service';

const getCart = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await cartService.getCart(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart fetched successfully',
    data: result,
  });
});

const addToCart = catchAsync(async (req, res) => {
  const user = req.user;
  const { tutorId } = req.body;
  const result = await cartService.addToCart(user, tutorId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Added to cart successfully',
    data: result,
  });
});

const removeFromCart = catchAsync(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const result = await cartService.removeFromCart(user, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Removed from cart successfully',
    data: result,
  });
});

export const cartController = {
  getCart,
  addToCart,
  removeFromCart,
};
