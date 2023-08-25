import "aframe";
import { img360Data } from "../../utils/img360Data";
import { useBiannualVisitStateStore } from "../../store/BiannualVisitStateStore";
import { s3StaticFilesLinks } from "../../utils/globalLinks";

function MediaPlayer() {
  const mediaID = useBiannualVisitStateStore((state) => state.mediaID);

  const data = img360Data.find((d) => d.id === Number(mediaID));

  return (
    <div className="w-full h-[50vh]   ">
      {location.pathname.startsWith("/operations/biannual-visits") ? (
        <a className="block photo360 w-full h-full rounded-xl overflow-hidden">
          {/* @ts-ignore */}
          <a-scene embedded>
            {/* @ts-ignore */}

            <a-assets>
              <video
                crossOrigin="anonymous"
                id="video"
                src={`https://rossing.s3.ap-southeast-2.amazonaws.com/biannual_visits/${
                  data?.type === "photo" ? "img" : "video"
                }_${data?.id}.${data?.type === "photo" ? "jpg" : "mp4"}`}
              />
              <img
                id="media"
                crossOrigin="anonymous"
                src={`https://rossing.s3.ap-southeast-2.amazonaws.com/biannual_visits/${
                  data?.type === "photo" ? "img" : "video"
                }_${data?.id}.${data?.type === "photo" ? "jpg" : "mp4"}`}
              />
              {/* @ts-ignore */}
            </a-assets>
            {/* @ts-ignore */}
            <a-sky src={`${data?.type === "photo" ? "#media" : "#video"}`}>
              {/* @ts-ignore */}
            </a-sky>
            {/* <a-sky src="IMG_20220502_094531_00_369.jpg"></a-sky> */}
            {/* @ts-ignore */}
          </a-scene>
        </a>
      ) : null}
    </div>
  );
}

export default MediaPlayer;
