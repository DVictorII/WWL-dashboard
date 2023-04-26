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
import { IncidentDetails, ReportDetails } from '../../types';
import IncidentReportCard from '../Incidents/IncidentReportCard';





function IncidentsSliderComp({incidents}:{incidents:IncidentDetails[]}) {

  const screenSize = usePageScreenSizeStore((state)=>state.screenSize)  
  const changeScreenSize = usePageScreenSizeStore((state)=>state.changeScreenSize) 

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(()=>{
    changeScreenSize(window.innerWidth >= 768 ? "desktop":"mobile")
  },[])

  

  return incidents.length >0 ?(
    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={screenSize==="mobile" ? 24 : 26}
    slidesPerView="auto"
    className='w-full'

    onSlideChange={(s) => {
      setActiveIndex(s.activeIndex)}}
    >

      <PreviousSlideButton/>

      {
        incidents.map(incident=>(
          <SwiperSlide style={{
            width:screenSize==="mobile" ? "12rem" : "14rem"
          }} key={incident.incident_id}>
            <IncidentReportCard incident={incident}/>
          </SwiperSlide>
        ))
      }
      
      <NextSlideButton/>
    </Swiper>
  ) : null
}

export default IncidentsSliderComp