import React from 'react'
import Categories from '../components/categories'
import TopSection from '../components/topSection'
import NewProduct from '../components/newProducts'
import TwoItemsSection from '../components/twoItemsSection'
import Studio from '../components/studio'
import BookAppointment from '../components/bookAppointment'
import JoinUs from '../components/joinUs'

const homePage = () => {
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

export default homePage