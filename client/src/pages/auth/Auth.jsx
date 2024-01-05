import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { signup,logIn } from '../../apiClient/auth.js';


const Auth = () => {
    const [signUp,setSignUp] = useState(true);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const cardHeightClass = signUp ? 'h-[450px]' : 'h-[300px]';
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            if(signUp){
                res = await signup({name,email,password});
                console.log('signup api called',res);
                setSignUp(true);
                navigate('/');

            }else{
                res = await logIn({email,password});
                console.log('login api called',res);
                //setSignUp(true)
                //navigate('/');
                
            }
            if (res.data) {
                const profile = {
                  token: res.data.token,
                  // Other properties you want to store
                };
                localStorage.setItem("Profile", JSON.stringify(profile));
              }
            //console.log(res.data.token); 
        } catch (error) {
            console.log(error.response.data);
        }
    }

  return (
    <div className='flex justify-center pt-[100px] w-screen h-screen bg-gray-200'>
        

            <div className={`w-[300px] ${cardHeightClass}  border rounded-lg flex flex-col pt-8 shadow-lg bg-white`}>
            <form onSubmit={handleSubmit}>
                {
                    signUp && (
                        <div className='px-2'>
                            <label className='font-medium'>Display Name</label>
                            <div>
                                <input 
                                    type='text' 
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='border w-full border-gray-400 mt-2 rounded-md px-2 py-1'
                                />
                            </div>
                        </div>
                    )
                }
                
                <div className='px-2 mt-3'>
                    <div className='font-medium'>Email</div>
                    <div>
                        <input 
                            type='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border w-full border-gray-400 mt-2 rounded-md px-2 py-1'
                        />
                    </div>
                </div>
                <div className='px-2 mt-3'>
                    <div className='font-medium'>Password</div>
                    <div>
                        <input 
                            type='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border w-full border-gray-400 mt-2 rounded-md px-2 py-1'
                        />
                    </div>
                </div>
                <div>
                    <button 
                        type='submit'
                        className='w-[280px] bg-blue-600 py-1.5 mt-4 px-2 mx-2 border rounded-md text-white font-normal text-xsm'
                    >
                        {signUp ? "Sign up" : "Log in"}
                    </button>
                </div>
            </form>
            <div className='text-sm px-2 mt-4 ml-6'>
                {signUp ? "Already have an account ?  " : "Don't have an account ?  "}
                <button 
                    className='text-blue-500'
                    onClick={() => setSignUp(!signUp)}
                >
                    {signUp ? "Log in" : "Sign up"}
                </button>
            </div>
            {
                signUp ? (
                    <div className='text-xs mt-5 px-2 py-2'>By clicking “Sign up”, you agree to our
            <p className='inline-block text-blue-400'>terms of  service</p> and acknowledge that you have 
            read and understand our <p className='inline-block text-blue-400'>privacy policy</p> and <p className='inline-block text-blue-400'>code of conduct</p>.</div>
                ) : ""
            }
            
        </div>
    </div>
    
  )
}

export default Auth