"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartValidation = void 0;
const zod_1 = require("zod");
const addToCartValidation = zod_1.z.object({
    body: zod_1.z.object({
        tutorId: zod_1.z.string().nonempty('Tutor ID is required'),
    }),
});
exports.cartValidation = {
    addToCartValidation,
};
