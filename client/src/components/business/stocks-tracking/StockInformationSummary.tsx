import moment from "moment";

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

function StockInformationSummary({ data }: { data: DataI }) {
  const summaryTopics = [
    {
      title: "Previous close",
      value: data.previousClose.toFixed(2),
    },

    {
      title: "Open",
      value: data.open.toFixed(2),
    },

    {
      title: "Bid",
      value: data.bid.toFixed(2),
    },

    {
      title: "Ask",
      value: data.ask.toFixed(2),
    },

    {
      title: "Day's range",
      value: `${data.dayLow.toFixed(2)} - ${data.dayHigh.toFixed(2)}`,
    },

    {
      title: "52-week range",
      value: `${data.fiftyTwoWeekLow.toFixed(
        2
      )} - ${data.fiftyTwoWeekHigh.toFixed(2)}`,
    },

    {
      title: "Volume",
      value: data.volume.toLocaleString("en-GB"),
    },

    {
      title: "Avg. volume",
      value: data.averageVolume.toLocaleString("en-GB"),
    },

    {
      title: "Market cap",
      value: `${(data.marketCap / 1000000000).toFixed(3)} B`,
    },

    {
      title: "Beta (5Y monthly)",
      value: data.beta.toFixed(2),
    },

    {
      title: "PE ratio (TTM)",
      value: data.trailingPE.toFixed(2),
    },

    {
      title: "EPS (TTM)",
      value: data.trailingEps.toFixed(2),
    },

    {
      title: "Earnings date",
      value: `N/A`,
    },

    {
      title: "Forward dividend & yield",
      value: `${data.dividendRate.toFixed(2)} (${(
        data.dividendYield * 100
      ).toFixed(2)}%)`,
    },

    {
      title: "Ex-dividend date",
      value: moment(data.exDividendDate * 1000).format("DD MMMM YYYY"),
    },
  ];

  return (
    <div className="flex flex-col gap-y-8">
      <h2 className="font-semibold">Stock Information Summary</h2>

      <div className="px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-16 lg:gap-x-20 xl:gap-x-24 2xl:gap-x-36 gap-y-6">
          {summaryTopics.map((topic, i) => (
            <div
              className={`flex items-center justify-between gap-x-4 flex-wrap gap-y-4 pb-2 2xl:pb-3 border-b border-[#f1f1f1]  `}
            >
              <span className="text-sm font-bold">{topic.title}</span>
              <span className="text-sm font-medium ">
                {String(topic.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StockInformationSummary;
