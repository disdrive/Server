import express from 'express';
import { getFile } from './getFile';
import { postFile } from './postFile';
import { auth } from '../../../middleware/auth';  // Assuming the middleware is exported from this path

export const fileRoutes = express.Router();

fileRoutes.use(auth);  // Apply the auth middleware to all routes

fileRoutes.use('/', getFile);
fileRoutes.use('/', postFile);
