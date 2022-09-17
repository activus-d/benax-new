import { useState } from 'react'
import { useGlobalContext } from '../components/globalContext'

export default function Login() {
    const [userDetails, setUserDetails] = useState({name: '', email: ''})
    const { loginUser } = useGlobalContext()

    const handleSubmit = (e) => {
        e.preventDefault()
        loginUser(userDetails)
    }

    return (
        <section>
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                    placeholder='enter your name'
                />
                <input 
                    type='email'
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                    placeholder='enter you email'
                />
                <button type='submit'>Login</button>
            </form>
        </section>
    )
}