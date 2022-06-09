import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LayoutUser from "../../../components/Layout-User";
import { useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaPencilAlt,
  FaFacebookF,
  FaInstagram,
  FaEllipsisH,
} from "react-icons/fa";
import ProfileContent from "../components/Profile-Content";
import usersApi from "../../../../api/usersApi";

ProfilePage.propTypes = {};

function ProfilePage(props) {
  const [state, setState] = useState({});

  const location = useLocation();
  const slug = location.pathname.split("/")[2];
  console.log(slug);
  console.log();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await usersApi.getAll({ slug: slug });
        setState(data.data[0]);
      } catch (error) {
        console.log("error", error.message);
      }
    })();
  }, [location]);
  return (
    <LayoutUser>
      <div className="min-h-[1000px] lg:pb-0 pb-[45px]">
        <div className="max-w-[1200px] px-4 lg:pb-[100px] pb-[140px] mx-auto bg-white">
          <div className="h-[250px] py-5 px-10 flex items-center justify-center bg-[linear-gradient(180deg,#ffb8b8,#fafafa)] rounded-br-2xl rounded-bl-2xl relative">
            <div className="flex flex-col items-center absolute top-[34%] justify-center ">
              <div className="w-[200px] h-[200px] p-[6px] rounded-full bg-white relative">
                <img
                  src={`${import.meta.env.VITE_URL_USERS}${state?.photo}`}
                  alt={`${state?.name}`}
                  className="rounded-full w-full h-full object-cover"
                />
                <div className="absolute bottom-[10px] right-[20px] w-[38px] h-[38px] text-[20px] flex items-center justify-center rounded-full text-[rgb(64, 64, 64)] bg-[rgb(239,239,239)]">
                  <FaCamera className="" />
                </div>
              </div>
              <h1 className="text-[32px] text-[rgba(0,0,0,.85)] font-bold ">
                {state?.name}
              </h1>
              <ul className="lg:hidden  h-full flex items-center gap-x-[6px] mt-2">
                <li className="cursor-pointer text-base py-1 h-full flex items-center ">
                  <Link
                    to="/"
                    className="hover:bg-[#e0e0e0]  flex items-center gap-x-2 py-[6px] px-[18px]  rounded-[6px] bg-[#efefef] font-medium transition-all"
                  >
                    <FaPencilAlt />
                    Chỉnh sửa
                  </Link>
                </li>
                <li className="cursor-pointer text-base py-1 h-full flex items-center gap-x-[6px]">
                  <Link
                    to="/"
                    className="flex items-center text-[#3b5998]  hover:bg-[#3b5998] hover:text-white  h-9 gap-x-2 py-[6px] px-[18px]  rounded-[6px] bg-[#efefef] font-medium transition-all"
                  >
                    <FaFacebookF className="" />
                  </Link>
                </li>
                <li className="cursor-pointer text-base py-1 h-full flex items-center gap-x-[6px]">
                  <Link
                    to="/"
                    className="flex items-center text-[#cd486b] hover:bg-[#cd486b] hover:text-white h-9 gap-x-2 py-[6px] px-[18px]  rounded-[6px] bg-[#efefef] font-medium transition-all"
                  >
                    <FaInstagram className=" " />
                  </Link>
                </li>
                <li className="cursor-pointer text-base py-1 h-full flex items-center gap-x-[6px]">
                  <Link
                    to="/"
                    className="flex hover:bg-[#e0e0e0] items-center h-9 gap-x-2 py-[6px] px-[18px]  rounded-[6px] bg-[#efefef] font-medium transition-all"
                  >
                    <FaEllipsisH />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-[0_2px_2px_0_rgb(189,171,171,0.2)]  sticky z-[1] top-[-1px] whitespace-nowrap ">
          <div className="max-w-[1060px] m-auto flex items-center justify-between border-t-[1px] border-t-[#ddd]">
            <ul className="list-none flex">
              <li>
                <NavLink
                  style={({ isActive }) => ({
                    borderBottomColor: isActive && "#e03",
                    borderBottom: isActive && "4px solid",
                    color: isActive && "#e03",
                  })}
                  to={`/profile/${state?.slug || "thainguyen"}`}
                  end
                  className="inline-block py-1 text-base"
                >
                  <button
                    className={`text-base font-medium  transition-all rounded-[10px] mt-[2px] py-[10px] px-[14px]  ${
                      location.pathname !== "/profile"
                        ? "hover:bg-[#f0f2f5]"
                        : ""
                    }`}
                  >
                    {" "}
                    Đánh giá
                  </button>
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={({ isActive }) => ({
                    borderBottomColor: isActive && "#e03",
                    borderBottom: isActive && "4px solid",
                    color: isActive && "#e03",
                  })}
                  to="/"
                  end
                  className="inline-block py-1  text-base"
                >
                  <button
                    className={`text-base font-medium  transition-all rounded-[10px] mt-[2px] py-[10px] px-[14px]  ${
                      location.pathname !== "/profile/saved"
                        ? "hover:bg-[#f0f2f5]"
                        : ""
                    }`}
                  >
                    {" "}
                    Đã lưu{" "}
                  </button>
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={({ isActive }) => ({
                    borderBottomColor: isActive && "#e03",
                    borderBottom: isActive && "4px solid",
                    color: isActive && "#e03",
                  })}
                  to="/"
                  end
                  className="inline-block py-1 text-base"
                >
                  <button
                    className={`text-base font-medium  transition-all rounded-[10px] mt-[2px] py-[10px] px-[14px]  ${
                      location.pathname !== "/profile/saved"
                        ? "hover:bg-[#f0f2f5]"
                        : ""
                    }`}
                  >
                    Người theo dõi{" "}
                  </button>
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={({ isActive }) => ({
                    borderBottomColor: isActive && "#e03",
                    borderBottom: isActive && "4px solid",
                    color: isActive && "#e03",
                  })}
                  to="/"
                  end
                  className="inline-block py-1 text-base"
                >
                  <button
                    className={`text-base font-medium  transition-all rounded-[10px] mt-[2px] py-[10px] px-[14px]  ${
                      location.pathname !== "/profile/saved"
                        ? "hover:bg-[#f0f2f5]"
                        : ""
                    }`}
                  >
                    Đang theo dõi{" "}
                  </button>
                </NavLink>
              </li>
            </ul>
            <ul className="h-full lg:flex items-center gap-x-[6px] hidden">
              <li className="cursor-pointer text-base py-1 h-full flex items-center ">
                <Link
                  to="/"
                  className="hover:bg-[#e0e0e0]  flex items-center gap-x-2 py-[6px] px-[18px]  rounded-[6px] bg-[#efefef] font-medium transition-all"
                >
                  <FaPencilAlt />
                  Chỉnh sửa
                </Link>
              </li>
              <li className="cursor-pointer text-base py-1 h-full flex items-center gap-x-[6px]">
                <Link
                  to="/"
                  className="flex items-center text-[#3b5998]  hover:bg-[#3b5998] hover:text-white  h-9 gap-x-2 py-[6px] px-[18px]  rounded-[6px] bg-[#efefef] font-medium transition-all"
                >
                  <FaFacebookF className="" />
                </Link>
              </li>
              <li className="cursor-pointer text-base py-1 h-full flex items-center gap-x-[6px]">
                <Link
                  to="/"
                  className="flex items-center text-[#cd486b] hover:bg-[#cd486b] hover:text-white h-9 gap-x-2 py-[6px] px-[18px]  rounded-[6px] bg-[#efefef] font-medium transition-all"
                >
                  <FaInstagram className=" " />
                </Link>
              </li>
              <li className="cursor-pointer text-base py-1 h-full flex items-center gap-x-[6px]">
                <Link
                  to="/"
                  className="flex hover:bg-[#e0e0e0] items-center h-9 gap-x-2 py-[6px] px-[18px]  rounded-[6px] bg-[#efefef] font-medium transition-all"
                >
                  <FaEllipsisH />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <ProfileContent data={state} />
      </div>
    </LayoutUser>
  );
}

export default ProfilePage;
