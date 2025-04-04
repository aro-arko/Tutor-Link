"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    tutorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Tutor', required: true },
    studentEmail: { type: String, required: true },
}, {
    timestamps: true,
});
exports.Cart = (0, mongoose_1.model)('Cart', cartSchema);
