import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LayoutUser from "../../../components/Layout-User";
import { Link, useLocation } from "react-router-dom";
import blogsApi from "../../../../api/blogsApi";
import { MdSaveAlt, MdLocationPin } from "react-icons/md";
import { FaStreetView, FaHandPointRight } from "react-icons/fa";
import Judge from "../components/Judge";
import Details from "./../components/Details";
import ConvenientSlider from "../components/Convenient-Slider";
import JudgePublic from "../components/Judge-Public";

PlacePage.propTypes = {};

function PlacePage(props) {
  const location = useLocation();
  const slug = location.pathname.split("/")[2];
  const [show, setShow] = useState(false);

  const [state, setState] = useState({});
  useEffect(() => {
    (async () => {
      const { data } = await blogsApi.get(slug);
      setState(data.data);
    })();
  }, []);

  return (
    <LayoutUser>
      <div className="pt-[10px] px-[2px] overflow-hidden pb-[70px]">
        <div className="p-2 mb-[6px] shadow-[0_1px_4px_rgb(0,0,0,0.3)] rounded-[10px] ">
          <div className="flex items-center justify-between pl-2">
            <h1 className="text-[22px] font-semibold ">{state.name}</h1>
            <div className="w-9 h-8 flex items-center justify-center">
              <MdSaveAlt className="w-[100%] h-[26px] text-sm m-0 cursor-pointer" />
            </div>
          </div>

          <div className="pl-2 text-sm">
            <div className="flex items-center gap-x-1 mb-[2px]">
              <MdLocationPin className="ml-[-3px]" />
              {state.startLocation?.address}
            </div>
            <div className="flex items-center gap-x-1">
              <span>
                <FaStreetView className="ml-[-3px]" />
              </span>
              <span className="text-primary hover:underline cursor-pointer font-medium">
                Hiển thị bản đồ
              </span>
              {" —"}
              <span className="text-primary hover:underline cursor-pointer font-medium">
                {" "}
                Xem đường đi
              </span>
              {" —"}
              <span className="text-primary hover:underline cursor-pointer font-medium">
                Xem menu
              </span>
            </div>
          </div>

          <div className="mt-2 rounded-[10px] overflow-hidden h-[280px] pb-[10px]">
            <img
              className="w-full h-full object-cover"
              src={
                state.image
                  ? `${import.meta.env.VITE_URL_BLOGS}${state.image}`
                  : ""
              }
              alt={state.name}
            />
          </div>
        </div>
        <Judge item={state} show={show} onShow={() => setShow(true)} />
        <Details item={state} />
        <ConvenientSlider item={state} />
        <JudgePublic
          item={state}
          show={show}
          onShow={() => setShow(true)}
          hideShow={() => setShow(false)}
        />

        <div className="p-[14px] mb-3 shadow-[0_1px_4px_rgb(0,0,0,0.15)] rounded-[10px] bg-[linear-gradient(-4deg,#fbf4f4,#ffa8a8)] ">
          <h3 className="text-lg font-semibold mb-1">
            Đây có phải là quán cafe của bạn không?
          </h3>
          <p className="text-sm">
            Bạn sở hữu hoặc quản lý quán cafe này? Xác nhận hồ sơ của bạn miễn
            phí để cập nhật thông tin quán, nhận tick xanh, phản hồi đánh giá và
            hơn thế nữa.
          </p>
          <Link
            to="/"
            className=" flex items-center gap-x-2 text-sm text-primary font-medium mt-1"
          >
            <FaHandPointRight className="animate-move" />
            Xác nhận chủ sỡ hữu ngay
          </Link>
        </div>
      </div>
    </LayoutUser>
  );
}

export default PlacePage;
