import React from "react";

interface ChartTypeSelectionProps {
  changeChartType: (type: string) => void;
}

function ChartTypeSelection({ changeChartType }: ChartTypeSelectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeChartType(e.target.value);
  };

  return (
    <select
      name="chartType"
      id="chartType"
      className="px-6 py-3 rounded-[14px] font-medium text-lg 2xl:text-2xl border-2 border-bluePrimary focus:border-orangeSecondary"
      onChange={handleChange}
    >
      <option value="pressure">Pressure</option>
      <option value="elevation">Elevation</option>
    </select>
  );
}

export default ChartTypeSelection;
