import React,{useEffect} from 'react'
//@ts-ignore
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import {BsChevronLeft} from "react-icons/bs"


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import ReportCard from '../Reports/ReportCard';





function SliderComp() {

    
    

  return (
    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={30}
    slidesPerView="auto"
    // centeredSlides={true}
    navigation
    // pagination={{ clickable: true }}
    className='w-full  '
   
    // onSwiper={(swiper) => console.log(swiper)}
    // onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide style={{
        width:"16rem"
      }} >
        <ReportCard/>
      </SwiperSlide>
      <SwiperSlide style={{
        width:"16rem"
      }} ><ReportCard/></SwiperSlide>
      <SwiperSlide style={{
        width:"16rem"
      }} ><ReportCard/></SwiperSlide>
      <SwiperSlide style={{
        width:"16rem"
      }}><ReportCard/></SwiperSlide>
      
      
    </Swiper>
  )
}

export default SliderComp