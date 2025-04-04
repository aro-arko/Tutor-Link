import { ITutor } from "./user";

export type TCart = {
  _id: string;
  tutorId: ITutor;
  studentEmail: string;
};
