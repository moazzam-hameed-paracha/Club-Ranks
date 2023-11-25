import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

type Props = {
  images: {
    src: string;
    alt?: string;
  }[];
};

const LogoCarousel: React.FC<Props> = ({ images }) => {

  return (
    <div className="container">
    <Swiper
        slidesPerView={10}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image.src}
              alt={image.alt || "Slide " + (index + 1)}
              width={100}
              height={100}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
  );
};

export default LogoCarousel;
