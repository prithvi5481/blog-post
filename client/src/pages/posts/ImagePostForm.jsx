import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Postcard from './Postcard';
import { createPostUnique } from '../../apiClient/posts';
import { getUserId } from '../../apiClient/posts';

const ImagePostForm = () => {
  
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    setImages(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Text:', text);
  //   console.log('Images:', images);
  //   const sendPost = async () => {
  //     const resId = await getUserId();
  //     console.log('final result',resId.data.userId);
  //     let userId = resId.data.userId;
  //     const res = await createPostUnique({userId,content:text,image:images});
  //     console.log('line 30',res);
  //   }
  //   sendPost();
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Text:', text);
    console.log('Images:', images);
  
    const base64Images = await Promise.all(
      images.map(async (image) => {
        const base64String = await convertToBase64(image);
        return base64String;
      })
    );
  
    const sendPost = async () => {
      const resId = await getUserId();
      let userId = resId.data.userId;
      const res = await createPostUnique({
        userId,
        content: text,
        image: base64Images,
      });
      console.log('line 30', res);
    };
  
    sendPost();
  };
  
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };
  



  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Share your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div {...getRootProps()} className="mb-4 p-4 border border-dashed border-gray-300 rounded cursor-pointer">
        <input {...getInputProps()} />
        <p className="text-gray-500">Drag & drop some images here, or click to select files</p>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Post
      </button>
    </form>
  );
};

export default ImagePostForm;
