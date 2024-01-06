import express from 'express'
import { createPost, getAllPosts, getPostById, addComments, addDislikes, addLikes, fetchComments, getUserPosts } from '../controllers/posts.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/posts',getAllPosts);
router.get('/posts/:id',getPostById);
router.get('/posts/:id/getcomments',fetchComments);


router.post('/posts',auth,createPost);
router.post('/posts/:id/likes',auth,addLikes);
router.post('/posts/:id/dislikes',addDislikes);
router.post('/posts/:id/comments',addComments);
router.post('/posts/userposts',getUserPosts);

export default router;