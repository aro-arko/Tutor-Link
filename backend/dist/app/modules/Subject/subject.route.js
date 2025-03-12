"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const subject_validation_1 = require("./subject.validation");
const subject_controller_1 = require("./subject.controller");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.tutor), (0, validateRequest_1.default)(subject_validation_1.subjectValidation.subjectCreateValidationSchema), subject_controller_1.subjectController.createSubject);
router.get('/', subject_controller_1.subjectController.getSubjects);
router.get('/:id', subject_controller_1.subjectController.getSubjectById);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.tutor), (0, validateRequest_1.default)(subject_validation_1.subjectValidation.updateSubjectValidationSchema), subject_controller_1.subjectController.updateSubject);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), subject_controller_1.subjectController.deleteSubject);
exports.SubjectRoutes = router;
