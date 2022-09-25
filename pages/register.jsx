import { useState, useRef } from 'react';
import Router from 'next/router';

import { useAuthContext } from '../lib/authContext';
import { fetcher } from '../lib/api';
import { setToken } from '../lib/auth';
import Link from 'next/link';

export default function Register() {
    const [userDetails, setUserDetails] = useState({identifier: '', email: '', password: '', verify: ''});
    const [isUserInvalid, setIsUserInvalid] = useState(false);
    const { isLoggedinToTrue } = useAuthContext();
    const [passwordMessage, setPasswordMessage] = useState("password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters");
    const [passwordType, setPasswordType] = useState("password");

    const handleSubmit = async (e) => {
    e.preventDefault();
    if(userDetails.password !== userDetails.verify) {
        setPasswordMessage(`Password doesn't match. \n Password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters`)
        setUserDetails({...userDetails, password: '', verify: ''} )
        return
    }
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userDetails.email,
            password: userDetails.password,
            username: userDetails.identifier,
          }),
          method: 'POST',
        }
      );
      setToken(responseData);
      setIsUserInvalid(false)
      Router.push('/login');
    } catch (error) {
      console.error(error);
      setIsUserInvalid(false)
    }
  };

    const showPassword = (e) => {
        if(e.currentTarget.checked) {
            setPasswordType("text")
        }else {
            setPasswordType("password")
        }
    };

  if(!isUserInvalid) {
    return (
        <section className='flex flex-col items-center mb-10'>
            <h2 className='font-medium mb-3'>REGISTER</h2>
            <form 
                className='flex flex-col items-center justify-center w-72 bg-veryLightGrey py-4 px-2 rounded sm:w-96 md:w-[550px]'
                onSubmit={handleSubmit}
            >
                <input 
                    className='outline-none border-2 w-full py-1 px-2 mb-4 sm:w-86 md:w-[480px]'
                    type="text"
                    name='identifier'
                    autoComplete="off"
                    required
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({...userDetails, [e.target.name]: e.target.value})}
                    placeholder='Enter your name'
                />
                <input 
                    className='outline-none border-2 w-full py-1 px-2 mb-4 sm:w-86 md:w-[480px]'
                    name='email'
                    type='email'
                    autoComplete="off"
                    required
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({...userDetails, [e.target.name]: e.target.value})}
                    placeholder='Enter your email'
                />
                <input 
                    className='outline-none border-2 w-full py-1 px-2 mb-4 sm:w-86 md:w-[480px]'
                    name="password"
                    minLength="8" 
                    required
                    type={passwordType}
                    autoComplete="off"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
                    value={userDetails.password}
                    onChange={(e) => setUserDetails({...userDetails, [e.target.name]: e.target.value})}
                    placeholder='Enter a valid password'
                />
                <input 
                    className='outline-none border-2 w-full py-1 px-2 mb-4 sm:w-86 md:w-[480px]'
                    name='verify'
                    minLength="8" 
                    required
                    autoComplete="off"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    type={passwordType}
                    value={userDetails.verify}
                    onChange={(e) => setUserDetails({...userDetails, [e.target.name]: e.target.value})}
                    placeholder='Enter a valid password'
                />
                <div className='w-full flex items-center mb-7 text-deepBlue'>
                    <input 
                        type='checkbox'
                        name='showPassword'
                        className='mr-3 bg-white opacity-100'
                        onClick={(e) => showPassword(e)}
                    />
                    <span>show password</span>
                </div>
                <button 
                    type='submit'
                    className='bg-deepBlue text-veryLightGrey w-56 py-1 rounded-md xl:hover:scale-110'
                >
                    Register
                </button>
                <p className='px-4 text-red-500 mt-2'>{passwordMessage}</p>
                <Link href='/login'>
                    <a className='mt-3 hover:border-b hover:border-deepBlue text-[20px] text-deepBlue'>
                        click here to login instead
                    </a>
                </Link>
            </form>
        </section>
    )
  };

    if(isUserInvalid) {
        return (
            <section
                className='mx-auto w-screen flex flex-col items-center justify-center px-2 bg-veryLightGrey py-4 rounded sm:w-96 md:w-[550px] mb-7'
            >
                <p className='mb-9 text-red-500 text-center'>Please try again with another username or login if you are already.</p>
                <div className='flex'>
                    <button 
                        type='submit'
                        className='bg-deepBlue text-veryLightGrey w-32 py-1 rounded-md xl:hover:scale-110 mx-3'
                        onClick={() => setIsUserInvalid(false)}
                    >
                        Login
                    </button>
                    <button 
                        type='submit'
                        className='bg-deepBlue text-veryLightGrey w-28 py-1 rounded-md xl:hover:scale-110 mx-3'
                        onClick={() => Router.push('/register')}
                    >
                        Register
                    </button>
                </div>

            </section>
        )
    };
}