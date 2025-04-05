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
exports.TipsService = void 0;
const tips_model_1 = __importDefault(require("./tips.model"));
const tutor_model_1 = __importDefault(require("../Tutor/tutor.model"));
const getTips = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tips_model_1.default.find()
        .sort({ date: -1 })
        .limit(1)
        .populate('tutorId');
    return result;
});
const tutorTipsOfTheDay = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const tutor = yield tutor_model_1.default.findOne({ email: user.email });
    if (!tutor) {
        throw new Error('Tutor not found');
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const existing = yield tips_model_1.default.findOne({ date: today });
    if (existing) {
        throw new Error('A tip has already been posted today. Please try again tomorrow.');
    }
    const newTip = yield tips_model_1.default.create({
        tutorId: tutor._id,
        tip: payload.tip,
        date: today,
    });
    return newTip;
});
exports.TipsService = {
    getTips,
    tutorTipsOfTheDay,
};
