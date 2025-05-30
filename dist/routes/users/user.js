"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../../controllers/user");
const router = express_1.default.Router();
router.get('/', user_1.getUsers);
router.post('/', user_1.createUser);
router.get('/:id', user_1.getUserById);
router.put('/:id', user_1.updateUser);
router.patch('/:id/desactivate', user_1.desactivateUser);
router.patch('/:id/activate', user_1.activateUser);
exports.default = router;
