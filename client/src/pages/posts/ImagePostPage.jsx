import React from 'react';
import ImagePostForm from './ImagePostForm';

const ImagePostPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md border border-2">
        <h1 className="text-3xl font-semibold text-center mb-6">Share Your Moment</h1>
        <ImagePostForm />
        <div className="mt-8 text-sm text-gray-500 text-center">
          <p>By posting, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};

export default ImagePostPage;
