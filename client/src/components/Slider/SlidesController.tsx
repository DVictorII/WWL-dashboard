import React,{useEffect} from 'react'
import { useSwiper, useSwiperSlide } from 'swiper/react'

function SlidesController() {
    const swiper = useSwiper()

    // useEffect(()=>{
    //     console.log(swiper)

    // },[swiper])

  return (
    <div className='absolute top-0 right-0 z-[20]'>{swiper.activeIndex}</div>
  )
}

export default SlidesController