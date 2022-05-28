import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "./Modal-Image.module.scss";
ModalImage.propTypes = {
  data: PropTypes.object,
  hideModalImage: PropTypes.func,
};

function ModalImage({ data = {}, index = 0, hideModalImage = null }) {
  const imageRef = useRef(null);
  const tempRef = useRef(null);
  const [indexCurr, setIndexCurr] = useState(0);
  const handleSwiperChange = (swiper) => {
    setIndexCurr(swiper.activeIndex);
  };

  const handleZoomChangePlus = (zoom) => {
    imageRef.current.style.width = imageRef.current.offsetWidth * 1.5 + "px";
  };
  const handleZoomChangeMinus = (zoom) => {
    if (imageRef.current.offsetWidth <= 600) return;
    imageRef.current.style.width = imageRef.current.offsetWidth / 1.5 + "px";
  };
  return createPortal(
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,.85)] modal-image ${styled.modalImage} z-[1000]`}
    >
      <Swiper
        modules={[Navigation]}
        onSlideChange={(swiper) => handleSwiperChange(swiper)}
        // autoplay={false}
        // allowTouchMove={false}
        initialSlide={index}
        navigation={true}
        // grabCursor={false}
      >
        <div
          className={`absolute bg-[rgba(0,0,0,.5)] top-0 w-full flex items-center justify-between h-[50px] z-[100] overflow-hidden`}
        >
          <div className="pl-5 leading-[50px] text-sm text-white ">
            {indexCurr + 1} / {data?.imgPreview?.length}
          </div>
          <div className="h-full flex items-center justify-center">
            <button
              className="py-[1px] px-[6px] h-[35px] w-10"
              onClick={handleZoomChangePlus}
            >
              <img src="/img/search_plus.svg" alt="search_plus" />
            </button>
            <button
              className="py-[1px] px-[6px] h-[35px] w-10"
              onClick={handleZoomChangeMinus}
            >
              <img src="/img/search_minus.svg" alt="search_minus" />
            </button>
            <button
              className="py-[1px] px-[6px] h-[35px] w-10"
              onClick={hideModalImage}
            >
              <img src="/img/close.svg" alt="close" />
            </button>
          </div>
        </div>

        {data?.imgPreview?.map((image, index) => (
          <SwiperSlide className="flex " key={image}>
            <div
              className="flex justify-center items-center m-auto "
              ref={index === indexCurr ? imageRef : tempRef}
            >
              <img
                src={`${import.meta.env.VITE_URL_BLOGS}${image}`}
                alt={`${image}`}
                className="h-[640px]  w-full "
              />
            </div>
          </SwiperSlide>
        ))}

        <div className="absolute text-sm bg-[rgba(0,0,0,.5)] bottom-0 w-full  h-[42px]  z-[100] text-white flex items-center  py-[10px] px-5">
          {data.name} - Toidicafe.vn
        </div>
      </Swiper>
    </div>,
    document.querySelector("body")
  );
}

export default ModalImage;
