import React, { useState } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import ModalImage from "./Modal-Image";
SwiperImage.propTypes = {
  data: PropTypes.object,
};

function SwiperImage({ data = {} }) {
  const [show, setShow] = useState(false);
  const [indexCurr, setIndexCurr] = useState(0);
  const [indexModal, setIndexModal] = useState(0);

  const handleHideImage = () => {
    setShow(false);
  };
  const handleClickImage = (index) => {
    setIndexCurr(index);
    setShow(true);
  };

  return (
    <div className="my-[10px] relative block lg:hidden">
      <Swiper onSlideChange={(swiper) => setIndexModal(swiper.activeIndex)}>
        {data?.imgPreview?.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => handleClickImage(index)}
              className="h-[350px] cursor-pointer rounded-[10px] overflow-hidden cusor-pointer"
            >
              <img
                src={`${import.meta.env.VITE_URL_BLOGS}${img}`}
                alt={img}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute flex items-center justify-between bottom-0 inset-x-0 p-[10px] z-[1000]">
        <Link
          to="/"
          className="text-white text-sm bg-[#000] opacity-80 py-1 px-3 rounded-[10px]"
        >
          Xem tất cả
        </Link>

        <span className="text-white text-sm bg-[#000] opacity-80 py-1 px-3 rounded-[10px]">
          {indexModal + 1}/{data?.imgPreview?.length}
        </span>
      </div>

      {show && (
        <ModalImage
          data={data}
          imageList={data?.imgPreview}
          hideModalImage={handleHideImage}
          index={indexCurr}
          length={data?.imgPreview?.length}
        />
      )}
    </div>
  );
}

export default SwiperImage;
