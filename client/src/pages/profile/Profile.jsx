import React,{useState, useEffect} from 'react'
import Postcard from '../posts/Postcard'
import { getUserComments, getUserId, getUserPosts } from '../../apiClient/posts'
import { userInfo } from '../../apiClient/auth'
import Post from '../../component/Post'
import UserComments from './UserComments'

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
      // const comm = await getUserComments();
      // console.log('commmm',comm);
      setUser(res?.data?.user);
    }
    fetchUserInfo();
  },[])

  return (
    <div className='h-screen w-full'>
      <div className='w-screen h-14 bg-cyan-300 font-semibold flex items-center px-4 fixed'>
        <div>{user?.name}</div> 
      </div>
      <div className='flex justify-around'>
        <div className='pt-16 pl-8'>
          {
            userPosts.length === 0 && <div>You have not posted anything yet</div>
          }
          {
            userPosts?.map((post) => (
              <div key={post._id}>
                <Post post={post}/>
              </div>
            ))
          }
        </div>
        <div className='pt-16'>
          <UserComments />
        </div>
      </div>
    </div>
  )
}

export default Profile