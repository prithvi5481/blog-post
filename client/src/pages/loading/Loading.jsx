import React from 'react'
import './Loading.css'

const Loading = () => {
  return (
    <div className='loading-container'>
        <div className='loader'></div>
        <p className='loading-text'>Loading...</p>
    </div>
  )
}

export default Loading