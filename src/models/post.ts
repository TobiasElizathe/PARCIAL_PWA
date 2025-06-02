import mongoose, { Document, Schema } from "mongoose";
import { User } from "./user";

export interface Post extends Document {
  title: string;
  content: string;
  author: User;
  likes: User[];
  edited: boolean;
  createdAt: Date;
}

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    edited: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model<Post>("Post", postSchema);

export default Post;
