import express from 'express';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import userRoutes from "./route/userRoutes.js";

const app = express();
const PORT =  3000;

// Middleware to parse JSON requests
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});