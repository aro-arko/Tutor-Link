"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const handleDuplicateError = (err) => {
    const statusCode = 400;
    return {
        statusCode,
        message: 'Email already exists. Please use a different email',
    };
};
exports.default = handleDuplicateError;
