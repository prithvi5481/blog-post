import React, { useState, useEffect } from 'react';
import { allPosts } from '../../apiClient/posts';
import Post from '../../component/Post';
import Loading from '../loading/Loading';


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const res = await allPosts();
        setIsLoading(false);
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
      {
        isLoading ? (
          <Loading />
        ) : (
          <>
            {posts.map((post,index) => (
              <Post post={post} key={index}/>
            ))}
          </>
        )
      }
    </div>
   
  );
};

export default Home;
