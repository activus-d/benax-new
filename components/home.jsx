import Categories from './categories';
import TopSection from './topSection';
import NewProduct from './newProducts';
import TwoItemsSection from './benaxCollection';
import Studio from './studio';
import BookAppointment from './bookAppointment';
import BenaxCollection from './benaxCollection';
import JoinUs from './joinUs';

const HomePage = () => {

    return <>
        <TopSection />
        <NewProduct />
        <section className='lg:flex justify-between my-7'>
            <Categories />
            <BenaxCollection />
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