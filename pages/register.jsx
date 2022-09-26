import { useState, useRef, useEffect } from 'react';
import Router from 'next/router';

import { useAuthContext } from '../lib/authContext';
import { fetcher } from '../lib/api';
import { setToken } from '../lib/auth';
import Link from 'next/link';

export default function Register() {
    const [userDetails, setUserDetails] = useState({username: '', email: '', password: '', verify: ''});
    const [isUserInvalid, setIsUserInvalid] = useState(false);
    const { isUserLoggedinToTrue} = useAuthContext();
    const [userMessage, setUserMessage] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const passwordRef = useRef()
    const message = useRef(null)
    const letter = useRef(null)
    const capital = useRef(null)
    const number = useRef(null)
    const length = useRef(null)

    useEffect(() => {
        passwordRef.current.addEventListener('focus', showInstruction)
    }, []);
    useEffect(() => {
        passwordRef.current.addEventListener('blur', hideInstruction)
    }, []);
    useEffect(() => {
        passwordRef.current.addEventListener('input', handlePassword)
    }, []);

    const showInstruction = () => {
        message.current.style.display = "block";
    };

    const hideInstruction = () => {
        if(window.innerWidth <= 600) {
            console.log('b')
            message.current.style.display = "block";
        }else {
            message.current.style.display = "none";
        }
    };

    const handlePassword = () => {
        // Validate lowercase letters
        const lowerCaseLetters = /[a-z]/g;
        if(passwordRef.current.value.match(lowerCaseLetters)) {  
          letter.current.classList.remove("invalid");
          letter.current.classList.add("valid");
        } else {
          letter.current.classList.remove("valid");
          letter.current.classList.add("invalid");
        }

        // Validate capital letters
        const upperCaseLetters = /[A-Z]/g;
        if(passwordRef.current.value.match(upperCaseLetters)) {  
          capital.current.classList.remove("invalid");
          capital.current.classList.add("valid");
        } else {
          capital.current.classList.remove("valid");
          capital.current.classList.add("invalid");
        }       
        // Validate numbers
        const numbers = /[0-9]/g;
        if(passwordRef.current.value.match(numbers)) {  
          number.current.classList.remove("invalid");
          number.current.classList.add("valid");
        } else {
          number.current.classList.remove("valid");
          number.current.classList.add("invalid");
        }

        // Validate length
        if(passwordRef.current.value.length >= 8) {
          length.current.classList.remove("invalid");
          length.current.classList.add("valid");
        } else {
          length.current.classList.remove("valid");
          length.current.classList.add("invalid");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userDetails.password !== userDetails.verify) {
            setUserMessage('confirmation password is wrong')
            setUserDetails({...userDetails, password: '', verify: ''} )
            return
        }
        else {
            fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: userDetails.email,
                    password: userDetails.password,
                    username: userDetails.username,
                  }),
                  method: 'POST',
                })
                .then(response => {
                    if(response.status === 400) {
                        setUserDetails({username: '', email: '', password: '', verify: ''})
                        setBadRequest(true)
                        setIsUserInvalid(true)
                    }else {
                        setToken(response);
                        console.log(response)
                        setIsUserInvalid(false)
                        isUserLoggedinToTrue()
                        Router.push('/')
                    }
                })
                .catch(err => {
                    console.log(err)
                    setIsUserInvalid(false)
                })
        }
    } 

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
                <p className='px-4 text-red-500 mt-2'>{userMessage}</p>
                <input 
                    className='outline-none border-2 w-full py-1 px-2 mb-4 sm:w-86 md:w-[480px]'
                    type="text"
                    name='username'
                    autoComplete="off"
                    required
                    value={userDetails.name}
                    onChange={(e) => {
                        setUserDetails({...userDetails, [e.target.name]: e.target.value})
                        if(e.target.value.length < 3) {
                            setUserMessage(`username must be three words or more`)
                        }else {
                            setUserMessage('')
                        }
                    }}
                    placeholder='Enter your username'
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
                    ref={passwordRef}
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
                    placeholder='Confirm password'
                />
                <div className='w-full flex items-center mb-4 text-deepBlue px-7'>
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
                    className='bg-deepBlue text-veryLightGrey w-56 py-1 mb-4 rounded-md xl:hover:scale-110'
                >
                    Register
                </button>
                <div ref={message} id="message">
                    <h3>Password must contain the following:</h3>
                    <p ref={letter} id="letter" className="invalid">A <b>lowercase</b> letter</p>
                    <p ref={capital} id="capital" className="invalid">A <b>uppercase</b> letter</p>
                    <p ref={number} id="number" className="invalid">A <b>number</b></p>
                    <p ref={length} id="length" className="invalid">Minimum <b>8 characters</b></p>
                </div>
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
                <p className='mb-9 text-red-500 text-center'>Please try again with another username or login if you are already registered.</p>
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
                        onClick={() => setIsUserInvalid(false)}
                    >
                        Register
                    </button>
                </div>

            </section>
        )
    };
}