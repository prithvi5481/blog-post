import express from "express";
import {signup,login, getUserId, userInfo} from '../controllers/auth.js'
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/getUserId',auth,getUserId);
router.get('/userInfo/:id',userInfo);

export default router;