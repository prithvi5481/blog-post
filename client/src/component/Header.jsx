import React from 'react'
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        if(localStorage.getItem('Profile')){
            localStorage.removeItem('Profile');
            //navigate('/auth');
            
        }else{
            console.log('token id not found');
        }
    }
  return (
    <div className='w-full h-16 bg-slate-50 shadow-md fixed z-10'>
        <div className='flex justify-end items-center h-full pr-16'>
            <button className='border rounded-3xl font-semibold px-4 py-1.5 bg-zinc-100 hover:bg-cyan-400 hover:text-white'
                onClick={handleLogout}
            >
                Log out
            </button>
        </div>
    </div>
  )
}

export default Header