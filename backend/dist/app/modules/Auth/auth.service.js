"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../User/user.model"));
const student_model_1 = __importDefault(require("../Student/student.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const tutor_model_1 = __importDefault(require("../Tutor/tutor.model"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createStudentIntoDB = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = Object.assign({}, payLoad);
    userData.role = 'student';
    const existingUser = yield user_model_1.default.findOne({ email: userData.email });
    if (existingUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Email already exists');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield user_model_1.default.create([userData], { session: session });
        const studentInfo = Object.assign({ user: newUser[0]._id }, userData);
        const newStudent = yield student_model_1.default.create([studentInfo], {
            session: session,
        });
        if (!newStudent || !newUser) {
            throw new AppError_1.default(http_status_1.default.BAD_GATEWAY, 'Error while creating student profile');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newUser;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const createTutorIntoDB = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = Object.assign({}, payLoad);
    userData.role = 'tutor';
    const existingUser = yield user_model_1.default.findOne({ email: userData.email });
    if (existingUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Email already exists');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield user_model_1.default.create([userData], { session: session });
        const tutorInfo = Object.assign({ user: newUser[0]._id }, userData);
        const newTutor = yield tutor_model_1.default.create([tutorInfo], {
            session: session,
        });
        if (!newTutor || !newUser) {
            throw new AppError_1.default(http_status_1.default.BAD_GATEWAY, 'Error while creating tutor profile');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newUser;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const loginUser = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = Object.assign({}, payLoad);
    const user = yield user_model_1.default.isUserExistsByEmail(userData.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (!(yield user_model_1.default.isPasswordMatched(userData.password, user.password))) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid password');
    }
    // jwt token generation
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return { accessToken: accessToken };
});
const changePassword = (payLoad, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (userData.email == 'arko@tutorlink.com') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Demo account password cannot be changed');
    }
    else if (userData.email == 'sukhminder@tutorlink.com') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Demo account password cannot be changed');
    }
    const user = yield user_model_1.default.isUserExistsByEmail(userData.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    if (!(yield user_model_1.default.isPasswordMatched(payLoad.oldPassword, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched');
    // hased new password
    const newHashedPassword = yield bcrypt_1.default.hash(payLoad.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.default.findOneAndUpdate({
        email: userData.email,
        role: userData.role,
    }, {
        password: newHashedPassword,
    });
    return null;
});
exports.authServices = {
    createStudentIntoDB,
    createTutorIntoDB,
    loginUser,
    changePassword,
};
