import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { SubjectRoutes } from '../modules/Subject/subject.route';
import { BookingRoutes } from '../modules/Booking/booking.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
