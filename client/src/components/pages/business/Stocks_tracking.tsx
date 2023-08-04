import React from "react";
import MenuNavbar from "../../MenuNavbar";
import StockSelector from "../../business/stocks-tracking/StockSelector";
import StockHeaderInfo from "../../business/stocks-tracking/StockHeaderInfo";
import StockChartComp from "../../business/stocks-tracking/StockChartComp";
import StockNewsComp from "../../business/stocks-tracking/StockNewsComp";
import StockAvgAnnualReturn from "../../business/stocks-tracking/StockAvgAnnualReturn";
import StockInformationSummary from "../../business/stocks-tracking/StockInformationSummary";

function Stocks_tracking() {
  return (
    // <>
    //   <MenuNavbar />

    //   <div className="mt-12 md:hidden" />

    //   <div className="flex items-center justify-between gap-x-8 gap-y-6 flex-wrap bg-white  p-4 rounded-xl shadow-md shadow-[rgba(91,71,0,0.1)]   ">
    //     <h1 className="font-bold xl:text-lg ">
    //       <span className="text-[#b69000]">Business</span> - Stocks Tracking
    //     </h1>

    //     <StockSelector />
    //   </div>

    //   <div className="mt-6 " />

    //   <StockHeaderInfo />

    //   <div className="mt-6 " />

    //   <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-x-6  gap-y-6 ">
    //     <div className="flex flex-col 2xl:col-span-2  bg-white p-4 gap-y-4 rounded-xl shadow-md shadow-[rgba(91,71,0,0.1)]  ">
    //       <StockChartComp />
    //     </div>

    //     <div className="flex flex-col  bg-white p-4 gap-y-4 rounded-xl shadow-md shadow-[rgba(91,71,0,0.1)]  ">
    //       <StockNewsComp />
    //     </div>
    //   </div>
    // </>

    <>
      <MenuNavbar />

      <div className="mt-12 md:hidden" />

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-x-6  gap-y-6 ">
        <div className="flex flex-col gap-y-6 2xl:col-span-2">
          <div className="flex items-center justify-between gap-x-8 gap-y-6 flex-wrap bg-white  p-4 rounded-xl shadow-md shadow-[rgba(91,71,0,0.1)]   ">
            <h1 className="font-bold xl:text-lg ">
              <span className="text-[#b69000]">Business</span> - Stocks Tracking
            </h1>

            <StockSelector />
          </div>

          <StockHeaderInfo />
        </div>

        <div className="flex flex-col  bg-white p-4 gap-y-4 rounded-xl shadow-md shadow-[rgba(91,71,0,0.1)]  ">
          <StockNewsComp />
        </div>
      </div>

      <div className="mt-6 " />

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-x-6  gap-y-6 ">
        <div className="flex flex-col 2xl:col-span-2  bg-white p-4 gap-y-4 rounded-xl shadow-md shadow-[rgba(91,71,0,0.1)]  ">
          <StockChartComp />
        </div>

        <div className="flex flex-col  bg-white p-4 gap-y-4 rounded-xl shadow-md shadow-[rgba(91,71,0,0.1)]  ">
          <StockAvgAnnualReturn />
        </div>
      </div>

      <div className="mt-6 " />

      <div className="flex flex-col 2xl:col-span-2  bg-white p-4 gap-y-4 rounded-xl shadow-md shadow-[rgba(91,71,0,0.1)]  ">
        <StockInformationSummary />
      </div>
    </>
  );
}

export default Stocks_tracking;
