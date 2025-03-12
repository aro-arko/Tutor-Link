"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation error',
    };
};
exports.default = handleValidationError;
