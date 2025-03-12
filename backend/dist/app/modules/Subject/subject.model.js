"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
const mongoose_1 = require("mongoose");
const SubjectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    gradeLevel: {
        type: String,
        enum: ['high-school', 'bachelors', 'post-graduate'],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });
exports.Subject = (0, mongoose_1.model)('Subject', SubjectSchema);
