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
exports.subjectService = void 0;
const subject_model_1 = require("./subject.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../User/user.model"));
const createSubject = (subjectData, user) => __awaiter(void 0, void 0, void 0, function* () {
    const registrar = yield user_model_1.default.findOne({ email: user.email });
    if (!registrar) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Registrar not found');
    }
    const existingSubject = yield subject_model_1.Subject.findOne({ name: subjectData.name });
    if (existingSubject) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Subject name must be unique');
    }
    const subjectDataWithRegistrar = Object.assign(Object.assign({}, subjectData), { createdBy: registrar._id });
    // Create the new subject
    const subject = yield subject_model_1.Subject.create(subjectDataWithRegistrar);
    return subject;
});
const getSubjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const subjects = yield subject_model_1.Subject.find();
    return subjects;
});
const getSubjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = yield subject_model_1.Subject.findById(id);
    if (!subject) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Subject not found');
    }
    return subject;
});
const updateSubject = (user, id, subjectData) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = yield subject_model_1.Subject.findById(id);
    if (!subject) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Subject not found');
    }
    const userProfile = yield user_model_1.default.findOne({ email: user.email });
    if (!userProfile) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (user.role === 'tutor' && !subject.createdBy.equals(userProfile._id)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to update this subject');
    }
    const updatedSubject = yield subject_model_1.Subject.findByIdAndUpdate(id, subjectData, {
        new: true,
        runValidators: true,
    });
    return updatedSubject;
});
const deleteSubject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = yield subject_model_1.Subject.findByIdAndDelete(id);
    return subject;
});
exports.subjectService = {
    createSubject,
    getSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject,
};
