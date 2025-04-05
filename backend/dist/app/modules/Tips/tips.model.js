"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TipsSchema = new mongoose_1.Schema({
    tutorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Tutor',
        required: true,
    },
    tip: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: new Date(),
    },
});
const Tips = (0, mongoose_1.model)('Tips', TipsSchema);
exports.default = Tips;
