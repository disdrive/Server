import express from 'express';
import { getFile } from './getFile';
import { postFile } from './postFile';
import { authMiddleware } from '../../../middleware/authMiddleware';  // Assuming the middleware is exported from this path

export const fileRoutes = express.Router();

fileRoutes.use(authMiddleware);  // Apply the authMiddleware to all routes

fileRoutes.use('/', getFile);
fileRoutes.use('/', postFile);
