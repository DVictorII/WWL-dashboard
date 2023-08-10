function StockDateSpanSelector() {
  return (
    <div className="grid grid-cols-6 bg-[#f2f2f0]  rounded-full ">
      <div className="flex justify-center py-2 rounded-full bg-[#7d7967]">
        <span className="text-sm font-semibold text-white">1D</span>
      </div>

      <div className="flex justify-center py-2">
        <span className="text-sm font-semibold">5D</span>
      </div>

      <div className="flex justify-center py-2">
        <span className="text-sm font-semibold">1M</span>
      </div>

      <div className="flex justify-center py-2">
        <span className="text-sm font-semibold">6M</span>
      </div>

      <div className="flex justify-center py-2">
        <span className="text-sm font-semibold">1Y</span>
      </div>

      <div className="flex justify-center py-2">
        <span className="text-sm font-semibold">5Y</span>
      </div>
    </div>
  );
}

export default StockDateSpanSelector;
