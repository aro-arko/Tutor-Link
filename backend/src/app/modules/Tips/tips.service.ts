import { JwtPayload } from 'jsonwebtoken';
import Tips from './tips.model';
import Tutor from '../Tutor/tutor.model';

const getTips = async () => {
  const result = await Tips.find()
    .sort({ date: -1 })
    .limit(1)
    .populate('tutorId');
  return result;
};
const tutorTipsOfTheDay = async (
  user: JwtPayload,
  payload: { tip: string },
) => {
  const tutor = await Tutor.findOne({ email: user.email });

  if (!tutor) {
    throw new Error('Tutor not found');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await Tips.findOne({ date: today });

  if (existing) {
    throw new Error(
      'A tip has already been posted today. Please try again tomorrow.',
    );
  }

  const newTip = await Tips.create({
    tutorId: tutor._id,
    tip: payload.tip,
    date: today,
  });

  return newTip;
};

export const TipsService = {
  getTips,
  tutorTipsOfTheDay,
};
