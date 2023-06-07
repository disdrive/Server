import express from 'express';
import { login } from './login';

export const authRoutes = express.Router();

authRoutes.use('/login', login);
