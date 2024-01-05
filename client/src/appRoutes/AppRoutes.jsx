import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layouts from '../pages/layouts/Layouts';
import Home from '../pages/home/Home';
import Profile from '../pages/profile/Profile';
import Bookmarks from '../pages/bookmarks/Bookmarks';
import Monetisation from '../pages/monetisation/Monetisation';
import Premium from '../pages/premium/Premium';
import Spaces from '../pages/spaces/Spaces';
import ImagePostPage from '../pages/posts/ImagePostPage';

const AppRoutes = () => {

  return (
    <Layouts>
     
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/bookmarks' element={<Bookmarks />} />
          <Route path='/post' element={<ImagePostPage />} />
          <Route path='/monetisation' element={<Monetisation />} />
          <Route path='/premium' element={<Premium />} />
          <Route path='/spaces' element={<Spaces />} />
        </Routes>
    </Layouts>
  );
};

export default AppRoutes;
