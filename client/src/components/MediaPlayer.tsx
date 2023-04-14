import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "aframe";
import { img360Data } from "../utils/img360Data";

function MediaPlayer() {
  const location = useLocation();

  const { id } = useParams();

  const data = img360Data.find((d) => d.id === Number(id));

  return (
    <div className="w-screen h-screen p-8">
      {location.pathname.startsWith("/player") ? (
        <a className="block photo360 w-full h-full rounded-[18px] overflow-hidden">
          {/* @ts-ignore */}
          <a-scene embedded>
            {/* @ts-ignore */}
            <a-sky
              src={`/static/img/${data?.type === "photo" ? "img" : "video"}_${
                data?.id
              }.${data?.type === "photo" ? "jpg" : "mp4"}`}

              //@ts-ignore
            ></a-sky>
            {/* <a-sky src="IMG_20220502_094531_00_369.jpg"></a-sky> */}
            {/* @ts-ignore */}
          </a-scene>
        </a>
      ) : null}
    </div>
  );
}

export default MediaPlayer;
