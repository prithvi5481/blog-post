import React,{useState, useEffect} from 'react'
import Postcard from '../posts/Postcard'
import { getUserId, getUserPosts } from '../../apiClient/posts'

const Profile = () => {

  useEffect(()=>{
    const fetchUserPosts = async () => {
      const userId = await getUserId();
      console.log('userId',userId.data.userId);
      const id = userId.data.userId;
      const res = await getUserPosts({userId: id});
      console.log('logged in users posts',res);
    }
    fetchUserPosts();
  },[])

  return (
    <div>Profile Page
      
    </div>
  )
}

export default Profile