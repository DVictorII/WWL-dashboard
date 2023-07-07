import VisitMap from "./VisitMap";
import { img360Data } from "../../utils/img360Data";

function BVisitMapShowcase() {
  return (
    <div className=" md:py-8 rounded-[14px] flex flex-col gap-y-8 ">
      <div className="flex flex-col gap-y-4">
        <h3 className="text-sm md:text-base font-bold">Media Showcase map</h3>
        <p className="text-xs md:text-sm font-medium text-[#666]">
          Use the interactive map below to visualize the media collected during
          the visit
        </p>
      </div>
      <div className="flex justify-center">
        <VisitMap media={img360Data} />
      </div>
    </div>
  );
}

export default BVisitMapShowcase;
