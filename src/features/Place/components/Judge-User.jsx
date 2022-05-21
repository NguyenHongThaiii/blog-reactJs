import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaHeart, FaReplyAll, FaEllipsisH } from "react-icons/fa";
import { useSelector } from "react-redux";

JudgeUser.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
};

function JudgeUser({ item = {}, onClick = null }) {
  const user = useSelector((state) => state.auth.current);
  const [show, setShow] = useState(false);

  const handleClickFavor = (reviewId) => {
    if (!onClick) return null;
    onClick(user._id, reviewId);
  };

  return (
    <>
      <div className="mt-1 pt-4 border-t-[1px] border-t-[#ddd]">
        <div className="py-[5px] px-[10px] bg-[#eee] rounded-[12px] ">
          <div className="flex items-center justify-between border-b-[1px] border-b-[#e0e0e0] py-1 ">
            <div className="flex items-center">
              <Link to="/" className="mr-[11px] w-10 h-10">
                <img
                  src={`${import.meta.env.VITE_URL_USERS}${item?.user?.photo}`}
                  alt={item?.user?.name}
                  className="w-full h-full rounded-full"
                />
              </Link>
              <div className="flex flex-col gap-y-1  ">
                <h3 className="text-base font-semibold hover:underline cursor-pointer">
                  {item?.user?.name}
                </h3>
                <span className="text-xs font-normal text-[#898c95] mb-[2px] block hover:underline cursor-pointer">
                  Đã đánh giá từ 22 ngày trước
                </span>
              </div>
            </div>

            <div className="w-8 h-8 text-xs overflow-hidden text-white bg-primary rounded-full font-bold flex items-center justify-center">
              {parseFloat(item?.rating).toFixed(1)}
            </div>
          </div>

          <div className="py-[9px] px-[2px]">{item?.review}</div>
        </div>
      </div>

      <div className="mt-[8px] px-[10px] flex items-center justify-between">
        <div className="flex items-center text-xs">
          <button
            onClick={() => handleClickFavor(item._id)}
            className={`flex items-center ${
              item.favorite > 0 ? "text-primary" : ""
            }`}
          >
            <FaHeart className={`w-3 h-3 mr-1 `} />
            {item.favorite > 0 && (
              <span className="mx-[2px]">{item.favorite}</span>
            )}
            Thích
          </button>
          <button className="before:content-['●'] before:inline-block before:text-[#c1c1c1] before:mx-[6px] before:text-[12px] first:before:hidden ">
            Trả lời
          </button>
        </div>
        <FaEllipsisH className="relative cursor-pointer" />
      </div>
      {item.listReplies.length > 0 && show === false && (
        <div
          onClick={() => setShow(true)}
          className="text-black pl-[6px] cursor-pointer text-xs mt-2 ml-[6px] flex items-center gap-x-2 hover:underline transition-all duration-300"
        >
          <FaReplyAll className="rotate-180" />
          Xem thêm {item.listReplies.length} trả lời
        </div>
      )}

      {item.listReplies.length > 0 &&
        show === true &&
        item.listReplies.map((reply, index) => (
          <div
            key={index}
            className="border-l-[1px] border-l-[#eee] ml-[6px] mt-[16px] pl-[10px]"
          >
            <div className="mt-1 pt-4 border-t-[1px] border-t-[#ddd]">
              <div className="py-[5px] px-[10px] bg-[#eee] rounded-[12px] ">
                <div className="flex items-center justify-between border-b-[1px] border-b-[#e0e0e0] py-1 ">
                  <div className="flex items-center">
                    <Link to="/" className="mr-[11px] w-10 h-10">
                      <img
                        src={`${import.meta.env.VITE_URL_USERS}${
                          reply?.photoUser
                        }`}
                        alt={reply?.nameUser}
                        className="w-full h-full rounded-full"
                      />
                    </Link>
                    <div className="flex flex-col gap-y-1  ">
                      <h3 className="text-base font-semibold hover:underline cursor-pointer">
                        {reply?.nameUser}
                      </h3>
                      <span className="text-xs font-normal text-[#898c95] mb-[2px] block hover:underline cursor-pointer">
                        Đã đánh giá từ 22 ngày trước
                      </span>
                    </div>
                  </div>
                </div>

                <div className="py-[9px] px-[2px]">{reply?.review}</div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default JudgeUser;
