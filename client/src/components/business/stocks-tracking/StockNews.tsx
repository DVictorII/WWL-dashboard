import React from "react";
import { GiPlainCircle } from "react-icons/gi";

interface NewsI {
  title: string;
  img: string;
  author: string;
  publishedTime: string;
}

function StockNews({ news }: { news: NewsI }) {
  return (
    <div className="flex gap-x-4 sm:items-center md:items-start">
      <div className="w-20 h-20 rounded-xl shrink-0 overflow-hidden">
        <img
          src={news.img}
          alt="news1"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-3">
        <span className="font-bold text-sm">{news.title}</span>

        <div className="flex items-center gap-x-3">
          <span className="font-semibold text-sm text-[#777]">
            {news.author}
          </span>
          <GiPlainCircle className="w-2 h-2 text-[#888]" />
          <span className="font-medium text-[#888] text-xs">
            {news.publishedTime}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StockNews;
