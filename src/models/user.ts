
import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  createdAt: Date;
  isActive : boolean;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now 
    },
    isActive: {
      type: Boolean,
      default: true, 
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<User>("User", userSchema);

export default User;