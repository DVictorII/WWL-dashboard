import React,{useEffect} from "react";

import { fetchPiezometerData } from "../../utils/map";
import { FadeLoader } from "react-spinners";
import { useQuery } from "react-query";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";
import { useSectionImgStore } from "../../store/sectionImgStore";
import { useLocation } from "react-router-dom";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import FullScreenButton from "../PiezometerLectures/FullScreenButton";

function ReportSectionImg({paddock, piezo}:{paddock:string, piezo:string}) {
    const location = useLocation().pathname
    const openSectionImg = useSectionImgStore((s) => s.openSectionImg);
  
    const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery({
      queryKey: [`Onepiezometer_${paddock}_${piezo}`],
      queryFn: () =>
        fetchPiezometerData({
          paddock: paddock,
          piezo: piezo,
        }),
      enabled: !!paddock,
      refetchOnWindowFocus: false,
    });

    // useEffect(()=>{
    //   console.log("PIEZO DATA2",piezometersData)
    // },[piezometersData])
  
    if(piezometersAreLoading || !piezometersData || piezometersData.length === 0) return (
      <div className="w-full h-full flex items-center justify-center">
                <FadeLoader
                  color="#BD9C45"
                  loading={piezometersAreLoading}
                  radius={50}
                />
      </div>
    )
  
  
    return (
      <div className="flex flex-col gap-y-4 self-center">
              
                {piezometersData[0].section &&  piezometersData[0].section != "?" ? (
                  <>
                    <img
                      className="cursor-pointer rounded-[12px]"
                      onClick={() =>
                        openSectionImg(
                          `/media/img/sections/${piezometersData[0].section}.png`
                        )
                      }
                      src={`/media/img/sections/${piezometersData[0].section}.png`}
                    />
  
                    <FullScreenButton />   
                  </>
                ) : (
                  <div className="flex justify-center items-center h-32 bg-[#f5f5f5] rounded-xl font-semibold">
                    Piezometer don't belong to any section
                  </div>
                )}
             
            
        
      </div>
    );
}

export default ReportSectionImg