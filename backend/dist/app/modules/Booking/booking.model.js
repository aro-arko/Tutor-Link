"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    studentId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Student', required: true },
    tutorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Tutor', required: true },
    subject: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Subject', required: true },
    timeSlotId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Tutor', required: true }, // Added timeSlotId
    sessionStartDate: { type: Date, required: true },
    sessionEndDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'canceled'],
        default: 'pending',
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid'],
        default: 'unpaid',
    },
    price: { type: Number, required: true },
}, {
    timestamps: true,
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
