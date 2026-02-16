import { Router } from "express";
import {
  loginUser,
  adminLogin,
  registerUser,
} from "../controllers/userController.js";

const userRouter = Router();
// http://localhost:4000/api/user/
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

export default userRouter;
