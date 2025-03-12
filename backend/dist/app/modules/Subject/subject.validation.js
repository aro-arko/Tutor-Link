"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectValidation = void 0;
const zod_1 = require("zod");
const subjectCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(3, 'Name must be at least 3 characters long')
            .max(100, 'Name must not exceed 100 characters'),
        description: zod_1.z
            .string()
            .min(10, 'Description must be at least 10 characters long')
            .max(500, 'Description must not exceed 500 characters'),
        gradeLevel: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
    }),
});
const updateSubjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(3, 'Name must be at least 3 characters long')
            .max(100, 'Name must not exceed 100 characters')
            .optional(),
        description: zod_1.z
            .string()
            .min(10, 'Description must be at least 10 characters long')
            .max(500, 'Description must not exceed 500 characters')
            .optional(),
        gradeLevel: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
    }),
});
exports.subjectValidation = {
    subjectCreateValidationSchema,
    updateSubjectValidationSchema,
};
