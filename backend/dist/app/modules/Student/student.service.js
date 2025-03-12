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
const ObjectId = mongoose_1.default.Types.ObjectId;
const tutor_model_1 = __importDefault(require("../Tutor/tutor.model"));
const booking_model_1 = require("../Booking/booking.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const subject_model_1 = require("../Subject/subject.model");
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
const reviewTutor = (user, tutorId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.default.findOne({ email: user.email });
    if (!student) {
        throw new Error('Student not found');
    }
    const completedBooking = yield booking_model_1.Booking.findOne({
        studentId: student._id,
        tutorId: tutorId,
        status: 'completed',
    });
    if (!completedBooking) {
        throw new Error('You can only review tutors with whom you have completed a booking');
    }
    const tutor = yield tutor_model_1.default.findById(tutorId);
    if (!tutor) {
        throw new Error('Tutor not found');
    }
    // Check if the student has already given a review
    const existingReview = tutor.reviews.find((review) => review.studentId.toString() === student._id.toString());
    if (existingReview) {
        throw new Error('You have already reviewed this tutor');
    }
    // Clean up the reviews array to ensure it only contains valid objects
    tutor.reviews = tutor.reviews.filter((review) => typeof review === 'object' && review.rating);
    // Update the tutor's reviews and rating
    tutor.reviews.push({
        _id: new ObjectId(),
        studentId: student._id,
        review: body.review,
        rating: body.rating,
    });
    // Calculate the new average rating
    const totalRatings = tutor.reviews.reduce((sum, review) => sum + (typeof review.rating === 'number' ? review.rating : 0), 0);
    tutor.rating = totalRatings / tutor.reviews.length;
    yield tutor.save();
    return tutor;
});
const updateReview = (user, reviewId, body) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.default.findOne({ email: user.email });
    if (!student) {
        throw new Error('Student not found');
    }
    const tutor = yield tutor_model_1.default.findOne({ 'reviews._id': reviewId });
    if (!tutor) {
        throw new Error('Review not found');
    }
    const review = tutor.reviews.find((review) => review._id.toString() === reviewId);
    if (!review) {
        throw new Error('Review not found');
    }
    if (review.studentId.toString() !== student._id.toString()) {
        throw new Error('You can only update your own reviews');
    }
    // Ensure studentId is correctly cast to ObjectId
    review.studentId = new ObjectId(review.studentId);
    // Update the review with valid data
    review.rating = body.rating;
    review.review = body.review;
    // Recalculate the average rating
    const totalRatings = tutor.reviews.reduce((sum, review) => sum + (typeof review.rating === 'number' ? review.rating : 0), 0);
    tutor.rating = totalRatings / tutor.reviews.length;
    yield tutor.save();
    return tutor;
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const searchTutors = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['name', 'subject'];
    // Check if the search term is for a subject
    let subjectDetails;
    if (query.subject) {
        subjectDetails = yield subject_model_1.Subject.findOne({ name: query.subject });
    }
    query.subject = subjectDetails === null || subjectDetails === void 0 ? void 0 : subjectDetails._id;
    // console.log(subjectDetails);
    const queryBuilder = new QueryBuilder_1.default(tutor_model_1.default.find(), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const tutors = yield queryBuilder.modelQuery;
    return tutors;
});
exports.studentService = {
    getMe,
    updateMe,
    reviewTutor,
    updateReview,
    searchTutors,
};
