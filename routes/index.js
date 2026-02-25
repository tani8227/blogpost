import express from "express";
const router = express.Router();
import apiRouter from "./api/index.js";
import * as homeController from "../controllers/home_controller.js"


router.get("/", homeController.home)
router.use("/api", apiRouter)


export default router;