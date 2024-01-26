import React from 'react'
import DeleteIcon from '../assets/trash-solid.svg'
import editIcon from '../assets/edit-icon.svg'
import { deletePostById, getUserId } from '../apiClient/posts'

const DropDown = ({post,setToggleRefresh}) => {

    const deletePost = async (e) => {
        e.preventDefault();
        const postId = post._id;
        const userId = (await getUserId()).data.userId;
        const postUserId = post.user._id;
        const res = await deletePostById({postId,userId,loggedInUserId:postUserId}).then((res)=>{
            setToggleRefresh((prevState)=> !prevState);
            return res;

        }).catch((err)=>{

        })
        console.log('delete post response',res);
    }

  return (
    <div className='w-[130px] h-[90px] bg-cyan-200 flex flex-col justify-evenly items-center border rounded-sm'>
        <div className='hover:bg-cyan-300 w-full flex justify-center items-center py-1 hover:cursor-pointer'>
        <div className='pr-3'>
                <img src={editIcon}/>
            </div>
            Edit
        </div>
        <div className='hover:bg-cyan-300 w-full flex justify-center items-center py-1 hover:cursor-pointer'
            onClick={deletePost}
        >
            <div className='pr-3'>
                <img src={DeleteIcon}/>
            </div>
            Delete
        </div>
    </div>
  )
}

export default DropDown