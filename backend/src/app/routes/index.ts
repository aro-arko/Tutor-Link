import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { SubjectRoutes } from '../modules/Subject/subject.route';
import { BookingRoutes } from '../modules/Booking/booking.route';
import { TutorRoutes } from '../modules/Tutor/tutor.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/subject',
    route: SubjectRoutes,
  },
  {
    path: '/booking',
    route: BookingRoutes,
  },
  {
    path: '/tutor',
    route: TutorRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
