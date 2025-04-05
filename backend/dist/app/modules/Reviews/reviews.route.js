"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const reviews_controller_1 = require("./reviews.controller");
const router = express_1.default.Router();
// giving review to a tutor
router.post('/review/:tutorId', (0, auth_1.default)(user_constant_1.USER_ROLE.student), reviews_controller_1.reviewController.reviewTutor);
// update review
router.patch('/review/:reviewId', (0, auth_1.default)(user_constant_1.USER_ROLE.student), reviews_controller_1.reviewController.updateReview);
// get total reviews
router.get('/total-review', reviews_controller_1.reviewController.totalReviews);
exports.ReviewsRoutes = router;
