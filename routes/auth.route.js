import express from 'express';
import { signup, login, signout } from '../controllers/auth.controller.js';

const router = express.Router()


export default router