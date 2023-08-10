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
      value: data.previousClose,
    },

    {
      title: "Open",
      value: data.open,
    },

    {
      title: "Bid",
      value: data.bid,
    },

    {
      title: "Ask",
      value: data.ask,
    },

    {
      title: "Day's range",
      value: `${data.dayLow} - ${data.dayHigh}`,
    },

    {
      title: "52-week range",
      value: `${data.fiftyTwoWeekLow} - ${data.fiftyTwoWeekHigh}`,
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
      title: "Net assets",
      value: "3.3B",
    },

    {
      title: "NAV",
      value: "64.98",
    },

    {
      title: "PE ratio (TTM)",
      value: data.trailingPE,
    },

    {
      title: "Yield",
      value: `${data.dividendYield * 100} %`,
    },

    {
      title: "YTD daily total return",
      value: "10.29%",
    },

    // {
    //   title: "Beta (5Y monthly)",
    //   value: data.beta,
    // },

    {
      title: "Expense ratio (net)",
      value: "0.75%",
    },

    {
      title: "Inception date",
      value: moment(1689292800).format("YYYY-MM-DD"),
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
