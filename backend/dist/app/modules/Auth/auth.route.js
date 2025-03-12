"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
// create a student
router.post('/register/student', (0, validateRequest_1.default)(auth_validation_1.authValidation.registerValidation), auth_controller_1.authController.createStudent);
router.post('/register/tutor', (0, validateRequest_1.default)(auth_validation_1.authValidation.registerValidation), auth_controller_1.authController.createTutor);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.authValidation.loginValidation), auth_controller_1.authController.loginUser);
exports.AuthRoutes = router;
