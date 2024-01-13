import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'


const Navbar = () => {

  const routes = [
    {
      path: '/',
      name: 'Home'
    },
    {
      path: '/profile',
      name: 'Profile'
    },
    {
      path: '/post',
      name: 'Post'
    },
    {
      path: '/bookmarks',
      name: 'Bookmarks'
    },
    {
      path: '/monetisation',
      name: 'Monetisation'
    },
    {
      path: '/premium',
      name: 'Premium'
    },
    {
      path: '/spaces',
      name: 'Spaces'
    }

  ]

  return (
    
    <div className='flex flex-col justify-evenly items-center w-40 h-full pt-10 fixed bg-slate-50 shadow-2xl'>
        {
          routes.map((route,index)=>{
            return (
              <div key={index}>
                <NavLink className="flex justify-center w-32 bg-gray-200 py-2 rounded-3xl nav-link font-medium" exact='true' to={route.path} key={route.index} activeclassname='active'>
                    {route.name}
                </NavLink>
              </div>
            )
          })
        }
    </div>
  )
}

export default Navbar