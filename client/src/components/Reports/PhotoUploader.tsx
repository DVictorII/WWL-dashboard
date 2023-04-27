import React, { useEffect } from "react";
import { AiOutlineCamera, AiOutlineCloudUpload } from "react-icons/ai";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import { BsTrash } from "react-icons/bs";

function PhotoUploader() {
  const photo = useNewPiezoReportStateStore((state) => state.photo);
  const uploadPhoto = useNewPiezoReportStateStore((state) => state.uploadPhoto);
  const deletePhoto = useNewPiezoReportStateStore((state) => state.deletePhoto);

  useEffect(() => {
    console.log("PHOTO");
    console.log(photo);
  }, [photo]);

  return (
    <div className="flex flex-col items-center gap-y-4">
      <div
        className="bg-[#f5f5f5] border border-[#dfdfdf]  shadow-sm w-full sm:w-3/4 lg:w-1/2 min-h-[10rem] md:min-h-[12rem] 2xl:min-h-[14rem] max-h-[20rem]   rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
        //@ts-ignore
        onClick={() => document.querySelector(".photo-upload").click()}
      >
        {photo ? (
          <img
            src={URL.createObjectURL(photo as Blob | MediaSource)}
            alt={URL.createObjectURL(photo as Blob | MediaSource)}
            className="object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-y-2">
            <AiOutlineCamera className="w-6 h-6 md:w-7 md:h-7" />
            <span className="font-semibold md:text-xl">Upload Photo</span>
            
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          name="photo"
          id="photo"
          onChange={({ target: { files } }) => {
            if (files !== null && files[0] !== null) {
              const file = files[0];
              uploadPhoto(file);
            }
          }}
          className="photo-upload"
          hidden
        />
      </div>

      <div className="w-full sm:w-3/4 lg:w-1/2  rounded-lg  flex items-center justify-end py-2 px-4 bg-[#f5f5f5] border border-[#dfdfdf] ">
        <div className="flex items-center gap-x-4">
          <span className="text-xs font-semibold">
            {
              //@ts-ignore
              photo ? photo.name : "No selected file -"
            }
          </span>

          {
            photo ? (
              <div>      
                  <BsTrash className="text-damaged-dark w-4 h-4 cursor-pointer" onClick={deletePhoto}/>
              </div>
            ):(
              <div>
                {/* @ts-ignore */}
                <AiOutlineCloudUpload className="text-active-dark w-4 h-4 cursor-pointer" onClick={() => document.querySelector(".photo-upload").click()}/>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default PhotoUploader;
