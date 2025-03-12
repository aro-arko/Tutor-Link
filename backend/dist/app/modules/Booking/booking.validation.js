"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const zod_1 = require("zod");
const bookingCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        tutorId: zod_1.z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
            message: 'Invalid tutor ID (must be a valid ObjectId)',
        }),
        subject: zod_1.z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
            message: 'Invalid subject ID (must be a valid ObjectId)',
        }),
        timeSlotId: zod_1.z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
            message: 'Invalid time slot ID (must be a valid ObjectId)',
        }),
        sessionStartDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: 'Invalid date format for session start date',
        }),
        sessionEndDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: 'Invalid date format for session end date',
        }),
    }),
});
exports.bookingValidation = {
    bookingCreateValidationSchema,
};
