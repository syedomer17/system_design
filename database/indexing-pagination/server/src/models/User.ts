// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    age: { type: Number, index: true },
  },
  { timestamps: true }
);

// 🔹 Compound index example: speeds up filtering by multiple fields
userSchema.index({ age: 1, createdAt: -1 });

export default mongoose.model<IUser>("User", userSchema);
