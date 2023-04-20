import React,{useEffect, useState} from 'react'
//@ts-ignore
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import {BsChevronLeft} from "react-icons/bs"


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import ReportCard from '../Reports/ReportCard';
import { usePageScreenSizeStore } from '../../store/pageScreenSizeStore';
import SlidesController from './SlidesController';
import PreviousSlideButton from './PreviousSlideButton';
import NextSlideButton from './NextSlideButton';





function SliderComp() {

  const screenSize = usePageScreenSizeStore((state)=>state.screenSize)  
  const changeScreenSize = usePageScreenSizeStore((state)=>state.changeScreenSize) 

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(()=>{
    changeScreenSize(window.innerWidth >= 768 ? "desktop":"mobile")
  },[])

  

  return (
    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={screenSize==="mobile" ? 24 : 26}
    slidesPerView="auto"
    className='w-full'

    onSlideChange={(s) => {
      console.log(s.slides)
      setActiveIndex(s.activeIndex)}}
    >

      <PreviousSlideButton/>
      
      <SwiperSlide style={{
        width:screenSize==="mobile" ? "12rem" : "14rem"
      }} >
        <ReportCard/>
      </SwiperSlide>
      <SwiperSlide style={{
        width:screenSize==="mobile" ? "12rem" : "14rem"
      }} ><ReportCard/></SwiperSlide>
      <SwiperSlide style={{
        width:screenSize==="mobile" ? "12rem" : "14rem"
      }} ><ReportCard/></SwiperSlide>
      <SwiperSlide style={{
        width:screenSize==="mobile" ? "12rem" : "14rem"
      }}><ReportCard/></SwiperSlide>
      <SwiperSlide style={{
        width:screenSize==="mobile" ? "12rem" : "14rem"
      }}><ReportCard/></SwiperSlide>
      <SwiperSlide style={{
        width:screenSize==="mobile" ? "12rem" : "14rem"
      }}><ReportCard/></SwiperSlide>
      <SwiperSlide style={{
        width:screenSize==="mobile" ? "12rem" : "14rem"
      }}><ReportCard/></SwiperSlide>
      
      <NextSlideButton/>
    </Swiper>
  )
}

export default SliderComp