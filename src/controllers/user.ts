import { Request, Response } from "express";
import User from "../models/user";

const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.find({});
    res.status(200).json({
      message: "Users fetched successfully",
      data: user,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Error fetching users",
      error: true,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      data: user,
      error: false,
    });
    return;
  } catch (error: any) {
   res.status(400).json({error: error.message}); // <‑‑ aquí
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
       res.status(404).json({
        message: "User not found",
        error: true,
      });
      return;
    }
    res.status(200).json({
      message: "User fetched",
      data: user,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!user) {
       res.status(404).json({
        message: "User not found",
        error: true,
      });
      return;
    }
    res.status(200).json({
      message: "User updated",
      data: user,
      error: false,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Error updating user",
      error: true,
    });
  }
};
const desactivateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(
        id,
        
             { isActive: false },
             {new: true }
        )
        if (!user) {
         res.status(404).json({
            message: "User not found",
            error: true,
        });
        return;
        }
        res.status(200).json({
        message: "User not found",
        data: user,
        error: false,
        });
    } catch (error: any) {
        res.status(400).json({
        error: error.message,
        });
    }
}

const activateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(
        id,
        
             { isActive: true },
             {new: true }
        )
        if (!user) {
         res.status(404).json({
            message: "User Activated Successfully",
            error: true,
        });
        return;
        }
        res.status(200).json({
        message: "User not found",
        data: user,
        error: false,
        });
    } catch (error: any) {
        res.status(400).json({
        error: error.message,
        });
    }
}


export { getUsers, createUser, getUserById, updateUser, activateUser, desactivateUser };