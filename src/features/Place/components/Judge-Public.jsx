import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import reviewsApi from "../../../../api/reviewsApi";
import { Link } from "react-router-dom";
import Pagination from "../../../components/common/Pagination";
import JudgeUser from "./Judge-User";
import io from "socket.io-client";
import ModalReviewMobile from "./Modal-Review-Mobile";

let socket = io.connect("http://localhost:5000");

JudgePublic.propTypes = {
  item: PropTypes.object,
  show: PropTypes.bool,
  onShow: PropTypes.func,
  hideShow: PropTypes.func,
};

function JudgePublic({
  item = {},
  show = false,
  onShow = null,
  hideShow = null,
}) {
  const [reviews, setReviews] = useState([]);

  const [count, setCount] = useState(1);
  const [filters, setFilers] = useState({ limit: 5 });
  const [page, setPage] = useState(1);
  useEffect(() => {
    (async () => {
      const { data } = await reviewsApi.getAll({ ...filters, blog: item.id });
      setReviews(data.data);
      setCount(data.count);
    })();
  }, [filters, item]);

  const handlePageChange = (page) => {
    setPage(page);
    setFilers((prev) => ({ ...prev, page }));
  };

  useEffect(() => {
    socket = io.connect("http://localhost:5000");
    socket.on("favor", (data) => {
      setReviews(data);
    });
    return () => {
      socket.destroy();
    };
  }, []);

  const handleClickFavor = (userId, reviewId) => {
    socket.emit("favor", { userId, reviewId });
  };
  return (
    <div className="pt-1 px-[14px] pb-[10px] mb-[6px] shadow-[0_1px_4px_rgb(0,0,0,0.3)] rounded-[10px]">
      <div className="flex items-center justify-between pb-[6px]">
        <h2 className="text-xl font-semibold">Đánh giá từ cộng đồng</h2>
        <button
          onClick={onShow}
          className="bg-primary text-white py-[6px] px-2 font-bold text-sm rounded-[10px] border border-primary hover:bg-[#be0129] transition-all duration-150"
        >
          Viết đánh giá
        </button>
      </div>

      <div className="flex items-center justify-between px-[2px] mt-1 mb-2 rounded-[20px] bg-[linear-gradient(90deg,#ffb8b8,#ffddd8)] relative before:absolute before:top-[-10px]  before:right-[36px] before:border-b-[10px] before:border-b-[#ffdcd8] before:border-r-transparent before:border-r-[10px] before:border-l-transparent before:border-l-[10px]">
        <div className="w-[65%] flex">
          <img
            src="/img/online-review.svg"
            alt="online-review"
            className="max-h-[160px]"
          />
        </div>
        <div className="basis-[35%] py-[10px] px-1">
          <h2 className="text-base mb-1 font-medium">Bạn đã từng đến đây?</h2>
          <p className="text-xs mb-[2px] leading-[1.7]">
            Chia sẻ trải nghiệm và cảm nhận của bản thân cho mọi người cùng biết
            ❤️
          </p>
          <p className="text-xs leading-[1.7]">
            Những review chất lượng sẽ được xuất hiện ở bảng tin đấy!
          </p>
        </div>
      </div>

      {reviews.length > 0 &&
        reviews.map((item) => (
          <div key={item._id}>
            <JudgeUser item={item} onClick={handleClickFavor} />
          </div>
        ))}

      <div>
        <Pagination
          data={reviews}
          onChange={(page) => handlePageChange(page)}
          itemsPerPage={5}
          count={count}
          page={page}
        />
      </div>

      {show && (
        <ModalReviewMobile
          item={item}
          onShow={hideShow}
          onSubmit={(values) => setReviews((prev) => [...prev, values])}
        />
      )}
    </div>
  );
}

export default JudgePublic;
