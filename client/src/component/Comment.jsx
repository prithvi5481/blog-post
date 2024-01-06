import React, { useState } from 'react';
import { getUserId, postComment } from '../apiClient/posts';

const Comment = ({ post, showComments }) => {
  const [comment, setComment] = useState('');
  const [commArray, setCommArray] = useState([]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const userId = (await getUserId()).data;
    const postId = post._id;
    const newComment = { user: userId, text: comment }; // Fixed the object structure
    setCommArray([...commArray, newComment]);
    console.log('userId of comment user', userId);
    console.log('comment:', comment);
    const res = await postComment({ text: comment, postId, userId });
    console.log('res in post page', res);
    setComment(''); // Clear the input field after submitting
    return res;
  };

  return (
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
            {commArray.map((comment, index) => (
              <div key={index}>
                <strong>KJ:</strong> {comment.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;