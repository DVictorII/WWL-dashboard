interface DataI {
  ask: number;
  averageVolume: number;
  beta: number;
  bid: number;
  dayHigh: number;
  dayLow: number;
  dividendRate: number;
  dividendYield: number;
  exDividendDate: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  marketCap: number;
  open: number;
  previousClose: number;
  targetMeanPrice: number;
  trailingEps: number;
  trailingPE: number;
  volume: number;
}

function StockHeaderInfo({ data }: { data: DataI }) {
  const stockVariation = data.ask - data.previousClose;

  const percentageStockVariation = (stockVariation / data.previousClose) * 100;

  return (
    <div className="flex flex-col 2xl:col-span-2  gap-y-8 bg-white p-4 rounded-xl shadow-md shadow-[rgba(91,71,0,0.1)]">
      <div className="flex flex-col gap-y-1 lg:gap-y-2">
        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
          China National Nuclear Power Co., Ltd.
        </span>
        <span className="text-xs lg:text-sm font-semibold text-[#777]">
          Shanghai - Shanghai Delayed price. Currency in CNY
        </span>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex items-end gap-x-6">
          <span className="text-3xl lg:text-4xl  font-bold">
            {data.ask.toFixed(2)}
          </span>
          <div className="flex gap-x-2">
            <span
              style={{
                color: stockVariation > 0 ? "#037B4B" : "#D60A22",
              }}
              className="text-base lg:text-lg text-red-700 font-semibold"
            >
              {stockVariation > 0
                ? `+${stockVariation.toFixed(2)}`
                : stockVariation.toFixed(2)}
            </span>
            <span
              style={{
                color: percentageStockVariation > 0 ? "#037B4B" : "#D60A22",
              }}
              className={`text-base lg:text-lg   font-semibold`}
            >
              ({" "}
              {percentageStockVariation > 0
                ? `+${percentageStockVariation.toFixed(2)}`
                : percentageStockVariation.toFixed(2)}
              % )
            </span>
          </div>
        </div>
        {/* <div className="text-xs lg:text-sm font-semibold text-[#777]">
          As of 10:03 AM EDT. Market Open
        </div> */}
      </div>
    </div>
  );
}

export default StockHeaderInfo;
