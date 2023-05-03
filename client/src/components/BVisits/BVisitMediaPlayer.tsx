import { useBiannualVisitStateStore } from '../../store/BiannualVisitStateStore'
import MediaPlayer from './MediaPlayer'

function BVisitMediaPlayer() {
  const mediaID = useBiannualVisitStateStore((state)=>state.mediaID)
  return (
    <div className=" md:py-8 rounded-[14px] flex flex-col gap-y-4 ">
      <div className="flex flex-col gap-y-4">
        <h3 className="text-sm md:text-base font-bold">
          Media Showcase map {mediaID}
        </h3>
        <p className="text-xs md:text-sm font-medium text-[#555]">
          Use the interactive map below to visualize the media collected during
          the visit
        </p>
      </div>
      
      <MediaPlayer key={mediaID}  />
    </div>
  )
}

export default BVisitMediaPlayer