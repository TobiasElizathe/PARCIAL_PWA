import { Request, Response } from "express";
import Post from "../models/post";
import User from "../models/user";

const getPost = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("author").populate("likes");
    res.status(200).json({
      message: "Posts fetched successfully",
      data: posts,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          content,
          edited: true,
        },
      },
      { new: true }
    );
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
  } catch (error: any) {
    res.status(400).json({
      message: "Error updating post",
      error: true,
    });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author").populate("likes");

    if (!post) {
      res.status(404).json({
        message: "Post not found",
        error: true,
      });
      return;
    }

    res.status(200).json({
      message: "Post fetched successfully",
      data: post,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      res.status(400).json({
        message: "Title, content, and author (user ID) are required.",
        error: true,
      });
      return;
    }

    const existingUser = await User.findById(author);
    if (!existingUser) {
      res.status(404).json({
        message: "Author (user) not found.",
        error: true,
      });
      return;
    }

    const newPost = new Post({
      title,
      content,
      author,
      edited: false,
    });

    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      data: newPost,
      error: false,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error creating post",
      error: true,
      details: error.message,
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
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
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const likePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $addToSet: { likes: userId },
      },
      { new: true }
    );

    if (!post) {
      res.status(404).json({
        message: "Post not found",
        error: true,
      });
      return;
    }

    res.status(200).json({
      message: "Post fetched successfully",
      data: post,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Error fetching post",
      error: true,
    });
  }
};
export { getPost, getPostById, deletePost, updatePost, createPost, likePost };
