import { fetchPiezometerData } from "../../utils/map";
import { FadeLoader } from "react-spinners";
import { useQuery } from "react-query";

import { useSectionImgStore } from "../../store/sectionImgStore";
import { useLocation } from "react-router-dom";
import FullScreenButton from "../PiezometerLectures/FullScreenButton";
import Skeleton from "react-loading-skeleton";
import SkeletonSectionImg from "../Skeletons/PiezometerLectures/SkeletonSectionImg";

function ReportSectionImg({
  paddock,
  piezo,
}: {
  paddock: string;
  piezo: string;
}) {
  const location = useLocation().pathname;
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

  if (piezometersAreLoading || !piezometersData || piezometersData.length === 0)
    return <SkeletonSectionImg />;

  return (
    <div className="flex flex-col gap-y-4 self-center">
      {piezometersData[0].section && piezometersData[0].section != "?" ? (
        <>
          <img
            className=" rounded-[12px]"
            src={`/media/img/sections/${piezometersData[0].section}.png`}
          />

          <FullScreenButton
            comp="section"
            url={`/media/img/sections/${piezometersData[0].section}.png`}
          />
        </>
      ) : (
        <div className="flex justify-center items-center h-32 bg-[#f5f5f5] rounded-xl font-semibold">
          Piezometer don't belong to any section
        </div>
      )}
    </div>
  );
}

export default ReportSectionImg;
