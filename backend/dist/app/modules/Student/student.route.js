"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const student_controller_1 = require("./student.controller");
const router = express_1.default.Router();
// search for tutors by query
router.get('/search', student_controller_1.studentController.searchTutors);
router.get('/me', (0, auth_1.default)(user_constant_1.USER_ROLE.student), student_controller_1.studentController.getMe);
router.patch('/update', (0, auth_1.default)(user_constant_1.USER_ROLE.student), student_controller_1.studentController.updateMe);
router.get('/', student_controller_1.studentController.getAllStudents);
router.get('/:email', (0, auth_1.default)(user_constant_1.USER_ROLE.student), student_controller_1.studentController.getStudentByEmail);
router.get('/booking/:bookingId', (0, auth_1.default)(user_constant_1.USER_ROLE.student), student_controller_1.studentController.getBookingById);
exports.StudentRoutes = router;
