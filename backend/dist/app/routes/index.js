"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const subject_route_1 = require("../modules/Subject/subject.route");
const booking_route_1 = require("../modules/Booking/booking.route");
const tutor_route_1 = require("../modules/Tutor/tutor.route");
const student_route_1 = require("../modules/Student/student.route");
const user_route_1 = require("../modules/User/user.route");
const reviews_route_1 = require("../modules/Reviews/reviews.route");
const cart_route_1 = require("../modules/Cart/cart.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/subject',
        route: subject_route_1.SubjectRoutes,
    },
    {
        path: '/booking',
        route: booking_route_1.BookingRoutes,
    },
    {
        path: '/tutor',
        route: tutor_route_1.TutorRoutes,
    },
    {
        path: '/student',
        route: student_route_1.StudentRoutes,
    },
    {
        path: '/user',
        route: user_route_1.userRoutes,
    },
    {
        path: '/reviews',
        route: reviews_route_1.ReviewsRoutes,
    },
    {
        path: '/cart',
        route: cart_route_1.CartRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
