import express from "express";
import passport from "../../../config/passport.js";
const userRouter = express.Router();
import blogRouter from "./blog.js";
import * as userController from "../../../controllers/users/users_controller.js"

userRouter.use("/blog", blogRouter);
userRouter.get("/sign_up", userController.getSignUp);
userRouter.get("/sign_in", userController.getSignIn);
userRouter.post("/sign-up", userController.signUp);
userRouter.post("/sign-in", passport.authenticate('local',{failureRedirect: '/api/user/sign_in'}), userController.signIn);
userRouter.get("/log-out", userController.logOut);




export default userRouter;