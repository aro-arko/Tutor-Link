import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { SubjectRoutes } from '../modules/Subject/subject.route';
import { BookingRoutes } from '../modules/Booking/booking.route';
import { TutorRoutes } from '../modules/Tutor/tutor.route';
import { StudentRoutes } from '../modules/Student/student.route';
import { userRoutes } from '../modules/User/user.route';
import { ReviewsRoutes } from '../modules/Reviews/reviews.route';
import { CartRoutes } from '../modules/Cart/cart.route';
import { TipsRoute } from '../modules/Tips/tips.route';

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
  {
    path: '/student',
    route: StudentRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/reviews',
    route: ReviewsRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
  {
    path: '/tips',
    route: TipsRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
