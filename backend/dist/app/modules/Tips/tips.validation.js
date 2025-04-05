"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipsValidation = void 0;
const zod_1 = require("zod");
const createTipsValidation = zod_1.z.object({
    body: zod_1.z.object({
        tip: zod_1.z
            .string({
            required_error: 'Tips is required',
        })
            .min(40, 'Tips must be at least 40 characters long')
            .max(250, 'Tips must not exceed 250 characters'),
    }),
});
exports.tipsValidation = {
    createTipsValidation,
};
