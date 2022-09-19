import { useState } from 'react'
import { useGlobalContext } from '../components/globalContext'
import { useAuthContext } from '../lib/authContext'
import { fetcher } from '../lib/api'
import { setToken, unsetToken } from '../lib/auth'

export default function Login() {
    const [userDetails, setUserDetails] = useState({identifier: '', email: '', password: ''})
    const { loginUser } = useGlobalContext()
    const { isLoggedin, isLoggedinToTrue } = useAuthContext()

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
        setToken(responseData)
        isLoggedinToTrue()
        // loginUser(userDetails)
    };



    return (
        <section className='flex flex-col items-center mb-10'>
            <h2 className='font-medium mb-3'>LOGIN WITH YOUR REGISTERED DETAILS</h2>
            <form 
                className='flex flex-col items-center justify-center w-72 bg-veryLightGrey py-4 rounded sm:w-96 md:w-[550px]'
            >
                <input 
                    className='outline-none border-2 w-full py-1 px-2 mb-4 sm:w-86 md:w-[480px]'
                    type="text"
                    name='identifier'
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({...userDetails, [e.target.name]: e.target.value})}
                    placeholder='enter your name'
                />
                <input 
                    className='outline-none border-2 w-full py-1 px-2 mb-4 sm:w-86 md:w-[480px]'
                    name='email'
                    type='email'
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({...userDetails, [e.target.name]: e.target.value})}
                    placeholder='enter your email'
                />
                <input 
                    className='outline-none border-2 w-full py-1 px-2 mb-4 sm:w-86 md:w-[480px]'
                    name='password'
                    minLength="8" 
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    type='password'
                    value={userDetails.password}
                    onChange={(e) => setUserDetails({...userDetails, [e.target.name]: e.target.value})}
                    placeholder='enter a valid password'
                />
                <button 
                    type='submit'
                    className='bg-deepBlue text-veryLightGrey w-56 py-1 rounded-md mb-4 xl:hover:scale-110'
                >
                    Login
                </button>
                <button 
                    type='submit'
                    className='bg-deepBlue text-veryLightGrey w-56 py-1 rounded-md xl:hover:scale-110'
                    onClick={handleSubmit}
                >
                    Register
                </button>
            </form>
        </section>
    )
}