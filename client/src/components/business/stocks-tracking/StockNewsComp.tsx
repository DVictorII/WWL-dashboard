import React from "react";
import StockNews from "./StockNews";

const news = [
  {
    title: "The Best Nuclear Stocks to Buy Before 'Oppenheimer' Hits Theaters",
    img: "/media/img/photos/Rossing_mine.jpg",
    author: "InvestorPlace",
    publishedTime: "7 days ago",
  },
  {
    title:
      "Exponential Growth in Rossing Uranium Stock Price, According to Research",
    img: "/media/img/photos/rossing_logo.png",
    author: "InvestorPlace",
    publishedTime: "2 weeks ago",
  },
];

function StockNewsComp() {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between ">
        <h2 className="font-semibold">Latest News</h2>

        <span className="px-4 py-1 border rounded-full font-semibold text-sm ">
          View All
        </span>
      </div>

      <div className="flex flex-col gap-y-8">
        {news.map((n) => (
          <StockNews news={n} />
        ))}
      </div>
    </div>
  );
}

export default StockNewsComp;
