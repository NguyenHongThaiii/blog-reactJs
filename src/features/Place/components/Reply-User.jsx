import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

ReplyUser.propTypes = {
  isReply: PropTypes.bool,
  hideReply: PropTypes.func,
  onSubmit: PropTypes.func,
  review: PropTypes.object,
};

function ReplyUser({
  isReply = false,
  review = {},
  hideReply = null,
  onSubmit = null,
}) {
  const user = useSelector((state) => state.auth.current);
  const replyRef = useRef(null);

  useEffect(() => {
    if (replyRef && replyRef.current) {
      replyRef.current.focus();
    }
  }, [isReply]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      reply: replyRef.current.value,
      userId: user._id,
      reviewId: review._id,
    });

    hideReply();
  };

  return (
    <div className="border-l-[1px] border-l-[#eee] ml-[6px] mt-[16px] pl-[10px]">
      <div className="mt-1 pt-4 border-t-[1px] border-t-[#ddd]">
        <div className="py-[5px] px-[10px] bg-[#eee] rounded-[12px] ">
          <div className="flex items-center justify-between border-b-[1px] border-b-[#e0e0e0] py-1 ">
            <div className="flex items-center">
              <Link
                to="/"
                className="mr-[11px] w-10 h-10 lg:w-[64px] lg:h-[64px]"
              >
                <img
                  src={`${import.meta.env.VITE_URL_USERS}${user.photo}`}
                  alt={user?.name}
                  className="w-full h-full rounded-full"
                />
              </Link>
              <div className="flex flex-col gap-y-1  ">
                <h3 className="text-base font-semibold hover:underline cursor-pointer lg:text-[18px]">
                  {user?.name}
                </h3>
                <span className="text-xs font-normal text-[#898c95] mb-[2px] block hover:underline cursor-pointer">
                  Đã đánh giá từ 22 ngày trước
                </span>
              </div>
            </div>
          </div>

          <form className="mt-2" onSubmit={handleSubmit}>
            <input
              ref={replyRef}
              type="text"
              placeholder="Viết trả lời..."
              className=" px-2 py-1 w-full outline-none border-[1px] transition-all  bg-[#f5f4f4] rounded-[10px]  focus:border-primary"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReplyUser;
