import { useGlobalContext } from "../components/globalContext";
import Link from 'next/link'

export default function Account() {
    const { user, logoutUser } = useGlobalContext()

    if(!user) {
        return (
            <section>
                <p>Please login or register</p>
                <Link href='/'>
                    <a>Go Back</a>
                </Link>
            </section>
        )
    }

    return (
        <section>
            <h2>ACCOUNT PAGE</h2>
            <a href='#'
               onClick={() => logoutUser()} 
            >
                Logout
            </a>
        </section>
    )
}