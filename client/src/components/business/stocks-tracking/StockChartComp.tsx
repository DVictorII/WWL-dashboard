import StockDateSpanSelector from "./StockDateSpanSelector";
import StockChart from "./StockChart";
import { useStockTrackingStateStore } from "../../../store/StockTrackingStateStore";
import axios from "../../../utils/axios";
import { useQuery } from "react-query";

function StockChartComp() {
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

  const { isLoading: stockInfoIsLoading, data: stockInfo } = useQuery(
    `stock_data-Rossing-${daysSpan}`,
    () => fetchBusinessHistory("601985.SS", daysSpan),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div>
      <div className="md:px-8 lg:px-0 xl:px-4 2xl:px-8 ">
        <StockDateSpanSelector />
      </div>

      {stockInfoIsLoading ? (
        <div className={`h-[45vh] 2xl:h-[45vh]  w-full bg-[#f1f1f1] mt-6`}>
          Loading...
        </div>
      ) : (
        <StockChart data={stockInfo.hist} key={daysSpan} />
      )}
    </div>
  );
}

export default StockChartComp;
