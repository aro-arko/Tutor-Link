import { model, Schema } from 'mongoose';
import { TTips } from './tips.interface';

const TipsSchema = new Schema<TTips>({
  tutorId: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true,
  },
  tip: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const Tips = model<TTips>('Tips', TipsSchema);
export default Tips;
