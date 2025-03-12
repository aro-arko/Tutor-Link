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
exports.tutorService = void 0;
const tutor_model_1 = __importDefault(require("./tutor.model"));
const user_model_1 = __importDefault(require("../User/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const subject_model_1 = require("../Subject/subject.model");
const getMe = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const tutor = yield tutor_model_1.default.findOne({ email: user.email }).populate('subject');
    return tutor;
});
const updateTutor = (user, body) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Validate subject field if it exists in the body
        if (body.subject) {
            const subjects = yield subject_model_1.Subject.find({ _id: { $in: body.subject } });
            if (subjects.length !== body.subject.length) {
                throw new Error('One or more subjects are invalid');
            }
        }
        const tutor = yield tutor_model_1.default.findOneAndUpdate({ email: user.email }, Object.assign({}, body), { new: true, session }).populate('subject');
        if (body.name) {
            yield user_model_1.default.findOneAndUpdate({ email: user.email }, { name: body.name }, { session });
        }
        yield session.commitTransaction();
        session.endSession();
        return tutor;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.tutorService = {
    getMe,
    updateTutor,
};
