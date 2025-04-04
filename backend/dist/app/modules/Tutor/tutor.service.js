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
const booking_model_1 = require("../Booking/booking.model");
const student_model_1 = __importDefault(require("../Student/student.model"));
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
const activeSessions = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorData = yield tutor_model_1.default.findOne({ email: user.email });
    if (!tutorData) {
        throw new Error('Tutor not found');
    }
    const bookings = yield booking_model_1.Booking.find({
        tutorId: tutorData._id,
        approvalStatus: 'confirmed',
    });
    return bookings;
});
const bookingRequests = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorData = yield tutor_model_1.default.findOne({ email: user.email });
    if (!tutorData) {
        throw new Error('Tutor not found');
    }
    const bookings = yield booking_model_1.Booking.find({
        tutorId: tutorData._id,
        approvalStatus: 'pending',
    });
    return bookings;
});
const getStudent = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const tutor = yield tutor_model_1.default.findOne({ email: user.email });
    if (!tutor || !tutor.bookedStudents) {
        throw new Error('Tutor or booked students not found');
    }
    const studentIdExists = tutor.bookedStudents.includes(new mongoose_1.default.Types.ObjectId(id));
    if (!studentIdExists) {
        throw new Error('Student not found');
    }
    const student = yield student_model_1.default.findById(id);
    return student;
});
const getAllTutors = () => __awaiter(void 0, void 0, void 0, function* () {
    const tutors = yield tutor_model_1.default.find().sort({ rating: -1 });
    return tutors;
});
const getTutorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tutor = yield tutor_model_1.default.findById(id);
    return tutor;
});
const getBookingById = (user, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const tutor = yield tutor_model_1.default.findOne({ email: user.email });
    // console.log(tutor);
    const booking = yield booking_model_1.Booking.findOne({
        _id: bookingId,
        tutorId: tutor._id,
    });
    return booking;
});
exports.tutorService = {
    getMe,
    updateTutor,
    activeSessions,
    bookingRequests,
    getStudent,
    getAllTutors,
    getTutorById,
    getBookingById,
};
