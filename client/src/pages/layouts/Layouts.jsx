import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import '../navbar/Navbar.css'
import Auth from '../auth/Auth';
import Header from '../../component/Header';

const Layouts = ({children}) => {
  const [isLoggedin,setIsLoggedin] = useState(false);
  const [a, setA] = useState(() => JSON.parse(localStorage.getItem('Profile')));

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('Profile'));
    setA(token);
  }, []);

  useEffect(() => {
    const loggedIn = a !== null;
    setIsLoggedin(loggedIn);
    //console.log('token id', a);
  }, [a]);

  return (
    <div>
      {
        !isLoggedin ? (<Auth />) : 
        (
          <>
            <Header />
            <Navbar />
            <div className='ml-[220px] pt-20'>{children}</div>
          </>
        )
      }
    </div>
  )
}

export default Layouts



// import React, { useEffect, useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from '../navbar/Navbar';
// import '../navbar/Navbar.css';
// import Auth from '../auth/Auth';
// import Header from '../../component/Header';

// const Layouts = ({ children }) => {
  
//   const [isLoggedin, setIsLoggedin] = useState(false);
//   const [a, setA] = useState(() => JSON.parse(localStorage.getItem('Profile')));

//   useEffect(() => {
//     const token = JSON.parse(localStorage.getItem('Profile'));
//     setA(token);
//   }, []);

//   useEffect(() => {
//     const loggedIn = a !== null;
//     setIsLoggedin(loggedIn);
//   }, [a]);

//   return (
//     <Routes>
//       <Route path="auth" element={<Auth />} />
//       <Route
//         path="/"
//         element={
//           isLoggedin ? (
//             <>
//               <Header />
//               <Navbar />
//               <div className="ml-[240px] pt-14">{children}</div>
//             </>
//           ) : (
//             <Navigate to="/auth" />
//           )
//         }
//       />
//     </Routes>
//   );
// };

// export default Layouts;
