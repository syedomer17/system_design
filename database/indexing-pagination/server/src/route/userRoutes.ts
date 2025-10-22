import { Router } from "express";
import { getUsers, createUser, getUserById, getUserByEmail, createMultipleUsers, getAllName  } from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.post("/create", createUser);
router.post("/create-multiple", createMultipleUsers);
router.get("/:id", getUserById);
router.get("/find/by-email", getUserByEmail);
router.get("/names/all", getAllName);


export default router;