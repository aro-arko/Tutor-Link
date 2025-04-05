"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleValidationError = (err) => {
    var _a;
    const statusCode = 400;
    return {
        statusCode,
        message: err instanceof zod_1.ZodError ? (_a = err.issues[0]) === null || _a === void 0 ? void 0 : _a.message : 'Zod error',
    };
};
exports.default = handleValidationError;
