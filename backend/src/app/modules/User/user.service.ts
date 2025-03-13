import { JwtPayload } from 'jsonwebtoken';
import User from './user.model';

const getUser = async (user: JwtPayload) => {
  const userInfo = await User.findOne({ email: user.email });
  return userInfo;
};

export const userService = {
  getUser,
};
