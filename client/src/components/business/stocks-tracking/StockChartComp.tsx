import React from "react";
import StockDateSpanSelector from "./StockDateSpanSelector";
import StockChart from "./StockChart";

function StockChartComp() {
  return (
    <div>
      <div className="md:px-8 lg:px-0 xl:px-4 2xl:px-8">
        <StockDateSpanSelector />
      </div>

      <StockChart />
    </div>
  );
}

export default StockChartComp;
