import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";
import CustomRate from "./Custom-Rate";
import YourJudge from "../../SearchPage/components/Your-Judge";

ModalReviewMobile.propTypes = {
  item: PropTypes.object,
};

function ModalReviewMobile({ item = {} }) {
  const [values, setValues] = useState({
    food: 5,
    service: 5,
    space: 5,
    price: 5,
    location: 5,
  });
  if (typeof document === "undefined")
    return <div className="modal">Modal</div>;

  const handleOnChange = (value) => {
    setValues((prev) => ({ ...prev, ...value }));
  };

  const handleClick = () => {
    console.log(values);
  };
  return createPortal(
    <div className="fixed flex  justify-center inset-0 z-[10000] bg-[rgba(0,0,0,0.65)]">
      <div className="absolute ">
        <div className="bg-white w-[610px]">
          <div className="px-10 h-[50px] border-b-[1px] border-b-[rgba(0,0,0,0.1)] flex items-center justify-between">
            <div className="text-[20px] flex items-center justify-center grow font-bold ">
              Đánh giá {item.name}
            </div>
            <div className="w-[30px] h-[30px] rounded-full text-[20px] flex items-center justify-center mr-[-30px] cursor-pointer hover:bg-[#cdcfd4] transition-all bg-[#e4e6eb] text-[#666]">
              <FaTimes />
            </div>
          </div>

          <div className="p-4">
            <div className="mb-[10px]">
              <h3 className="text-[18px] text-[#898c95] font-semibold">
                Xếp hạng của bạn
              </h3>

              <CustomRate
                name="location"
                title="Vị trí"
                onChange={handleOnChange}
              />
              <CustomRate
                name="space"
                title="Không gian"
                onChange={handleOnChange}
              />
              <CustomRate
                name="food"
                title="Đồ uống"
                onChange={handleOnChange}
              />
              <CustomRate
                name="service"
                title="Phục vụ"
                onChange={handleOnChange}
              />
              <CustomRate
                name="price"
                title="Giá cả"
                onChange={handleOnChange}
              />
            </div>
            <YourJudge item={item} />
          </div>
          <div className="p-[10px] border-t-[1px] border-t-[rgba(0,0,0,.1)] flex items-center justify-end">
            <button className="px-[10px] py-[6px] text-[#bcc0c4] bg-[#e4e6eb] rounded-[6px] text-base font-medium outline-none">
              Gửi đánh giá
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
}

export default ModalReviewMobile;
