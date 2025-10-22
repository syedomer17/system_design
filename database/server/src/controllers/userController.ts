// controllers/userController.ts
import { Request, Response } from "express";
import User from "../models/User.js";

// Controller to get paginated list of users

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find()
        .sort({ createdAt: -1 }) // optional sorting
        .skip(skip)
        .limit(limit),
      User.countDocuments(),
    ]);

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Optional: Get user by email
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create multiple users (bulk insert)
export const createMultipleUsers = async (req: Request, res: Response) => {
  try {
    const users = req.body.users;

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ message: "Users array is required" });
    }

    const insertedUsers = await User.insertMany(users);
    res.status(201).json({
      message: `${insertedUsers.length} users created successfully`,
      users: insertedUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
