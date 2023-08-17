import React from "react";
import MenuNavbar from "../../MenuNavbar";

import StockHeaderInfo from "../../business/stocks-tracking/StockHeaderInfo";
import StockChartComp from "../../business/stocks-tracking/StockChartComp";
import StockNewsComp from "../../business/stocks-tracking/StockNewsComp";

import StockInformationSummary from "../../business/stocks-tracking/StockInformationSummary";
import { useQuery } from "react-query";
import axios from "../../../utils/axios";
import UraniumStockInformation from "../../business/stocks-tracking/UraniumStockInformation";
import { useStockTrackingStateStore } from "../../../store/StockTrackingStateStore";

function Stocks_tracking() {
  const daysSpan = useStockTrackingStateStore((s) => s.daysSpan);

  const fetchBusinessHistory = async (
    stockCode: string,
    daysInterval: number
  ) => {
    const res = await axios.get(
      `/get_finance_stocks_${stockCode}-${daysInterval}`
    );

    return res.data;
  };

  const fetchFinanceCurrency = async (currencyName: string) => {
    const res = await axios.get(`/get_finance_currency_${currencyName}`);

    return res.data;
  };

  const { isLoading: stockInfoIsLoading, data: stockInfo } = useQuery(
    `stock_data-Rossing-7`,
    () => fetchBusinessHistory("601985.SS", 7),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: financeCurrencyIsLoading, data: financeCurrency } =
    useQuery(`finace-currency`, () => fetchFinanceCurrency("uranium"), {
      refetchOnWindowFocus: false,
    });

  if (stockInfoIsLoading || financeCurrencyIsLoading)
    return <h1>Loading...</h1>;

  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:hidden" />

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-x-6  gap-y-6 ">
        <div className="flex flex-col gap-y-6 2xl:col-span-2">
          <div className="flex items-center justify-between gap-x-8 gap-y-6 flex-wrap bg-white  p-4 rounded-xl shadow-sm   ">
            <h1 className="font-bold xl:text-lg ">
              <span className="text-[#477C9A]">Business</span> - Stocks Tracking
            </h1>

            {/* <StockSelector /> */}
          </div>

          <StockHeaderInfo data={stockInfo.data} />
        </div>

        <div className="flex flex-col  bg-white p-4 gap-y-4 rounded-xl shadow-sm  ">
          <StockNewsComp />
        </div>
      </div>

      <div className="mt-6 " />

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 lg:gap-x-6  gap-y-6 ">
        <div className="flex flex-col 2xl:col-span-2  bg-white p-4 gap-y-4 rounded-xl shadow-sm  ">
          <StockChartComp />
        </div>

        <div className="flex flex-col  bg-white p-4 gap-y-4 rounded-xl shadow-sm  ">
          <UraniumStockInformation data={financeCurrency.data} />
        </div>
      </div>

      <div className="mt-6 " />

      <div className="flex flex-col 2xl:col-span-2  bg-white p-4 gap-y-4 rounded-xl shadow-sm  ">
        <StockInformationSummary data={stockInfo.data} />
      </div>
    </>
  );
}

export default Stocks_tracking;
