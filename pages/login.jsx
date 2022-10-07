import { useState } from 'react';
import { useAuthContext } from '../lib/authContext';
import { fetcher } from '../lib/api';
import { setToken} from '../lib/auth';
import Link from 'next/link';
import Router from 'next/router';

export default function Login() {
    const [userDetails, setUserDetails] = useState({identifier: '', email: '', password: ''});
    const [setIsResponsedata] = useState(false);
    const [isUserInvalid, setIsUserInvalid] = useState(false);
    const { isUserLoggedinToTrue } = useAuthContext();
    const [passwordMessage] = useState("password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters");
    const [passwordType, setPasswordType] = useState("password");
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const responseData = await fetcher(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: userDetails.identifier,
                    password: userDetails.password,
                }),
            }
        );
        if(responseData.user) {
            setToken(responseData)
            isUserLoggedinToTrue()
            setIsResponsedata(true)
            Router.push('/')
        } else {
            setUserDetails({identifier: '', email: '', password: ''})
            setIsUserInvalid(true)
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
                <h2 className='font-medium mb-3 mt-2 text-center'>LOGIN WITH YOUR REGISTERED DETAILS</h2>
                <form 
                    onSubmit={handleSubmit}
                    className='flex flex-col items-center justify-center bg-veryLightGrey py-4 px-4 rounded w-full sm:w-96 sm:px-4 md:w-[550px]'
                >
                    <input 
                        className='outline-none border-2 w-full py-1 px-2 mb-4 sm:w-86 md:w-[480px]'
                        type="text"
                        name='identifier'
                        required
                        autoComplete="off"
                        value={userDetails.name}
                        onChange={(e) => setUserDetails({...userDetails, [e.target.name]: e.    target.value})}
                        placeholder='Enter your name'
                    />
                    <input 
                        className='outline-none border-2 w-full py-1 px-2 mb-4 sm:w-86 md:w-[480px]'
                        name='password'
                        minLength="8" 
                        required
                        autoComplete="off"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one number and one uppercase and   lowercase letter, and at least 8 or more characters"
                        type={passwordType}
                        value={userDetails.password}
                        onChange={(e) => setUserDetails({...userDetails, [e.target.name]: e.    target.value})}
                        placeholder='Enter a valid password'
                    />
                    <div className='w-full flex items-center mb-4 text-deepBlue sm:w-86 md:w-[480px]'>
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
                        className='bg-deepBlue text-veryLightGrey w-56 py-1 rounded-md  xl:hover:scale-110'
                    >
                        Login
                    </button>
                    <p className='px-4 text-red-500 mt-2 text-center'>{passwordMessage}</p>
                    <Link href='/register'>
                        <a className='mt-3 hover:border-b hover:border-deepBlue '>
                            click here to register instead
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
                <p className='mb-9 text-red-500 text-center'>User not found. Please enter correct user details or register.</p>
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