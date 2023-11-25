import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { capitalize } from "lodash";
import { Button } from "react-bootstrap";

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
        slidesPerView={images.length > 6 ? 6 : images.length}
        spaceBetween={10}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => {
          const name = capitalize(image.src.split("/").pop()?.split(".")[0]);

          return (
            <SwiperSlide key={index}>
              <div className="d-flex flex-column align-items-center gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 bg-transparent border-white"
                >
                  {name}
                </Button>
                <Image
                  src={image.src}
                  alt={image.alt || "Slide " + (index + 1)}
                  width={100}
                  height={100}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default LogoCarousel;
