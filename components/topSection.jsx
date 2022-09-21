import React, {useRef, useEffect, useState, Children} from 'react'
import {BsArrowDown} from 'react-icons/bs'
import Link from 'next/link'

export default function TopSection() {
    const [slideIndex, setSlideIndex] = useState(0)
    const mySlides = useRef(null)
    const myDots = useRef(null)
    
    useEffect(() => {
        const interval = setInterval(() => {
            const slides = Array.from(mySlides.current.children)
            const dots = Array.from(myDots.current.children)
            slides.forEach(element => element.style.display = "none")
            dots.forEach(element=> element.classList.remove('active'))
            setSlideIndex((prevValue) => {
                return prevValue + 1
            })
            
            if (slideIndex === slides.length) {setSlideIndex(1)}
            if(slideIndex !== 0) {
                const displaySlideArr = slides.filter((element, index) => index == slideIndex - 1)
                const [displaySlide] = displaySlideArr
                displaySlide.style.display = "block"
                const pointerDotArr = dots.filter((element, index) => index == slideIndex - 1)
                const [pointerDot] = pointerDotArr
                pointerDot.classList.add('active')
            }
        }, 2500)
        return () => {
            clearInterval(interval)
        }
    }, [mySlides, slideIndex] )
    

    return (
        <section className="relative flex justify-center bg-100% mt-[-10px] text-veryDeepBlue h-[500px] md:h-[500px]">
            <div className="relative w-screen" ref={mySlides}>
                <div className="top-0 w-full h-[500px] md:h-[500px] fade">
                    <img 
                        src="assets/image12.jpg"
                        className="w-full h-full"
                    />
                </div>
                <div className="hidden top-0 w-full h-[500px] md:h-[500px] fade">
                    <img 
                        src="assets/image13.jpg"
                        className="w-full h-full hidden md:block"
                    />
                    <img 
                        src="assets/mobileTry.jpg"
                        className="w-full h-full md:hidden"
                    />
                </div>
                <div className="hidden top-0 w-full h-[500px] md:h-[500px] fade">
                    <img 
                        src="assets/image14.jpg"
                        className="w-full h-full"
                    />
                </div>
                <div className="hidden top-0 w-full h-[500px] md:h-[500px] fade">
                    <img 
                        src="assets/image15.jpg"
                        className="w-full h-full"
                    />
                </div>
            </div>
            <div className='slideDots absolute bottom-5 flex' ref={myDots}>
                <div className="dot h-7 w-7 mr-2 rounded-full bg-lightGrey transition ease-in duration-[600ms]"></div> 
                <div className="dot h-7 w-7 mr-2 rounded-full bg-lightGrey transition ease-in duration-[600ms]"></div> 
                <div className="dot h-7 w-7 mr-2 rounded-full bg-lightGrey transition ease-in duration-[600ms]"></div>
                <div className="dot h-7 w-7 mr-2 rounded-full bg-lightGrey transition ease-in duration-[600ms]"></div>
            </div>
           <div className='absolute top-[150px]'>
             <h1 className='text-2xl mb-5 font-bold md:text-5xl sm:text-4xl'>
                STUDIO COLLECTION
            </h1>
            <div className='flex flex-col items-center'>
                <h2 className='pr-10 text-xl font-bold sm:text-2xl'>
                    SHOP NOW
                </h2>
                <Link href='#categories'>
                    <a>
                        <BsArrowDown className='text-6xl mt-7 arrowDown'/>
                    </a>
                </Link>
            </div>
           </div>
        </section>
    )
}