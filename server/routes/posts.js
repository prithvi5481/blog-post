import express from 'express'
import { createPost, getAllPosts, getPostById, addComments, addDislikes, addLikes } from '../controllers/posts.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/posts',getAllPosts);
router.get('/posts/:id',getPostById);

router.post('/posts',auth,createPost);
router.post('/posts/:id/likes',auth,addLikes);
router.post('/posts/:id/dislikes',addDislikes);
router.post('/posts/:id/comments',addComments);
export default router;