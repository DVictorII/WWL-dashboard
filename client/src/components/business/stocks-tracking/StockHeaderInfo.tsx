function StockHeaderInfo() {
  return (
    <div className="flex flex-col 2xl:col-span-2  gap-y-8 bg-white p-4 rounded-xl shadow-md shadow-[rgba(91,71,0,0.1)]">
      <div className="flex flex-col gap-y-1 lg:gap-y-2">
        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
          LIT - Global X Lithium & Battery Tech ETF
        </span>
        <span className="text-xs lg:text-sm font-semibold text-[#777]">
          NYSEArca - Nasdaq Real-time price. Currency in USD
        </span>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex items-end gap-x-6">
          <span className="text-3xl lg:text-4xl  font-bold">65.81</span>
          <div className="flex gap-x-2">
            <span className="text-sm lg:text-base text-red-700 font-semibold">
              -0.38
            </span>
            <span className="text-sm lg:text-base text-red-700 font-semibold">
              ( -0.57% )
            </span>
          </div>
        </div>
        <div className="text-xs lg:text-sm font-semibold text-[#777]">
          As of 10:03 AM EDT. Market Open
        </div>
      </div>
    </div>
  );
}

export default StockHeaderInfo;
