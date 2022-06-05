import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaImage } from "react-icons/fa";

SlideImage.propTypes = {
  data: PropTypes.object,
  handleShowModalImage: PropTypes.func,
};

function SlideImage({ data = {}, handleShowModalImage = null }) {
  return (
    <div
      className={` relative mt-2 rounded-[10px] overflow-hidden h-[280px] pb-[10px]  grid-cols-6 grid-rows-2 gap-2 lg:grid hidden`}
    >
      <Link
        to={`/place/${data?.slug}/photo`}
        className="absolute flex items-center gap-x-3 z-10 bottom-[20px] left-[10px] py-1 px-[10px] text-white bg-[rgba(0,0,0,.6666666666666666)] rounded-[10px] "
      >
        <FaImage />
        Xem tất cả ảnh ({data?.imgPreview?.length})
      </Link>

      <div
        onClick={() => handleShowModalImage(0)}
        className={`cursor-pointer col-span-2 row-span-2 relative before:absolute before:inset-0 before:bg-[rgba(0,0,0,.4)]  before:transition-all before:opacity-0 hover:before:opacity-100`}
      >
        <img
          className="w-full h-full object-cover rounded-[10px]"
          src={
            data?.image
              ? `${import.meta.env.VITE_URL_BLOGS}${data?.imgPreview[0]}`
              : ""
          }
          alt={data?.name}
        />
      </div>

      <div
        className={`cursor-pointer col-span-2 row-span-2 relative before:absolute before:inset-0 before:bg-[rgba(0,0,0,.4)]  before:transition-all before:opacity-0 hover:before:opacity-100`}
        onClick={() => handleShowModalImage(1)}
      >
        <img
          className="w-full h-full object-cover rounded-[10px]"
          src={
            data?.image
              ? `${import.meta.env.VITE_URL_BLOGS}${data?.imgPreview[1]}`
              : ""
          }
          alt={data?.name}
        />
      </div>

      <div
        className={`cursor-pointer col-span-2 row-span-1 relative before:absolute before:inset-0 before:bg-[rgba(0,0,0,.4)]  before:transition-all before:opacity-0 hover:before:opacity-100`}
        onClick={() => handleShowModalImage(2)}
      >
        <img
          className="w-full h-full object-cover rounded-[10px]"
          src={
            data?.image
              ? `${import.meta.env.VITE_URL_BLOGS}${data?.imgPreview[2]}`
              : ""
          }
          alt={data?.name}
        />
      </div>

      <div
        className={`cursor-pointer col-span-1 row-span-1 relative before:absolute before:inset-0 before:bg-[rgba(0,0,0,.4)]  before:transition-all before:opacity-0 hover:before:opacity-100`}
        onClick={() => handleShowModalImage(3)}
      >
        <img
          className="w-full h-full object-cover rounded-[10px]"
          src={
            data?.image
              ? `${import.meta.env.VITE_URL_BLOGS}${data?.imgPreview[3]}`
              : ""
          }
          alt={data?.name}
        />
      </div>

      <div
        className={`cursor-pointer col-span-1 row-span-1 relative`}
        onClick={() => handleShowModalImage(4)}
      >
        <div className="absolute inset-0 opacity-90 bg-[rgba(0,0,0,.4)] flex items-center justify-center">
          <span className="text-white text-[20px] font-semibold">
            + {data?.imgPreview?.length - 4} ảnh
          </span>
        </div>
        <img
          onClick={() => handleShowModalImage(5)}
          className="w-full h-full object-cover rounded-[10px]"
          src={
            data?.image
              ? `${import.meta.env.VITE_URL_BLOGS}${data?.imgPreview[4]}`
              : ""
          }
          alt={data?.name}
        />
      </div>
    </div>
  );
}

export default SlideImage;
