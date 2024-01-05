import express from "express";
import {signup,login, getUserId} from '../controllers/auth.js'
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/getUserId',auth,getUserId)

export default router;