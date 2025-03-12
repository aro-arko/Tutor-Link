"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tutorSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, immutable: true, unique: true },
    bio: { type: String, default: '' },
    address: { type: String, default: '' },
    hourlyRate: { type: Number, default: 0 },
    tutorImage: { type: String, default: '' },
    phone: { type: String, default: '' },
    subject: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Subject', default: [] },
    qualification: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    reviews: [
        {
            studentId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Student',
                required: true,
            }, // Ensure this is ObjectId, not String
            review: { type: String, default: '' },
            rating: { type: Number, default: 0 },
        },
    ],
    experience: { type: Number, default: 0 },
    age: { type: Number, default: 0 },
    bookedStudents: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Student',
        default: [],
    },
    availability: {
        type: [
            {
                day: { type: String, default: '' },
                timeSlots: { type: String, default: '' },
            },
        ],
        default: [],
    },
});
const Tutor = (0, mongoose_1.model)('Tutor', tutorSchema);
exports.default = Tutor;
