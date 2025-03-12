"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const authenticationError = (err) => {
    const statusCode = 401;
    return {
        statusCode,
        message: 'Invalid token or expired session!',
    };
};
exports.default = authenticationError;
