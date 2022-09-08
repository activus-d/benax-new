import React, {useState, useRef} from 'react'
import { RiArrowLeftCircleFill } from 'react-icons/ri'
import { RiArrowRightCircleFill } from 'react-icons/ri'
// import { useGlobalContext } from '../components/context'
import { studioPhotos } from './data'

export default function Studio() {
    // const {studioPhotos} = useGlobalContext()
    const [photos, setPhotos] = useState([studioPhotos[0]])
    const [isNext, setIsNext] = useState(true)
    const [isPrev, setIsPrev] = useState(false)
    const mySlides = useRef(null)

    const handlePrev = () => {
        const id = mySlides.current.dataset.id
        console.log(id + 'p')
        if(id != 1) {
            const photoToDislay = studioPhotos.filter((photo) => photo.id === +id - 1)
            setPhotos(photoToDislay)
            setIsNext(true)
        }
        if(id == 2) {
            setIsPrev(false)
        }
        
    };
    const handleNext = () => {
        const id = mySlides.current.dataset.id
        console.log(id + 'n')
        if(id <= studioPhotos.length) {
            if(id == studioPhotos.length - 1) {
                const photoToDislay = studioPhotos.filter((photo) => photo.id === +id + 1)
                console.log(photoToDislay, typeof id, 'n4')
                setPhotos(photoToDislay)
                setIsNext(false)
                setIsPrev(true)                
            }else if(id < studioPhotos.length) {
                const photoToDislay = studioPhotos.filter((photo) => photo.id === +id + 1)
                console.log(photoToDislay, typeof id, 'n0-3', isNext)
                setPhotos(photoToDislay)
                id !== studioPhotos.length ? setIsNext(true) : setIsNext(false)
                id !== 0 && setIsPrev(true)
            } 
        }
    };



    return (
        <section className='flex flex-col text-deepBlue md:w-1/2'>
            <h2 className='text-3xl mb-5 ml-5 md:ml-0'>STUDIO</h2>
            <div className="relative w-full">
                {photos.map(photo => {
                    const {id, src} = photo
                    return(
                        <div className="h-[500px] md:h-[500px] fade" key={id} data-id={id} ref={mySlides}>
                            <img 
                                src={src}
                                className="w-full h-full"
                            />
                        </div>
                    )
                })}
                <div className='absolute w-full top-[250px]'>
                {isPrev && <button className='absolute left-7 cursor-pointer arrowLeft' onClick={handlePrev}>
                    <RiArrowLeftCircleFill className='text-veryDeepBlue text-5xl bg-white rounded-full'/>
                </button>}
                {isNext && <button className='absolute right-7 cursor-pointer arrowRight' onClick={handleNext}>
                    <RiArrowRightCircleFill className='text-veryDeepBlue text-5xl bg-white rounded-full'/>
                </button>}
                </div>
            </div>
        </section>
    )
}