import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdStarOutline, MdStarHalf, MdStar } from "react-icons/md";
import blogsApi from "../../../../api/blogsApi";
import { useDispatch, useSelector } from "react-redux";
import { createSaveBlog, removeSaveBlog } from "../../Auth/authSlice";
import { handleTransformStringToDate } from "../../../utils";

SearchPageItem.propTypes = {
  data: PropTypes.object,
};

function SearchPageItem({ data = {} }) {
  const user = useSelector((state) => state.auth.current);
  const dispatch = useDispatch();
  const ratingsAverage =
    data?.reviewList?.length > 0 &&
    data?.reviewList?.reduce((acc, rating) => {
      return acc + rating.rating;
    }, 0);
  const handleClickSaveBlog = async () => {
    if (user?.blogSaved?.includes(data._id)) {
      console.log(data._id);
      await blogsApi.removeBlogSaved({
        userId: user._id,
        blogId: data._id,
      });
      dispatch(removeSaveBlog(data._id));
      console.log("remove success");
      return;
    }

    await blogsApi.createBlogSaved({
      userId: user._id,
      blogId: data._id,
    });

    dispatch(createSaveBlog(data._id));
    console.log("create success");
  };

  return (
    <div className="relative hover-scale lg:mb-5 mb-[6px] flex bg-white rounded-[10px] shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300">
      <Link
        to={`/place/${data.slug}`}
        className="lg:py-2 lg:pl-2 py-[6px] pl-[6px] block "
      >
        <div className=" lg:w-[270px] lg:h-[210px]  w-[120px] h-[110px]  overflow-hidden ">
          <img
            src={`${import.meta.env.VITE_URL_BLOGS}${data?.image}`}
            alt={data?.name}
            className="w-full h-full object-cover rounded-[6px] "
          />
        </div>
      </Link>

      <div className="lg:p-6 lg:pt-[6px] px-[10px] pt-[2px] pb-[6px] ">
        <h4 className="">
          <Link
            to={`/place/${data.slug}`}
            className="block lg:pt-[6px] lg:pb-1 font-bold lg:text-[20px] p-0 text-base hover:underline"
          >
            {data?.name}
          </Link>
        </h4>
        <div className="pt-[2px] flex items-center text-[14px]">
          {data.ratingsQuantity > 0 && (
            <span className="mr-[6pxư">{data.ratingsQuantity}</span>
          )}
          {Array.from(new Array(5)).map((x, index) =>
            ratingsAverage >= index + 1 ? (
              <MdStar
                key={index}
                className={`lg:text-[20px] text-[18px] text-primary`}
              />
            ) : ratingsAverage >= index + 0.5 ? (
              <MdStarHalf
                key={index}
                className="lg:text-[20px] text-[18px] text-primary"
              />
            ) : (
              <MdStarOutline
                key={index}
                className="lg:text-[20px] text-[18px]"
              />
            )
          )}
          {data.reviewList.length > 0
            ? `- ${data.reviewList.length} đánh giá`
            : "- Chưa có đánh giá"}
        </div>
        <div className="pt-[6px] text-base hidden lg:block">
          <i className="fa-solid fa-dollar-sign w-[18px]"></i>
          {data?.price}
        </div>
        <div className="lg:pt-[6px] lg:text-base text-sm">
          <i className="fa-solid fa-location-dot w-[18px]"></i>
          {data?.startLocation?.address}
        </div>
        <div className="lg:pt-[6px] lg:text-base text-sm">
          <i className="fa-solid fa-clock w-[18px] pr-[18px] lg:block hidden"></i>
          <span
            className={`${
              handleTransformStringToDate(data?.timeStart[0])
                ? "text-[#00b707]"
                : "text-primary"
            } font-semibold ml-[2px] mr-2`}
          >
            {handleTransformStringToDate(data?.timeStart[0])
              ? "Đang mở cửa"
              : "Đang đóng cửa"}
          </span>
          {data?.timeStart && data?.timeStart[0]}
        </div>
      </div>

      <div
        onClick={handleClickSaveBlog}
        className="group absolute top-[8px] right-[10px] bg-white hover:text-primary transition-all duration-300 shadow-2xl"
      >
        <div className="w-[36px] h-[36px] rounded-full shadow-xl flex items-center justify-center hover:opacity-80 ">
          <i
            className={`fa-solid fa-bookmark transition-all  ${
              user?.blogSaved.includes(data._id)
                ? "text-primary"
                : "text-secondary"
            }`}
          ></i>
        </div>
        <div className="lg:block hidden  invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 bg-black text-white absolute text-center w-[120px] py-1 rounded-full bottom-[-35px] right-[-40px] text-sm before:absolute before:top-[-5px]  before:right-[52px] before:border-b-[5px] before:border-b-black before:border-r-transparent before:border-r-[5px] before:border-l-transparent before:border-l-[5px] ">
          {user?.blogSaved.includes(data._id) ? "Đã lưu" : "Lưu địa điểm này"}
        </div>
      </div>
    </div>
  );
}

export default SearchPageItem;
