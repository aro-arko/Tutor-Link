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
router.get('/me', (0, auth_1.default)(user_constant_1.USER_ROLE.student), student_controller_1.studentController.getMe);
router.patch('/update', (0, auth_1.default)(user_constant_1.USER_ROLE.student), student_controller_1.studentController.updateMe);
// giving review to a tutor
router.post('/review/:tutorId', (0, auth_1.default)(user_constant_1.USER_ROLE.student), student_controller_1.studentController.reviewTutor);
// update review
router.patch('/review/:reviewId', (0, auth_1.default)(user_constant_1.USER_ROLE.student), student_controller_1.studentController.updateReview);
// search for tutors by query
router.get('/search', student_controller_1.studentController.searchTutors);
exports.StudentRoutes = router;
