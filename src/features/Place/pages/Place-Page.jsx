import React, { useEffect, useRef, useState } from "react";
import { FaHandPointRight, FaStreetView, FaUserCheck } from "react-icons/fa";
import { MdLocationPin, MdSaveAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import blogsApi from "../../../../api/blogsApi";
import LayoutUser from "../../../components/Layout-User";
import { createSaveBlog } from "../../Auth/authSlice";
import ConcernSlide from "../components/Concern-Slide";
import ConvenientSlider from "../components/Convenient-Slider";
import Judge from "../components/Judge";
import JudgePublic from "../components/Judge-Public";
import MapBox from "../components/MapBox";
import ModalImage from "../components/Modal-Image";
import Details from "./../components/Details";

PlacePage.propTypes = {};

function PlacePage(props) {
  const location = useLocation();
  const user = useSelector((state) => state.auth.current);
  const dispatch = useDispatch();
  const slug = location.pathname.split("/")[2];
  const [show, setShow] = useState(false);
  const [isMap, setIsMap] = useState(false);
  const scrollRef = useRef(null);
  const [state, setState] = useState({});
  const [concern, setConcern] = useState([]);
  const [showModalImage, setShowModalImage] = useState({
    show: false,
    index: 0,
  });

  useEffect(() => {
    (async () => {
      const { data } = await blogsApi.get(slug);
      const res = await blogsApi.getAll({
        area: `["${data.data.area}"]`,
        limit: 4,
      });
      setState(data.data);
      setConcern(res.data.data);
      if (typeof document !== "undefined") {
        document.getElementById("root").style.overflow = "unset";
      }
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    })();

    return () => {
      if (typeof document !== "undefined") {
        document.getElementById("root").style.overflow = "auto";
      }
    };
  }, [location, location.pathname]);

  const handleSaveBlogs = async () => {
    if (user?.blogSaved.includes(state._id)) return;

    await blogsApi.createBlogSaved({
      userId: user._id,
      blogId: state._id,
    });

    dispatch(createSaveBlog(state._id));
    console.log("success");
  };

  const handleShowModalImage = (index) => {
    setShowModalImage((prev) => ({ ...prev, index, show: true }));
    console.log("run");
  };
  console.log(state);
  return (
    <LayoutUser>
      <div
        className="lg:max-w-[1200px] lg:mx-auto pt-[10px] px-[2px]  pb-[70px]"
        ref={scrollRef}
      >
        <div className="p-2 mb-[6px] shadow-[0_1px_4px_rgb(0,0,0,0.3)] rounded-[10px] ">
          <div className="flex items-center justify-between pl-2">
            <h1 className="lg:text-[28px] text-[22px] font-semibold ">
              {state.name}
            </h1>
            <div
              onClick={handleSaveBlogs}
              className="w-9 h-8 flex items-center justify-center"
            >
              <MdSaveAlt
                className={`w-[100%] h-[26px] text-sm m-0 cursor-pointer
                ${
                  user?.blogSaved.includes(state._id)
                    ? "text-primary"
                    : "text-secondary"
                }
                `}
              />
            </div>
          </div>
          <div className="pl-2 text-sm lg:flex items-center gap-x-1">
            <div className="flex items-center gap-x-1 mb-[2px] lg:text-[16px]">
              <MdLocationPin className="ml-[-3px] " />
              {state.startLocation?.address}
            </div>
            <div className="flex items-center gap-x-1 ">
              <span className="lg:text-[16px]">
                <FaStreetView className="ml-[-3px] lg:hidden" />
                <span className="hidden lg:inline-block">{" —"}</span>
              </span>
              <span
                onClick={() => setIsMap(true)}
                className="lg:text-[16px] text-primary hover:underline cursor-pointer font-medium"
              >
                Hiển thị bản đồ
              </span>
              {" —"}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${state?.startLocation?.coordinates[0]},${state?.startLocation?.coordinates[1]}`}
                target="_blank"
                className="lg:text-[16px] text-primary hover:underline cursor-pointer font-medium"
              >
                Xem đường đi
              </a>
              {" —"}
              <span className="lg:text-[16px] text-primary hover:underline cursor-pointer font-medium">
                Xem menu
              </span>
            </div>
          </div>

          <div className="mt-2 rounded-[10px] overflow-hidden h-[280px] pb-[10px] grid grid-cols-6 grid-rows-2 gap-2 ">
            <div
              onClick={() => handleShowModalImage(0)}
              className={`cursor-pointer col-span-2 row-span-2 relative before:absolute before:inset-0 before:bg-[rgba(0,0,0,.4)]  before:transition-all before:opacity-0 hover:before:opacity-100`}
            >
              <img
                className="w-full h-full object-cover rounded-[10px]"
                src={
                  state.image
                    ? `${import.meta.env.VITE_URL_BLOGS}${state.imgPreview[0]}`
                    : ""
                }
                alt={state.name}
              />
            </div>

            <div
              className={`cursor-pointer col-span-2 row-span-2 relative before:absolute before:inset-0 before:bg-[rgba(0,0,0,.4)]  before:transition-all before:opacity-0 hover:before:opacity-100`}
              onClick={() => handleShowModalImage(1)}
            >
              <img
                className="w-full h-full object-cover rounded-[10px]"
                src={
                  state.image
                    ? `${import.meta.env.VITE_URL_BLOGS}${state.imgPreview[1]}`
                    : ""
                }
                alt={state.name}
              />
            </div>

            <div
              className={`cursor-pointer col-span-2 row-span-1 relative before:absolute before:inset-0 before:bg-[rgba(0,0,0,.4)]  before:transition-all before:opacity-0 hover:before:opacity-100`}
              onClick={() => handleShowModalImage(2)}
            >
              <img
                className="w-full h-full object-cover rounded-[10px]"
                src={
                  state.image
                    ? `${import.meta.env.VITE_URL_BLOGS}${state.imgPreview[2]}`
                    : ""
                }
                alt={state.name}
              />
            </div>

            <div
              className={`cursor-pointer col-span-1 row-span-1 relative before:absolute before:inset-0 before:bg-[rgba(0,0,0,.4)]  before:transition-all before:opacity-0 hover:before:opacity-100`}
              onClick={() => handleShowModalImage(3)}
            >
              <img
                className="w-full h-full object-cover rounded-[10px]"
                src={
                  state.image
                    ? `${import.meta.env.VITE_URL_BLOGS}${state.imgPreview[3]}`
                    : ""
                }
                alt={state.name}
              />
            </div>

            <div
              className={`cursor-pointer col-span-1 row-span-1 relative`}
              onClick={() => handleShowModalImage(4)}
            >
              <div className="absolute inset-0 opacity-90 bg-[rgba(0,0,0,.4)] flex items-center justify-center">
                <span className="text-white text-[20px] font-semibold">
                  + {state?.imgPreview?.length - 4} ảnh
                </span>
              </div>
              <img
                onClick={() => handleShowModalImage(5)}
                className="w-full h-full object-cover rounded-[10px]"
                src={
                  state.image
                    ? `${import.meta.env.VITE_URL_BLOGS}${state.imgPreview[4]}`
                    : ""
                }
                alt={state.name}
              />
            </div>
          </div>
        </div>
        <div className={`lg:flex block justify-between gap-x-4 lg:mt-2`}>
          <Judge item={state} show={show} onShow={() => setShow(true)} />

          <Details item={state} />
          <div className="flex-1 overflow-hidden rounded-[10px]"></div>
        </div>

        <div>
          <ConvenientSlider item={state} />
        </div>

        <div className=" lg:flex block justify-between gap-x-2 lg:mt-2  ">
          <JudgePublic
            item={state}
            show={show}
            onShow={() => setShow(true)}
            hideShow={() => setShow(false)}
          />

          <div className="w-[33.33%] lg:block hidden sticky top-[20px]  position-[-webkit-sticky] h-fit mb-[6px] ">
            <Judge item={state} show={show} onShow={() => setShow(true)} />

            <div className="p-4 shadow-[0_2px_8px_rgb(0,0,0,0.15)] bg-white rounded-[10px] ">
              <img
                src="/img/deploy.png"
                alt="deploy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:mt-2 shadow-[0_1px_4px_rgb(0,0,0,0.15)] py-2 px-4 bg-white rounded-[10px]">
          <h2 className="text-[28px] font-semibold">Địa điểm lân cận</h2>
          <ConcernSlide data={concern} />
        </div>

        <div className="lg:mt-4 mt-2 flex items-center justify-between lg:p-4 p-[14px] mb-3 shadow-[0_1px_4px_rgb(0,0,0,0.15)] rounded-[10px] bg-[linear-gradient(-4deg,#fbf4f4,#ffa8a8)] ">
          <div className="pr-12">
            <h3 className="text-lg font-semibold mb-1">
              Đây có phải là quán cafe của bạn không?
            </h3>
            <p className="text-sm">
              Bạn sở hữu hoặc quản lý quán cafe này? Xác nhận hồ sơ của bạn miễn
              phí để cập nhật thông tin quán, nhận tick xanh, phản hồi đánh giá
              và hơn thế nữa.
            </p>
            <Link
              to="/"
              className=" flex items-center gap-x-2 text-sm text-primary font-normal mt-1"
            >
              <FaHandPointRight className="animate-move" />
              Xác nhận chủ sỡ hữu ngay
            </Link>
          </div>
          <div>
            <FaUserCheck className="text-[54px] text-primary opacity-80" />
          </div>
        </div>
        {state?.startLocation?.coordinates?.length > 0 && isMap && (
          <MapBox data={state} hideMap={() => setIsMap(false)} />
        )}

        {showModalImage.show && (
          <ModalImage
            data={state || {}}
            index={showModalImage?.index || 0}
            hideModalImage={() =>
              setShowModalImage((prev) => ({ ...prev, show: false }))
            }
          />
        )}
      </div>
    </LayoutUser>
  );
}

export default PlacePage;
