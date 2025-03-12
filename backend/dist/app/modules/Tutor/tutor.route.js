"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const tutor_controller_1 = require("./tutor.controller");
const router = express_1.default.Router();
router.get('/me', (0, auth_1.default)(user_constant_1.USER_ROLE.tutor), tutor_controller_1.tutorController.getMe);
router.patch('/update', (0, auth_1.default)(user_constant_1.USER_ROLE.tutor), tutor_controller_1.tutorController.updateTutor);
exports.TutorRoutes = router;
