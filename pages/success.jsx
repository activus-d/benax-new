import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

export default function success() {

    return (
        <section className='h-40 bg-veryLightGrey flex justify-center items-center text-green text-2xl font-medium'>
            <p>Congratulations your purchase was successful</p>
        </section>
    )
}