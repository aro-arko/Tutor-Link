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
exports.bookingService = void 0;
const booking_model_1 = require("./booking.model");
const tutor_model_1 = __importDefault(require("../Tutor/tutor.model"));
const student_model_1 = __importDefault(require("../Student/student.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createBooking = (user, bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield student_model_1.default.findOne({ email: user.email });
    if (!userData) {
        throw new Error('User not found');
    }
    const tutorData = yield tutor_model_1.default.findById(bookingData.tutorId);
    if (!tutorData) {
        throw new Error('Tutor not found');
    }
    // Check if the requested subject is available in the tutor's subject array
    const isSubjectAvailable = tutorData.subject.includes(bookingData.subject);
    if (!isSubjectAvailable) {
        throw new Error('Tutor does not teach the requested subject');
    }
    // Check if the requested time slot matches the tutor's availability
    const availability = tutorData.availability.find((slot) => slot._id.equals(bookingData.timeSlotId));
    if (!availability) {
        throw new Error('Tutor is not available at the requested time slot');
    }
    // Extract start and end times from the timeSlots field
    const [startTime, endTime] = availability.timeSlots.split('-');
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    // Calculate the duration of each session in hours
    const sessionDuration = endHour + endMinute / 60 - (startHour + startMinute / 60);
    // Convert sessionStartDate and sessionEndDate to Date objects
    const sessionStartDate = new Date(bookingData.sessionStartDate);
    const sessionEndDate = new Date(bookingData.sessionEndDate);
    // Calculate the number of occurrences between the start and end dates
    const startDate = new Date(sessionStartDate);
    const endDate = new Date(sessionEndDate);
    let occurrences = 0;
    while (startDate <= endDate) {
        if (startDate.toLocaleString('en-US', { weekday: 'long' }) ===
            availability.day) {
            occurrences++;
        }
        startDate.setDate(startDate.getDate() + 1);
    }
    console.log(occurrences);
    const totalDuration = sessionDuration * occurrences;
    if (totalDuration === 0) {
        throw new Error('No available slots within the specified date range');
    }
    const bookingDataWithUserId = Object.assign(Object.assign({}, bookingData), { studentId: userData._id, duration: totalDuration, price: tutorData.hourlyRate * totalDuration, status: 'pending' });
    const booking = yield booking_model_1.Booking.create(bookingDataWithUserId);
    return booking;
});
const studentBookingList = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield student_model_1.default.findOne({ email: user.email });
    const bookings = yield booking_model_1.Booking.find({ studentId: userData._id });
    return bookings;
});
const cancelBooking = (user, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield student_model_1.default.findOne({ email: user.email });
    if (!userData) {
        throw new Error('User not found');
    }
    const ownBooking = yield booking_model_1.Booking.findOne({
        studentId: userData._id,
        _id: bookingId,
    });
    if (!ownBooking) {
        throw new Error('Sorry you cannot cancel this booking');
    }
    if (ownBooking.paymentStatus !== 'unpaid') {
        throw new Error('Cannot cancel a booking with paid status please contact support');
    }
    ownBooking.status = 'canceled';
    yield ownBooking.save();
    return ownBooking;
});
const tutorBookingList = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield tutor_model_1.default.findOne({ email: user.email });
    const bookings = yield booking_model_1.Booking.find({ tutorId: userData._id });
    return bookings;
});
const updateBookingStatus = (user, bookingId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const userData = yield tutor_model_1.default.findOne({ email: user.email });
        if (!userData) {
            throw new Error('User not found');
        }
        const ownReceivedBooking = yield booking_model_1.Booking.findOne({
            tutorId: userData._id,
            _id: bookingId,
        }).session(session);
        if (!ownReceivedBooking) {
            throw new Error('Booking not found');
        }
        ownReceivedBooking.status = status;
        yield ownReceivedBooking.save({ session });
        // Add student ID to bookedStudents in Tutor collection if status is confirmed
        if (status === 'confirmed') {
            yield tutor_model_1.default.findByIdAndUpdate(userData._id, { $addToSet: { bookedStudents: ownReceivedBooking.studentId } }, { session });
        }
        yield session.commitTransaction();
        session.endSession();
        return ownReceivedBooking;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.bookingService = {
    createBooking,
    tutorBookingList,
    cancelBooking,
    updateBookingStatus,
    studentBookingList,
};
