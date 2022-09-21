import React, { useEffect } from 'react'
import Categories from './categories'
import TopSection from './topSection'
import NewProduct from './newProducts'
import TwoItemsSection from './twoItemsSection'
import Studio from './studio'
import BookAppointment from './bookAppointment'
import JoinUs from './joinUs'

import { useAuthContext } from '../lib/authContext'
import { getUserFromLocalCookie } from '../lib/auth'

const HomePage = () => {
    const { isUserLoggedinToTrue, checkUserLoggedIn } = useAuthContext()


    /**
     * fetchUser
     * check if user cookies is present
     * if user cookies is present then set isLoggedin to true
     */
    useEffect( () => {
        const fetchUser = async () => {
            const jwtUser =  await getUserFromLocalCookie()
            const magicCheck= await checkUserLoggedIn()
            if(jwtUser !== undefined && magicCheck === true) {
                isUserLoggedinToTrue()
            }
            console.log(jwtUser, magicCheck)
        }
        
        fetchUser()
            .catch(err => console.log(err))
    }, []);

    return <>
        <TopSection />
        <NewProduct />
        <section className='lg:flex my-7'>
            <Categories />
            <TwoItemsSection />
        </section>
        <section className='mt-14 sm:block md:flex md:mx-14'>
            <Studio />
            <BookAppointment />
        </section>
        <JoinUs />
    </>
}

export default HomePage