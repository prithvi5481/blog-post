import React, { useEffect, useState } from 'react'
import postImage from '../assets/user-solid.svg';
import commentIcon from '../assets/comment-regular.svg'
import likeIcon from '../assets/thumbs-up-regular.svg'
import { fetchComments, getCountLikes, getUserId, postComment } from '../apiClient/posts';
import Comment from './Comment';


const Post = ({post}) => {

    const [likesCount,setLikesCount] = useState(post.likes.length);
    const [showComments,setShowComments] = useState(false);
    const [comment, setComment] = useState('');
    const [commArray, setCommArray] = useState([]);
    const [commCount,setCommCount] = useState(commArray?.length);


    useEffect(() => {
        const fetchAllComments = async () => {
            console.log('post id of api comment',post._id);
            const res = await fetchComments(post._id);
            console.log("api comment data",res.data.comments);
            setCommArray(res.data.comments);
            setCommCount(res.data.comments.length);
        }
        fetchAllComments();
    },[post._id])

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

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const userId = (await getUserId()).data.userId;
        const postId = post._id;
       
        console.log('userId of comment user', userId);
        console.log('comment:', comment);
        const res = await postComment({ text: comment, postId:postId, userId:userId });
        //console.log('res in post page', res);
        const res1 = await fetchComments(postId);
        setCommArray(res1?.data?.commmets);
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
        className='w-[500px] bg-gray-200 mb-5 border'
    >
        <div className='w-full h-[50px] bg-gray-400 flex'>
            <img src={postImage} alt='post-image' className='h-[40px] w-[30px] ml-2 pt-1.5'/>
            <p className='pt-3 pl-4 font-serif'>{post?.user?.name}</p>

        </div>
        <p>{post.content}</p>
    
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
                    <div>{likesCount}</div>
                </div>
                <div className='w-14 h-14 flex justify-center items-center hover:bg-gray-400 hover:rounded-[50%] hover:cursor-pointer transition-all duration-500 ease-in-out'
                    onClick = {handleCommentToggle}
                >
                    <img 
                        src={commentIcon} alt='comment-icon' 
                        className='w-8 h-8'
                    />
                    <div>{commCount}</div>
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
                className='px-2 py-1 bg-customRed rounded-md mt-1 ml-[410px]'
                >
                Submit
                </button>
            </form>
            <div>
                {commArray?.map((comment, index) => (
                <div key={index}>
                    <strong>{comment?.user?.name}:</strong> {comment?.text}
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
