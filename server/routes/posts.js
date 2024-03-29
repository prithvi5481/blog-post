import express from 'express'
import { createPost, getAllPosts, getPostById, addComments, addDislikes, addLikes, fetchComments, getUserPosts, deletePost, getUserComments } from '../controllers/posts.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/posts',getAllPosts);
router.get('/posts/:id',getPostById);
router.get('/posts/:id/getcomments',fetchComments);
router.get('/posts/userComments/:id',getUserComments)


router.post('/posts',auth,createPost);
router.post('/posts/:id/likes',auth,addLikes);
router.post('/posts/:id/dislikes',addDislikes);
router.post('/posts/:id/comments',auth,addComments);
router.post('/posts/userposts',auth,getUserPosts);
router.post('/posts/delete/:id',deletePost);

export default router;