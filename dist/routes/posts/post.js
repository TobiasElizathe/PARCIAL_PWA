"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = require("../../controllers/post");
const router = express_1.default.Router();
router.get('/', post_1.getPost);
router.post('/', post_1.createPost);
router.get('/:id', post_1.getPostById);
router.put('/:id', post_1.updatePost);
router.delete('/:id', post_1.deletePost);
router.post('/:postId/like', post_1.likePost);
exports.default = router;
