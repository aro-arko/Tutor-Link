"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipsRoute = void 0;
const express_1 = __importDefault(require("express"));
const tips_controller_1 = require("./tips.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const tips_validation_1 = require("./tips.validation");
const router = express_1.default.Router();
router.get('/', tips_controller_1.TipsController.getTips);
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.tutor), (0, validateRequest_1.default)(tips_validation_1.tipsValidation.createTipsValidation), tips_controller_1.TipsController.tutorTipsOfTheDay);
exports.TipsRoute = router;
