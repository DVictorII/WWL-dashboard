import React from 'react'
import { BsChevronCompactRight } from 'react-icons/bs'
import { useSwiper } from 'swiper/react'

function NextSlideButton() {
    const swiper = useSwiper()

  return (
    <button onClick={()=>swiper.slideNext()} className='w-6  h-full bg-[#333] bg-opacity-40 absolute top-0 right-0 z-[10] flex items-center justify-center cursor-pointer'>
        <BsChevronCompactRight className='w-4 h-4  text-white'/>
    </button>
  )
}

export default NextSlideButton