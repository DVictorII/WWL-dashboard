import React from "react";
import FullScreenButton from "./FullScreenButton";
import { fetchPiezometerData } from "../../utils/map";
import { FadeLoader } from "react-spinners";
import { useQuery } from "react-query";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";
import { useSectionImgStore } from "../../store/sectionImgStore";
import { useLocation } from "react-router-dom";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";

function SectionImg() {
  const location = useLocation().pathname

  const paddock = location === "/piezometer-lectures" ? usePiezometerLecturesStateStore((s) => s.paddock):  useNewPiezoReportStateStore((state) => state.paddock);
  const piezo =  location === "/piezometer-lectures" ? usePiezometerLecturesStateStore((s) => s.piezo):  useNewPiezoReportStateStore((state) => state.piezo);
  const openSectionImg = useSectionImgStore((s) => s.openSectionImg);

  const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery({
    queryKey: [`Onepiezometer_${paddock}_${piezo}`],
    queryFn: () =>
      fetchPiezometerData({
        paddock: paddock,
        piezo: piezo,
      }),
    refetchOnWindowFocus: false,
  });

  if(piezometersAreLoading || !piezometersData || piezometersData.length === 0) return (
    <div className="w-full h-full flex items-center justify-center">
              <FadeLoader
                color="#BD9C45"
                loading={piezometersAreLoading}
                radius={50}
              />
    </div>
  )

  console.log()


  return (
    <div className="flex flex-col gap-y-4 self-center">
            
              {piezometersData[0].section &&  piezometersData[0].section != "?" ? (
                <>
                  <img
                    className="cursor-pointer rounded-[12px]"
                    onClick={() =>
                      openSectionImg(
                        `/media/img/sections/${piezometersData[0].section}.${"svg"||"png"}`
                      )
                    }
                    src={`/media/img/sections/${piezometersData[0].section}.${"svg"||"png"}`}
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

export default SectionImg;
