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
exports.likePost = exports.createPost = exports.updatePost = exports.deletePost = exports.getPostById = exports.getPost = void 0;
const post_1 = __importDefault(require("../models/post"));
const user_1 = __importDefault(require("../models/user"));
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.default.find({});
        res.status(200).json({
            message: "Post fetched successfully",
            data: post,
            error: false,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error fetching posts",
            error: true,
        });
    }
});
exports.getPost = getPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = yield post_1.default.findByIdAndUpdate(id, {
            $set: {
                title,
                content,
                edited: true,
            },
        }, { new: true });
        if (!post) {
            res.status(404).json({
                message: "Post not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "Post updated",
            data: post,
            error: false,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error updating post",
            error: true,
        });
    }
});
exports.updatePost = updatePost;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield post_1.default.findById(id);
        if (!post) {
            res.status(404).json({
                message: "Post not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "Post fetched",
            data: post,
            error: false,
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.getPostById = getPostById;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
            res.status(400).json({
                message: "Title, content, and author (user ID) are required.",
                error: true,
            });
            return;
        }
        const existingUser = yield user_1.default.findById(author);
        if (!existingUser) {
            res.status(404).json({
                message: "Author (user) not found.",
                error: true,
            });
            return;
        }
        const newPost = new post_1.default({
            title,
            content,
            author,
            edited: false,
        });
        yield newPost.save();
        res.status(201).json({
            message: "Post created successfully",
            data: newPost,
            error: false,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating post",
            error: true,
            details: error.message,
        });
    }
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield post_1.default.findByIdAndDelete(id);
        if (!post) {
            res.status(404).json({
                message: "Post not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "Post deleted",
            data: post,
            error: false,
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.deletePost = deletePost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params; // <-- params, no body
        const { userId } = req.body;
        const post = yield post_1.default.findById(postId);
        if (!post) {
            res.status(404).json({ message: "Post not found", error: true });
            return;
        }
        const alreadyLiked = post.likes.includes(userId);
        if (alreadyLiked) {
            res.status(400).json({
                message: "User already liked this post",
                error: true,
            });
            return;
        }
        post.likes.push(userId);
        yield post.save();
        res.status(200).json({
            message: "Like added successfully",
            data: post,
            error: false,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.likePost = likePost;
