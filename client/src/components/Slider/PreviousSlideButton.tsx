import React from 'react'
import { BsChevronCompactLeft } from 'react-icons/bs'
import { useSwiper } from 'swiper/react'

function PreviousSlideButton() {
    const swiper = useSwiper()
  return (
    <button onClick={()=>swiper.slidePrev()} className='w-6  h-full bg-[#333] bg-opacity-40 absolute top-0 left-0 z-[10] flex items-center justify-center cursor-pointer'>
        <BsChevronCompactLeft className='w-4 h-4  text-white'/>
    </button>
  )
}

export default PreviousSlideButton