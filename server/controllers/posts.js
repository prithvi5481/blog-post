import mongoose from "mongoose";
import Post from "../model/posts.js";

export const createPost = async (req,res) => {
    try {
        const {userId,content,image} = req.body;
        //console.log('userId',userId);
        //console.log('content',content);
        //console.log('images',image);
        const newPost = await Post.create({user:userId, content, image});
    
        res.status(200).json(newPost);
    } catch (error) {
        console.log('error while posting',error);
        res.status(500).json({message:"Internal Server Error h"});
    }
}

export const getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find().populate('user','name');
        return res.status(200).json(posts);
    } catch (error) {
        console.error('error fetching allPosts',error);
        res.status(500).json({message:"internal server error"});
    }
}

export const getPostById = async (req,res) => {
    try {
        const postId = req.params.id;
        const newPost = await Post.findById(postId).populate('user','name');
        if(!newPost){
            return res.status(404).json({message:"Post not found"});
        }
        return res.status(200).json(newPost);
    } catch (error) {
        console.error('error fetching individual Post by ID',error);
        res.status(500).json({message:"internal server error"});
    }
}

export const addLikes = async (req,res) => {
    try {
        const postId = req.params.id;
        const userId = req.userId;
        //console.log('user like userId',userId);
        const post = await Post.findByIdAndUpdate(postId, {$addToSet: {likes:userId}}, {new:true});
        if(!post){
            return res.status(404).json({error:"Post not found"});
        }
        return res.status(200).json(post);

    } catch (error) {
        console.error('Error adding like:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const addDislikes = async (req,res) => {
    try {
        const postId = req.params.id;
        const userId = req.body.userId;

        const post = await Post.findByIdAndUpdate(postId, {$addToSet: {dislikes: userId}},{new: true});
        if(!post){
            return res.status(404).json({message:"Post is not disliked"});
        }
        res.status(200).json(post);
    } catch (error) {
        console.log('error adding dislike:',error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const addComments = async (req,res) => {
    try {
        const postId = req.params.id;
        const {text, userId} = req.body;
        console.log('text',text);
        console.log('userId',userId);
        const post = await Post.findByIdAndUpdate(
            postId, 
            {$push : {comments:{user:userId,text}}},
            {new: true}
        ).populate('user','name')
        .populate('comments.user', 'name');
        
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
      
        res.status(200).json(post);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export const fetchComments = async (req,res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId).populate('comments.user','name');
        if(!post){
            return res.status(400).json({message:"No posts available"});
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching comment:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export const getUserPosts = async (req,res) => {
    try {
        const {userId} = req.body;
        console.log('userId',userId);
        const posts = await Post.find({user:userId}).populate('user','name');
        if(!posts){
            return res.status(400).json({message:"no posts available"});
        }
        return res.status(200).json(posts);
    } catch (error) {
        console.log('error while finding user posts');
        res.status(500).json({message:"Internal server error"})
    }
}

export const deletePost = async (req,res) => {
    try {
        const postId = req.params.id;
        const {userId, loggedInUserId} = req.body;
        if(userId !== loggedInUserId){
            return res.status(400).json({message:"You are not authorized to delete the post"});
        }
        const post = await Post.findById(postId);
        if(!post){
            return res.status(400).json({message:"Post doesn't exist"});
        }
        const result = await Post.deleteOne({_id:postId});
        if(!result){
            console.log("Post not deleted");
            return res.stutus(400).json({message:"Post not deleted"});
        }else{
            console.log("Post deleted");
            return res.status(200).json({message:result});
        }
    } catch (error) {
        console.log('error while deleting the post');
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const getUserComments = async (req,res) => {
    const userId = req.params.id;
    try {
        const userCommentPosts = await Post.find({"comments.user":userId});
        const userComments = userCommentPosts.map((post) => {
            const comments = post.comments.filter((comment) => {
                if(comment.user.toString() === userId){
                    return comment;
                }
            })
            return comments;
        })
        return res.status(200).json({userComments})

    } catch (error) {
        console.log('error while fetching logged in user comments');
        return res.status(500).json({message:"Internal Server Error"});
    }
}