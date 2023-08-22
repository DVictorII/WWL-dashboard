import moment from "moment";

interface DataI {
  ask: number | string;
  averageVolume: number | string;
  beta: number | string;
  bid: number | string;
  dayHigh: number | string;
  dayLow: number | string;
  dividendRate: number | string;
  dividendYield: number | string;
  exDividendDate: number | string;
  fiftyTwoWeekHigh: number | string;
  fiftyTwoWeekLow: number | string;
  marketCap: number | string;
  open: number | string;
  previousClose: number | string;
  targetMeanPrice: number | string;
  trailingEps: number | string;
  trailingPE: number | string;
  volume: number | string;
}

function StockInformationSummary({ data }: { data: DataI }) {
  const checkData = (value: number | string) => {
    return value === "" ? "-" : (value as number).toFixed(2);
  };

  const summaryTopics = [
    {
      title: "Previous close",
      value: checkData(data?.previousClose),
    },

    {
      title: "Open",
      value: checkData(data?.open),
    },

    {
      title: "Bid",
      value: checkData(data?.bid),
    },

    {
      title: "Ask",
      value: checkData(data?.ask),
    },

    {
      title: "Day's range",
      value: `${checkData(data?.dayLow)} - ${checkData(data?.dayHigh)}`,
    },

    {
      title: "52-week range",
      value: `${checkData(data?.fiftyTwoWeekLow)} - ${checkData(
        data?.fiftyTwoWeekHigh
      )}`,
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
      value: `${
        data.marketCap === ""
          ? "-"
          : ((data.marketCap as number) / 1000000000).toFixed(3)
      } B`,
    },

    {
      title: "Beta (5Y monthly)",
      value: checkData(data?.beta),
    },

    {
      title: "PE ratio (TTM)",
      value: checkData(data?.trailingPE),
    },

    {
      title: "EPS (TTM)",
      value: checkData(data?.trailingEps),
    },

    {
      title: "Earnings date",
      value: `N/A`,
    },

    {
      title: "Forward dividend & yield",
      value: `${checkData(data?.dividendRate)} ${
        data.dividendRate === ""
          ? ""
          : `(${((data.dividendYield as number) * 100).toFixed(2)}%)`
      }`,
    },

    {
      title: "Ex-dividend date",
      value:
        data?.exDividendDate === ""
          ? "-"
          : moment((data.exDividendDate as number) * 1000).format(
              "DD MMMM YYYY"
            ),
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
