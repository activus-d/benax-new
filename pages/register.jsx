import { useState } from 'react'
import { useGlobalContext } from '../components/globalContext'
import { useAuthContext } from '../lib/authContext'
import { fetcher } from '../lib/api'
import { setToken, unsetToken } from '../lib/auth'
import Link from 'next/link'

export default function Register() {
    const [userDetails, setUserDetails] = useState({identifier: '', email: '', password: ''})
    const { isLoggedin, isLoggedinToTrue } = useAuthContext()

    const handleSubmit = async (e) => {
    e.preventDefault();
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
      router.redirect('/');
    } catch (error) {
      console.error(error);
    }
  };



    return (
        <section className='flex flex-col items-center mb-10'>
            <h2 className='font-medium mb-3'>REGISTER</h2>
            <form 
                className='flex flex-col items-center justify-center w-72 bg-veryLightGrey py-4 rounded sm:w-96 md:w-[550px]'
            >
                <input 
                    className='outline-none border-2 w-full py-1 px-2 mb-4 sm:w-86 md:w-[480px]'
                    type="text"
                    name='identifier'
                    autocomplete="off"
                    required
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({...userDetails, [e.target.name]: e.target.value})}
                    placeholder='Enter your name'
                />
                <input 
                    className='outline-none border-2 w-full py-1 px-2 mb-4 sm:w-86 md:w-[480px]'
                    name='email'
                    type='email'
                    autocomplete="off"
                    required
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({...userDetails, [e.target.name]: e.target.value})}
                    placeholder='Enter your email'
                />
                <input 
                    className='outline-none border-2 w-full py-1 px-2 mb-4 sm:w-86 md:w-[480px]'
                    name='password'
                    minLength="8" 
                    required
                    autocomplete="off"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    type='password'
                    value={userDetails.password}
                    onChange={(e) => setUserDetails({...userDetails, [e.target.name]: e.target.value})}
                    placeholder='Enter a valid password'
                />
                <button 
                    type='submit'
                    className='bg-deepBlue text-veryLightGrey w-56 py-1 rounded-md xl:hover:scale-110'
                    onClick={handleSubmit}
                >
                    Register
                </button>
                <Link href='/login'>
                    <a className='mt-3 hover:border-b hover:border-deepBlue '>
                        click here to login instead
                    </a>
                </Link>
            </form>
        </section>
    )
}