import React from "react";
import FullScreenButton from "./FullScreenButton";
import { fetchPiezometerData } from "../../utils/map";
import { FadeLoader } from "react-spinners";
import { useQuery } from "react-query";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";
import { useSectionImgStore } from "../../store/sectionImgStore";

function SectionImg() {
  const paddock = usePiezometerLecturesStateStore((s) => s.paddock);
  const piezo = usePiezometerLecturesStateStore((s) => s.piezo);
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



  return (
    <div className="flex flex-col gap-y-4 self-center">
            
              {piezometersData[0].section ||  piezometersData[0].section !== "?" ? (
                <img
                  className="cursor-pointer rounded-[12px]"
                  onClick={() =>
                    openSectionImg(
                      `/img/sections/${piezometersData[0].section}.png`
                    )
                  }
                  src={`/img/sections/${piezometersData[0].section}.png`}
                />
              ) : (
                <div className="flex justify-center items-center py-10">
                  Piezometer don't belong to any section
                </div>
              )}
           
          
      <FullScreenButton />
    </div>
  );
}

export default SectionImg;
