import React, { useState, useEffect } from 'react';
import { allPosts } from '../../apiClient/posts';
import Post from '../../component/Post';


const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await allPosts();
        console.log('checking response', res.data);
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);



  return (
    
    <div className='pt-6'>
      {posts.map((post,index) => (
        <Post post={post} key={index}/>
      ))}
    </div>
   
  );
};

export default Home;
