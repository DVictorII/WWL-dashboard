import StockDateSpanSelector from "./StockDateSpanSelector";
import StockChart from "./StockChart";

function StockChartComp({ data }: { data: any[] }) {
  return (
    <div>
      <div className="md:px-8 lg:px-0 xl:px-4 2xl:px-8">
        <StockDateSpanSelector />
      </div>

      <StockChart data={data} />
    </div>
  );
}

export default StockChartComp;
