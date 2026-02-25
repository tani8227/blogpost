import express from "express";
const apiRouter = express.Router();
import userRouter from "./users/index.js"


apiRouter.use('/user', userRouter);

export default apiRouter;