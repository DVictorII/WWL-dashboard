import React from "react";

interface MapTypeSelectionProps {
  changeMapType: (type: string) => void;
  mapType: string;
}

function MapTypeSelection({ changeMapType, mapType }: MapTypeSelectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeMapType(e.target.value);
  };

  return (
    <select
      name="mapType"
      id="mapType"
      value={mapType}
      className="px-6 py-3 rounded-[14px] font-medium text-lg 2xl:text-2xl border-2 border-bluePrimary focus:border-orangeSecondary"
      onChange={handleChange}
    >
      <option value="piezometers">Piezometers</option>
      <option value="incidents">Incidents</option>
    </select>
  );
}

export default MapTypeSelection;
