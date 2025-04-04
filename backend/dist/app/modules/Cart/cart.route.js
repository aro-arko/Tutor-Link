"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cart_validation_1 = require("./cart.validation");
const user_constant_1 = require("../User/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.student), cart_controller_1.cartController.getCart);
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.student), (0, validateRequest_1.default)(cart_validation_1.cartValidation.addToCartValidation), cart_controller_1.cartController.addToCart);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.student), cart_controller_1.cartController.removeFromCart);
exports.CartRoutes = router;
