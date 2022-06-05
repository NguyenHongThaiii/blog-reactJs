import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import categoriesApi from "../../../../api/categorieApi";
import TimeStartFilter from "../../SearchPage/components/Time-Start-Filter";
import AreaFilter from "../../SearchPage/components/Area-Filter";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import { useHide } from "../../../context/Global-Provider";
import BlogSaveFilterMobile from "./Blog-Save-Filter-Mobile";

BlogSavedFilter.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
  show: PropTypes.bool,
  onShow: PropTypes.func,
};

function BlogSavedFilter({
  onChange = null,
  filters = {},
  show = false,
  onShow = null,
}) {
  const [state, setState] = useState({});
  const [hide, setHide] = useHide();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await categoriesApi.getAll();
        const res = {};
        Object.keys(data.data[0]).forEach((key) => {
          if (key === "area" || key === "timeStart") {
            res[key] = data.data[0][key];
          }
        });
        setState(res);
      } catch (error) {
        console.log("Error 💥", error.message);
      }
    })();
  }, []);
  const handleOnChange = (value) => {
    if (!onChange) return null;

    onChange(value);
  };
  const handleReset = () => {
    onChange({
      topic: undefined,
      area: undefined,
      convenient: undefined,
      type: undefined,
      price: undefined,
      timeStart: undefined,
      name: "",
    });
    onShow();
    setHide(false);
  };
  return (
    <>
      <div className="w-1/4 p-3 h-full hidden lg:block">
        <div className="px-[14px] py-[10px] rounded-[10px] drop-shadow-2xl bg-white">
          <div className=" ">
            <h2 className="py-4 text-[21px] font-semibold  border-b border-b-[#e0e0e0]">
              Bộ lộc địa điểm{" "}
            </h2>
          </div>
          <div>
            <TimeStartFilter
              filters={filters}
              title="Giờ mở cửa"
              type="radio"
              data={state?.timeStart || []}
              name="timeStart"
              onChange={handleOnChange}
              col={true}
            />
            <AreaFilter
              filters={filters}
              title="Khu vực"
              data={state?.area || []}
              name="area"
              type="radio"
              onChange={handleOnChange}
            />
          </div>
        </div>
      </div>
      {/*  */}
      <BlogSaveFilterMobile
        show={show}
        onShow={() => onShow()}
        handleReset={handleReset}
        data={state}
        handleOnChange={handleOnChange}
        filters={filters}
      />
    </>
  );
}

export default BlogSavedFilter;
