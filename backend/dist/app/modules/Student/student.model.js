"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        trim: true,
    },
    educationLevel: {
        type: String,
        enum: ['High School', 'Undergraduate', 'Postgraduate'],
        default: 'High School',
    },
    age: {
        type: Number,
        default: 0,
    },
    phoneNumber: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: '',
    },
    bookedTutors: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    paymentHistory: [
        {
            amount: {
                type: Number,
            },
            date: {
                type: Date,
            },
            method: {
                type: String,
                enum: ['SSLCommerz'],
            },
            default: [],
        },
    ],
}, {
    timestamps: true,
    versionKey: false,
});
const Student = (0, mongoose_1.model)('Student', studentSchema);
exports.default = Student;
