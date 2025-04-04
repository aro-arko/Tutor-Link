import { JwtPayload } from 'jsonwebtoken';
import { Cart } from './cart.model';

const getCart = async (userData: JwtPayload) => {
  const result = await Cart.find({ studentEmail: userData.email })
    .populate('tutorId')
    .exec();
  return result;
};

const addToCart = async (userData: JwtPayload, tutorId: string) => {
  const cartData = {
    tutorId,
    studentEmail: userData.email,
  };

  const existingCart = await Cart.findOne(cartData).exec();
  if (existingCart) {
    throw new Error('Already in cart');
  }

  const result = await Cart.create(cartData);
  return result;
};

const removeFromCart = async (userData: JwtPayload, id: string) => {
  const result = await Cart.deleteOne({
    studentEmail: userData.email,
    _id: id,
  }).exec();

  if (result.deletedCount === 0) {
    throw new Error('Cart item not found');
  }
  return result;
};

export const cartService = {
  getCart,
  addToCart,
  removeFromCart,
};
