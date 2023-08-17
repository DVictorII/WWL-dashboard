import { useBiannualVisitStateStore } from "../../store/BiannualVisitStateStore";
import MediaPlayer from "./MediaPlayer";

function BVisitMediaPlayer() {
  const mediaID = useBiannualVisitStateStore((state) => state.mediaID);
  return (
    <div className=" md:py-8  flex flex-col gap-y-8 justify-between">
      <div className="flex flex-col gap-y-4">
        <h3 className="font-semibold text-[#555]">360° Media Player</h3>
        <p className="text-xs md:text-sm font-medium text-[#666]"></p>
      </div>

      <MediaPlayer key={mediaID} />
    </div>
  );
}

export default BVisitMediaPlayer;
