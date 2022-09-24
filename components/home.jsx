import Categories from './categories'
import TopSection from './topSection'
import NewProduct from './newProducts'
import TwoItemsSection from './twoItemsSection'
import Studio from './studio'
import BookAppointment from './bookAppointment'
import JoinUs from './joinUs'

const HomePage = () => {

    return <>
        <TopSection />
        <NewProduct />
        <section className='lg:flex my-7'>
            <Categories />
            <TwoItemsSection />
        </section>
        <section className='mt-14 sm:block md:flex md:mx-14'>
            <Studio
                title='STUDIO'
            />
            <BookAppointment />
        </section>
        <JoinUs />
    </>
}

export default HomePage