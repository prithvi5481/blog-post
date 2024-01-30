import React,{useState, useEffect} from 'react'
import Postcard from '../posts/Postcard'
import { getUserId, getUserPosts } from '../../apiClient/posts'
import { userInfo } from '../../apiClient/auth'
import Post from '../../component/Post'

const Profile = () => {
  const [user,setUser] = useState();
  const [userPosts, setUserPosts] = useState([]);
  useEffect(()=>{
    const fetchUserPosts = async () => {
      const userId = await getUserId();
      console.log('userId',userId.data.userId);
      const id = userId.data.userId;
      const res = await getUserPosts({userId: id});
      setUserPosts(res?.data);
      console.log('logged in users posts',res);
    }
    fetchUserPosts();
  },[])

  useEffect(()=>{
    const fetchUserInfo = async () => {
      const userId = await getUserId();
      const id = userId.data.userId;
      const res = await userInfo(id);
      console.log('response',res?.user?.data);
      setUser(res?.data?.user);
    }
    fetchUserInfo();
  },[])

  return (
    <div>Profile Page
     <div>User Name - {user?.name}</div> 
     {
      userPosts?.map((post) => (
        <div key={post._id}>
          <Post post={post}/>
        </div>
      ))
     }
    </div>
  )
}

export default Profile