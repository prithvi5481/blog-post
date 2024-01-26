import axios from 'axios'
import * as CONSTANT from './api.constant.js';

const profile = JSON.parse(localStorage.getItem("Profile"));



export const allPosts = async () => {
    //console.log('checking config',config);
    try {
        const profile = JSON.parse(localStorage.getItem('Profile'));
        const config = {
            headers: {
                Authorization: `Bearer ${profile.token}`,
            },
        };

        const url = `${CONSTANT.API_URL}/newpost/posts`;
        const res = await axios.get(url,config);
        console.log('all posts',res);
        return res;
    } catch (error) {
        console.log('error while fetching all posts',error);
        throw error;
    }
}

export const createPostUnique = async (payload) => {
    
    try {
        const profile = JSON.parse(localStorage.getItem('Profile'));
        const config = {
            headers: {
                Authorization: `Bearer ${profile.token}`,
            },
        };
        //console.log('checking config data',config);
        //console.log('token value',profile.token);
        console.log('payload data',payload);
        const url = `${CONSTANT.API_URL}/newpost/posts`;
        const res = await axios.post(url,payload,config);
        console.log('response of post',res);
        return res;
    } catch (error) {
        console.log('error in creating post on client side');
        return error;
    }
}

export const getUserId = async () => {
    try {
        const profile = JSON.parse(localStorage.getItem('Profile'));
        const config = {
            headers: {
                Authorization: `Bearer ${profile.token}`,
            },
        };

        console.log('config address',config);
        const url = `${CONSTANT.API_URL}/user/getUserId`;
        const res = await axios.get(url,config);
        console.log('userId in auth page',res);
        return res;
    } catch (error) {
        return error;
    }
}

export const getCountLikes = async (payload) => {
    try {
        const profile = JSON.parse(localStorage.getItem('Profile'));
        const config = {
            headers: {
                Authorization: `Bearer ${profile.token}`,
            },
        };
        console.log('config address',config);
        console.log('user id in client api',payload.userId.data.userId);
        const url = `${CONSTANT.API_URL}/newpost/posts/${payload.postId}/likes`;
        const res = await axios.post(url,payload.userId.data.userId,config);
        return res;
    } catch (error) {
        return error;
    }
}

export const postComment = async (payload) => {
    try {
        const profile = JSON.parse(localStorage.getItem('Profile'));
        const config = {
            headers: {
                Authorization: `Bearer ${profile.token}`,
            },
        };
        console.log('config address',config);
        const payloadData = {
            text:payload.text,
            userId: payload.userId
        }
        
        console.log('userId of commentdata',payloadData);

        const url = `${CONSTANT.API_URL}/newpost/posts/${payload.postId}/comments`;
        const res = await axios.post(url,payloadData,config);
        console.log('response of comment api',res);
        return res;
    } catch (error) {
        return error;
    }
}

export const fetchComments = async (payload) => {
    try {
        const profile = JSON.parse(localStorage.getItem('Profile'));
        const config = {
            headers: {
                Authorization: `Bearer ${profile.token}`,
            },
        };
        console.log('config address',payload);

        const url = `${CONSTANT.API_URL}/newpost/posts/${payload}/getcomments`;
        const res = await axios.get(url,config);
        console.log('fetching comments',res);
        return res;
    } catch (error) {
        return error;
    }
}

export const getUserPosts = async (payload) => {
    try {
        const profile = JSON.parse(localStorage.getItem('Profile'));
        const config = {
            headers: {
                Authorization: `Bearer ${profile.token}`
            }
        }
        //console.log('config address',config);
        const url = `${CONSTANT.API_URL}/newpost/posts/userposts`;
        console.log('payload',payload);
        const res = await axios.post(url,payload,config);
        return res;
    } catch (error) {
        console.log('error in user posts');
        return error;
    }
}

export const deletePostById = async (payload) => {
    try {
        const profile = JSON.parse(localStorage.getItem('Profile'));
        let config = {
            headers: {
                Authorization: `Bearer ${profile.token}`
            }
        }
        const {postId} = payload;
        console.log(payload);
        const url = `${CONSTANT.API_URL}/newpost/posts/${postId}/delete`;
        const res = await axios.post(url,payload,config);
        return res;
    } catch (error) {
        console.log('error while deleting post');
        return error;
    }
}