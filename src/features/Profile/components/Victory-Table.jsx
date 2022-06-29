import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  FaEdit,
  FaCommentDots,
  FaHeart,
  FaRss,
  FaCalendarDay,
} from "react-icons/fa";
import reviewsApi from "../../../../api/reviewsApi";
import { handleFixDateToUs } from "../../../utils";

VictoryTable.propTypes = {
  data: PropTypes.object,
};

function VictoryTable({ data = {} }) {
  const [favorLen, setFavorLen] = useState(0);
  const [state, setState] = useState([]);
  const commentLen = state?.reduce((acc, curr) => {
    const tempLen = curr?.listReplies?.reduce((acc2, curr2) => {
      if (curr2?.userId === data._id) {
        return acc2 + 1;
      }
    }, 0);
    return acc + tempLen;
  }, 0);
  useEffect(() => {
    (async () => {
      try {
        const api = data?.listReviews?.map((id) => {
          return reviewsApi.getAll({ _id: id });
        });
        if (api?.length > 0) {
          const temp = await Promise.all(api);

          const res = temp.map((item) => item.data.data[0]);

          const len = temp.reduce((acc, curr) => {
            return acc + curr.data.data[0]?.favorite;
          }, 0);
          setFavorLen(len);
          setState(res);
        }
      } catch (error) {
        console.log("Error", error);
      }
    })();
  }, [data]);
  return (
    <div className="lg:w-[340px] lg:mt-5 mt-2 w-full">
      <div className="relative text-center p-4 bg-white rounded-[10px] shadow-[0_2px_8px_rgb(0,0,0,0.15)] lg:mb-5 mb-2 w-full  ">
        <h3 className="text-[18px] text-primary mb-2 font-semibold text-center">
          [ Bảng chiến tích ]
        </h3>
        <div className="flex items-center mb-2 px-[10px] justify-between">
          <div className="flex items-center gap-x-2">
            <FaEdit className="text-[#9d9d9d] w-8 text-[20px] " />

            <span>Đánh giá</span>
          </div>
          <div className="px-[10px] rounded-[6px] bg-[#efefef]">
            {data?.listReviews?.length}
          </div>
        </div>

        <div className="flex items-center mb-2 px-[10px] justify-between">
          <div className="flex items-center gap-x-2">
            <FaCommentDots className="text-[#9d9d9d] w-8 text-[20px] " />

            <span>Thảo luận</span>
          </div>
          <div className="px-[10px] rounded-[6px] bg-[#efefef]">
            {commentLen}
          </div>
        </div>

        <div className="flex items-center mb-2 px-[10px] justify-between">
          <div className="flex items-center gap-x-2">
            <FaHeart className="text-[#9d9d9d] w-8 text-[20px] " />

            <span>Được thích</span>
          </div>
          <div className="px-[10px] rounded-[6px] bg-[#efefef]">{favorLen}</div>
        </div>

        <div className="flex items-center mb-2 px-[10px] justify-between">
          <div className="flex items-center gap-x-2">
            <FaRss className="text-[#9d9d9d] w-8 text-[20px] " />

            <span>Người theo dõi</span>
          </div>
          <div className="px-[10px] rounded-[6px] bg-[#efefef]">
            {data?.listFollowing?.length}
          </div>
        </div>

        <div className="flex items-center mb-2 px-[10px] justify-between">
          <div className="flex items-center gap-x-2">
            <FaCalendarDay className="text-[#9d9d9d] w-8 text-[20px] " />

            <span>Ngày tham gia</span>
          </div>
          <div className="px-[10px] rounded-[6px] bg-[#efefef]">
            {handleFixDateToUs(
              new Date(+data?.createdAt).toLocaleDateString("en-US")
            )}
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative text-center bg-white shadow-[0_2px_8px_rgb(0,0,0,0.15)] min-h-[200px] overflow-hidden rounded-[10px]">
        <img
          src="/img/cloud_service.png"
          alt="cloud_service"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default VictoryTable;
