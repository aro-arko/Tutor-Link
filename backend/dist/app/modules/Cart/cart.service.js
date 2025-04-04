"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = void 0;
const cart_model_1 = require("./cart.model");
const getCart = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.find({ studentEmail: userData.email })
        .populate('tutorId')
        .exec();
    return result;
});
const addToCart = (userData, tutorId) => __awaiter(void 0, void 0, void 0, function* () {
    const cartData = {
        tutorId,
        studentEmail: userData.email,
    };
    const existingCart = yield cart_model_1.Cart.findOne(cartData).exec();
    if (existingCart) {
        throw new Error('Already in cart');
    }
    const result = yield cart_model_1.Cart.create(cartData);
    return result;
});
const removeFromCart = (userData, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.deleteOne({
        studentEmail: userData.email,
        _id: id,
    }).exec();
    if (result.deletedCount === 0) {
        throw new Error('Cart item not found');
    }
    return result;
});
exports.cartService = {
    getCart,
    addToCart,
    removeFromCart,
};
