import { JwtPayload } from 'jsonwebtoken';
import User from '../User/user.model';
import Student from './student.model';

const getMe = async (user: JwtPayload) => {
  const userData = await User.findOne({ email: user.email });
  const studentInfo = await Student.findOne({ user: userData!._id });
  return studentInfo;
};

export const studentService = {
  getMe,
};
