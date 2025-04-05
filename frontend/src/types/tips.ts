export type TTips = {
  _id: string;
  tip: string;
  tutorId: {
    _id: string;
    name: string;
    tutorImage: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
