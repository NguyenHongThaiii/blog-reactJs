import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import reviewsApi from "./../../../../api/reviewsApi";
Judge.propTypes = {
  item: PropTypes.object,
  onShow: PropTypes.func,
};

function Judge({ item = {}, onShow = null }) {
  const [state, setState] = useState([]);
  const [judges, setJudges] = useState({});
  useEffect(() => {
    (async () => {
      const { data } = await reviewsApi.getAll({ blog: item.id });
      const judge = {};
      data.data.forEach((item, index) => {
        judge["food"] = item.food;
        judge["service"] = item.service;
        judge["price"] = item.price;
        judge["space"] = item.space;
        judge["location"] = item.location;
      });
      setState(data.data);
      setJudges(() => {
        return {
          food: judge["food"] / data.count,
          price: judge["price"] / data.count,
          service: judge["service"] / data.count,
          location: judge["location"] / data.count,
          space: judge["space"] / data.count,
        };
      });
    })();
  }, [item]);

  return (
    <div className="pt-1 px-[14px] pb-[10px] mb-[6px] shadow-[0_1px_4px_rgb(0,0,0,0.3)] rounded-[10px]">
      <h2 className="text-[21px] font-semibold">Đánh giá</h2>
      <div className="flex items-center justify-center mb-2">
        <div className="text-[28px] bg-primary text-center text-white rounded-[10px] py-1 px-2 min-w-[50px] mr-1 ">
          {state.reduce((acc, cur) => acc + cur.rating, 0)}
        </div>
        <div>
          {item.ratingsQuantity > 0 ? (
            <div></div>
          ) : (
            <div className="text-[21px] font-semibold">
              {state.length > 0 ? "Tuyệt vời" : "Chưa có đánh giá"}
            </div>
          )}
          <div>/5 ({state.length} đánh giá)</div>
        </div>
      </div>

      <div className={`${state.length === 0 ? "hidden" : "block"}`}>
        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Vị trí</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden">
            <span
              className={`text-sm  bg-primary h-full block `}
              style={{ width: `calc(100% * (${judges.location} / 5 ))` }}
            ></span>
          </div>
          <span className="basis-[5%]">
            {parseFloat(judges.location).toFixed(1)}
          </span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Không gian</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden">
            <span
              className={`text-sm  bg-primary h-full block `}
              style={{ width: `calc(100% * (${judges.space} / 5 ))` }}
            ></span>
          </div>
          <span className="basis-[5%]">
            {parseFloat(judges.space).toFixed(1)}
          </span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Đồ uống</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden">
            <span
              className={`text-sm  bg-primary h-full block `}
              style={{ width: `calc(100% * (${judges.food} / 5 ))` }}
            ></span>
          </div>
          <span className="basis-[5%]">
            {parseFloat(judges.food).toFixed(1)}
          </span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Phục vụ</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden">
            <span
              className={`text-sm  bg-primary h-full block `}
              style={{ width: `calc(100% * (${judges.service} / 5 ))` }}
            ></span>
          </div>
          <span className="basis-[5%]">
            {parseFloat(judges.service).toFixed(1)}
          </span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Giá cả</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden">
            <span
              className={`text-sm  bg-primary h-full block `}
              style={{ width: `calc(100% * (${judges.price} / 5 ))` }}
            ></span>
          </div>
          <span className="basis-[5%]">
            {parseFloat(judges.price).toFixed(1)}
          </span>
        </div>
      </div>

      <div className={`relative ${state.length > 0 ? "hidden" : "block"}`}>
        <div className="absolute inset-0 bg-[hsla(0,0%,100%,0.65)] flex items-center justify-center">
          <button
            onClick={onShow}
            className="text-primary min-h-[50px] animate-shake transition-all duration-150 hover:animate-none hover:bg-[#be0129] hover:border-[#be0129] hover:text-white bg-transparent cursor-pointer font-bold  border-4 border-primary text-sm py-[10px] px-4 rounded-[10px] "
          >
            Đánh giá ngay
          </button>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Vị trí</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden">
            <span
              className={`text-sm   h-full block ${
                state.length > 0 ? "bg-primary" : "bg-[#f5f5f5]"
              }`}
            ></span>
          </div>
          <span className="basis-[5%]">0</span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Không gian</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden">
            <span
              className={`text-sm   h-full block ${
                state.length > 0 ? "bg-primary" : "bg-[#f5f5f5]"
              }`}
            ></span>
          </div>
          <span className="basis-[5%]">0</span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Đồ uống</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden">
            <span
              className={`text-sm   h-full block ${
                state.length > 0 ? "bg-primary" : "bg-[#f5f5f5]"
              }`}
            ></span>
          </div>
          <span className="basis-[5%]">0</span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Phục vụ</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden">
            <span
              className={`text-sm   h-full block ${
                state.length > 0 ? "bg-primary" : "bg-[#f5f5f5]"
              }`}
            ></span>
          </div>
          <span className="basis-[5%]">0</span>
        </div>

        <div className="mb-[6px] flex items-center justify-between gap-5">
          <p className="basis-[30%]">Giá cả</p>
          <div className="basis-[65%] w-full rounded-full h-[8px] overflow-hidden">
            <span
              className={`text-sm   h-full block ${
                state.length > 0 ? "bg-primary" : "bg-[#f5f5f5]"
              }`}
            ></span>
          </div>
          <span className="basis-[5%]">0</span>
        </div>
      </div>
    </div>
  );
}

export default Judge;
