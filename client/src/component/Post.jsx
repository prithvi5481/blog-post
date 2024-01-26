import React, { useEffect, useState } from 'react'
import postImage from '../assets/user-solid.svg';
import deleteImage from '../assets/trash-solid.svg'
import threeDots from '../assets/ellipsis-vertical-solid.svg'
import commentIcon from '../assets/comment-regular.svg'
import likeIcon from '../assets/thumbs-up-regular.svg'
import {allPosts, fetchComments, getCountLikes, getUserId, postComment } from '../apiClient/posts';
import Comment from './Comment';
import DropDown from './DropDown';

const Post = ({post,setToggleRefresh}) => {

    const [likesCount,setLikesCount] = useState(post.likes.length);
    const [showComments,setShowComments] = useState(false);
    const [comment, setComment] = useState('');
    const [commArray, setCommArray] = useState([]);
    const [commCount,setCommCount] = useState(commArray?.length);
    const [threeDotsIcon, setThreeDotsIcon] = useState(false);

    useEffect(() => {
        const fetchAllComments = async () => {
            console.log('post id of api comment',post._id);
            const res = await fetchComments(post._id);
            console.log("api comment data",res.data.comments);
            setCommArray(res.data.comments);
            setCommCount(res.data.comments.length);
        }
        fetchAllComments();
    },[])

    const handleLikes = async (e) => {
        e.preventDefault();
        const postId = post._id;
        console.log('post id post id',postId);
        const userId = await getUserId();
        const res = await getCountLikes({postId,userId});
        setLikesCount(res?.data?.likes?.length);
        console.log('result of like api',res);
        console.log('id for like user',userId);
    }

    
    const handleCommentToggle = async (e) => {
        e.preventDefault();
        setShowComments(!showComments);
    }

    const handleThreeDots = (e) => {
        e.preventDefault();
        setThreeDotsIcon(!threeDotsIcon);
    }
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const userId = (await getUserId()).data.userId;
        const postId = post._id;
       
        console.log('userId of comment user', userId);
        console.log('comment:', comment);
        const res = await postComment({ text: comment, postId:postId, userId:userId });
        //console.log('res in post page', res);
        const res1 = await fetchComments(postId);
        //console.log('line 55',res1?.data?.comments);
        setCommArray(res1?.data?.comments);
        setCommCount((prev) => prev+1);
        //console.log('result of all comments',res1?.data?.comments);
        setComment(''); // Clear the input field after submitting
        return res;
    };

      // Function to convert base64 to Blob and create a data URL
    const base64ToDataURL = (base64String) => {
        const binaryString = window.atob(base64String);
        const arrayBuffer = new ArrayBuffer(binaryString?.length);
        const uintArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < binaryString.length; i++) {
        uintArray[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
        const dataURL = URL.createObjectURL(blob);

        return dataURL;
    };

  return (
    
    <div 
        key={post.id}
        className='w-[500px] bg-gray-200 mb-5 border rounded-md'
    >
        <div className='w-full h-[50px] bg-cyan-300 border rounded-t-md flex items-center justify-between'>
            <div className='flex items-center pl-2'>
                <img src={postImage} alt='post-image' className='h-8 w-8 mr-2'/>
                <p className='font-serif'>{post?.user?.name}</p>
            </div>
            
            <div className='flex items-center'>
                <div className='w-8 h-8 hover:bg-cyan-200 hover:rounded-2xl hover:cursor-pointer flex justify-center items-center mr-3'
                    onClick={handleThreeDots}
                >
                    <img src={threeDots} alt='post-delete' />
                </div>
            </div>
            {
                threeDotsIcon && (
                    <div className='mt-9'>
                        <DropDown post={post} setToggleRefresh = {setToggleRefresh}/>
                    </div>
                )
            }
        </div>
        <div className='mb-6 font-kolor px-1'>{post.content}</div>
    
        {post.image && (
            <img
            src={base64ToDataURL(post?.image)}
            alt="Post Image"
            className="w-auto h-[300px] object-cover"
            />
        )}
            <div className='border-t-2 border-black'></div>
            <div className='flex justify-around h-[75px] bg-gray-100 items-center'>
                <div className='w-14 h-14 flex justify-center items-center hover:bg-gray-400 hover:rounded-[50%] hover:cursor-pointer transition-all duration-500 ease-in-out'
                    onClick={handleLikes}
                >
                    <img src={likeIcon} alt='like-icon' className='w-8 h-8'/>
                    <div className='ml-1'>{likesCount}</div>
                </div>
                <div className='w-14 h-14 flex justify-center items-center hover:bg-gray-400 hover:rounded-[50%] hover:cursor-pointer transition-all duration-500 ease-in-out'
                    onClick = {handleCommentToggle}
                >
                    <img 
                        src={commentIcon} alt='comment-icon' 
                        className='w-8 h-8'
                    />
                    <div className='ml-1'>{commCount}</div>
                </div>
            </div>
            <div>
        {showComments && (
            <div className='mt-4'>
            <form onSubmit={handleCommentSubmit} className='ml-2 mr-2'>
                <input
                type='text'
                placeholder='comment...'
                className='w-full px-2 py-2 rounded-md border focus:outline-none focus:border-customRed'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                />
                <button
                type='submit'
                className='px-2 py-1 bg-customRed rounded-md mt-1 ml-[410px] font-kolor font-bold hover:bg-white'
                >
                Submit
                </button>
            </form>
            <div className='mx-2 my-1'>
                {commArray?.map((comment, index) => (
                <div 
                    key={index}
                    className='border border-black rounded-md mb-2 px-1'
                >
                    <strong className='font-kolor'>{comment?.user?.name}:</strong> {comment?.text}
                </div>
                ))}
            </div>
            </div>
        )}
        </div>
    </div>
    
  )
}

export default Post
