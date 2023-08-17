import StockNews from "./StockNews";

const news = [
  {
    title:
      "Lobo Tiggre: Uranium is My Focus Right Now, Everything Else is Wait and See",
    img: "/media/img/photos/Rossing_mine.jpg",
    author: "Investing News Network",
    publishedTime: "2023-08-02",
    linkTo: "https://investingnews.com/lobo-tiggre-uranium-forecast/",
  },
  {
    title: "Rössing uranium mine gets 10-year life extension",
    img: "/media/img/photos/rossing_logo.png",
    author: "World Nuclear News",
    publishedTime: "2023-02-28",
    linkTo:
      "https://world-nuclear-news.org/Articles/Rossing-uranium-mine-gets-10-year-life-extension",
  },
];

function StockNewsComp() {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between ">
        <h2 className="font-semibold">Latest News</h2>

        {/* <span className="px-4 py-1 border rounded-full font-semibold text-sm ">
          View All
        </span> */}
      </div>

      <div className="flex flex-col gap-y-8">
        {news.map((n) => (
          <StockNews news={n} key={n.title} />
        ))}
      </div>
    </div>
  );
}

export default StockNewsComp;
