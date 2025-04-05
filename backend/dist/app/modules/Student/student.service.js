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
exports.studentService = void 0;
const user_model_1 = __importDefault(require("../User/user.model"));
const student_model_1 = __importDefault(require("./student.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const tutor_model_1 = __importDefault(require("../Tutor/tutor.model"));
// import { Booking } from '../Booking/booking.model';
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const subject_model_1 = require("../Subject/subject.model");
const booking_model_1 = require("../Booking/booking.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const getMe = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.default.findOne({ email: user.email });
    const studentInfo = yield student_model_1.default.findOne({ user: userData._id });
    return studentInfo;
});
const updateMe = (user, body) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const student = yield student_model_1.default.findOneAndUpdate({ email: user.email }, Object.assign({}, body), { new: true, session });
        if (body.name) {
            yield user_model_1.default.findOneAndUpdate({ email: user.email }, { name: body.name }, { session });
        }
        yield session.commitTransaction();
        session.endSession();
        return student;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const searchTutors = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, subject, subjects, rating, maxRate, availability } = query;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, prefer-const
    let searchQuery = {};
    // Filter by name
    if (name) {
        searchQuery.name = { $regex: name, $options: 'i' };
    }
    // Filter by a single subject name
    if (subject) {
        const subjectDetails = yield subject_model_1.Subject.findOne({
            name: { $regex: subject, $options: 'i' },
        });
        if (subjectDetails) {
            searchQuery.subject = { $in: [subjectDetails._id] };
        }
        else {
            return [];
        }
    }
    // Filter by multiple subject IDs
    if (subjects) {
        const subjectIds = typeof subjects === 'string'
            ? subjects.split(',').map((id) => new mongoose_1.default.Types.ObjectId(id))
            : subjects.map((id) => new mongoose_1.default.Types.ObjectId(id));
        searchQuery.subject = { $in: subjectIds };
    }
    // Filter by minimum rating
    if (rating) {
        searchQuery.rating = { $gte: Number(rating) };
    }
    // Filter by maximum hourly rate
    if (maxRate) {
        searchQuery.hourlyRate = { $lte: Number(maxRate) };
    }
    // Filter by availability (day of the week)
    if (availability) {
        searchQuery['availability.day'] = availability;
    }
    const queryBuilder = new QueryBuilder_1.default(tutor_model_1.default.find(), query).filter().sort();
    // Merge the searchQuery with the QueryBuilder's query
    queryBuilder.modelQuery = queryBuilder.modelQuery.find(searchQuery);
    const tutors = yield queryBuilder.modelQuery;
    return tutors;
});
const getStudentByEmail = (user, email) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.email !== email) {
        throw new Error('You are not authorized to access this resource');
    }
    const studentData = yield student_model_1.default.findOne({ email: email });
    return studentData;
});
const getBookingById = (user, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findOne({
        _id: bookingId,
        student: user._id,
    });
    if (!booking) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
    }
    return booking;
});
const getAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield student_model_1.default.find();
    return students;
});
exports.studentService = {
    getMe,
    updateMe,
    searchTutors,
    getStudentByEmail,
    getBookingById,
    getAllStudents,
};
