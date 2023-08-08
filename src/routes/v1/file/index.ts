import express from "express";
import { getFile } from "./getFile";
import { postFile } from "./postFile";
import { auth } from "@/middleware/auth"; // Assuming the middleware is exported from this path
import { upload } from "@/middleware/upload";

export const fileRoutes = express.Router();

fileRoutes.use(auth); // Apply the auth middleware to all routes

fileRoutes.use("/", getFile);
fileRoutes.post("/", upload, postFile);
