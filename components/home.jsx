import React from 'react'
import Categories from './categories'
import TopSection from './topSection'
import NewProduct from './newProducts'
import TwoItemsSection from './twoItemsSection'
import Studio from './studio'
import BookAppointment from './bookAppointment'
import JoinUs from './joinUs'
import Cookies from 'js-cookie'
import { useAuthContext } from '../lib/authContext'


const HomePage = () => {
    const { isLoggedinToTrue } = useAuthContext()

    /**
     * check if user cookies is present
     * if user cookies is present then set isLoggedin to true
     */
    if(Cookies.get('username')) {
        isLoggedinToTrue()
    }

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