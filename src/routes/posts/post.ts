import express from "express";

import {
  getPost,
  createPost,
  likePost,
  getPostById,
  updatePost,
  deletePost,
  
} from "../../controllers/post";

const router = express.Router();
router.get("/", getPost);
router.post("/", createPost);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/like", likePost);

export default router;
