"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
// student
// create booking
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.student), (0, validateRequest_1.default)(booking_validation_1.bookingValidation.bookingCreateValidationSchema), booking_controller_1.bookingController.createBooking);
// student bookings
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.student), booking_controller_1.bookingController.studentBookingList);
router.put('/cancel/:bookingId', (0, auth_1.default)(user_constant_1.USER_ROLE.student), booking_controller_1.bookingController.cancelBooking);
// tutor
// tutor's booking list
router.get('/bookings', (0, auth_1.default)(user_constant_1.USER_ROLE.tutor), booking_controller_1.bookingController.tutorBookingList);
// tutor approve or decline booking
router.put('/:bookingId', (0, auth_1.default)(user_constant_1.USER_ROLE.tutor), booking_controller_1.bookingController.updateBookingStatus);
router.get('/verify', (0, auth_1.default)(user_constant_1.USER_ROLE.student), booking_controller_1.bookingController.verifyPayment);
router.get('/earnings', (0, auth_1.default)(user_constant_1.USER_ROLE.tutor), booking_controller_1.bookingController.tutorEarnings);
exports.BookingRoutes = router;
