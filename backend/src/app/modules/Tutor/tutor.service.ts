import { JwtPayload } from 'jsonwebtoken';
import Tutor from './tutor.model';

const getMe = async (user: JwtPayload) => {
  const tutor = await Tutor.findOne({ email: user.email });

  return tutor;
};

export const tutorService = {
  getMe,
};
