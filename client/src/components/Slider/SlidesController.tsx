import { useSwiper } from "swiper/react";

function SlidesController() {
  const swiper = useSwiper();

  return (
    <div className="absolute top-0 right-0 z-[20]">{swiper.activeIndex}</div>
  );
}

export default SlidesController;
