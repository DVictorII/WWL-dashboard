import React from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function LecturesMap() {
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_KEY as string,
  // });

  // if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      {/* <GoogleMap
        zoom={16}
        center={{ lat: -12.061548, lng: -77.037391 }}
        mapContainerClassName="w-full h-full"
      >
        <Marker position={{ lat: -12.061548, lng: -77.037391 }} />
      </GoogleMap> */}
    </div>
  );
}

export default LecturesMap;
