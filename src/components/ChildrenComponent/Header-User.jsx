import React, { useDeferredValue, useState } from "react";
import PropTypes from "prop-types";
import styled from "../scss/header.module.scss";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { FaUserEdit, FaCoins } from "react-icons/fa";
import { MdMailOutline, MdPowerSettingsNew } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../features/Auth/authSlice";

HeaderUser.propTypes = {
  user: PropTypes.object,
};

function HeaderUser({ user = {} }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    const action = logout();
    dispatch(action);
    navigate("/");
  };
  return (
    <>
      <div
        className={`cursor-pointer w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center bg-[#f0f2f5] ${styled.buttonHeaderHover}`}
      >
        <img
          src="/img/saved.svg"
          alt={user.name}
          className="w-1/2 h-1/2 object-cover"
        />
      </div>
      <div
        className={`cursor-pointer w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center bg-[#f0f2f5] ${styled.buttonHeaderHover}`}
      >
        <img
          src="/img/notice.svg"
          alt={user.name}
          className="w-1/2 h-1/2 object-cover"
        />
      </div>
      <div
        onClick={() => setShow((prev) => !prev)}
        className={`relative cursor-pointer w-[40px] h-[40px] rounded-full ${styled.buttonHeaderHover}`}
      >
        <img
          src={`${import.meta.env.VITE_URL_USERS}${user?.photo}`}
          alt={user.name}
          className="w-full h-full object-cover rounded-full "
        />

        <div
          className={` absolute  z-[100] top-full right-0 w-[200px] bg-white rounded-[6px] overflow-hidden  ${
            show ? " opacity-100 visible" : "opacity-0 invisible"
          } transition-all duration-200`}
        >
          <Link
            to="/"
            className="flex gap-x-2 py-2 px-[14px] border-b-[#eee] border-b-[1px] text-black hover:bg-[#f6f6f6] hover:text-primary transition-all duration-150"
          >
            <div className="relative cursor-pointer w-[40px] h-[40px] rounded-full overflow-hidden  ">
              <img
                src={`${import.meta.env.VITE_URL_USERS}${user?.photo}`}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="capitalize text-base  font-semibold overflow-ellipsis whitespace-normal overflow-hidden mb-2">
                {user.name}
              </p>
              <div>
                <img
                  src="/img/ranked.png"
                  alt="ranked"
                  className="w-[40px] h-[16px] mt-[-8px]"
                />
              </div>
            </div>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-x-[6px] py-2 px-[14px] border-b-[#eee] border-b-[1px] text-black hover:bg-[#f6f6f6] hover:text-primary transition-all duration-150"
          >
            <FaUserEdit className="w-[28px] text-base" />
            <p className=" text-base  font-semibold overflow-ellipsis whitespace-normal overflow-hidden ">
              Chỉnh sửa hồ sơ
            </p>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-x-[6px] py-2 px-[14px] border-b-[#eee] border-b-[1px] text-black hover:bg-[#f6f6f6] hover:text-primary transition-all duration-150"
          >
            <FaCoins className="w-[28px] text-base" />
            <p className=" text-base  font-semibold overflow-ellipsis whitespace-normal overflow-hidden ">
              Điểm thưởng
            </p>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-x-[6px] py-2 px-[14px] border-b-[#eee] border-b-[1px] text-black hover:bg-[#f6f6f6] hover:text-primary transition-all duration-150"
          >
            <MdMailOutline className="w-[28px] text-base" />
            <p className=" text-base  font-semibold overflow-ellipsis whitespace-normal overflow-hidden ">
              Liên hệ - góp ý
            </p>
          </Link>
          <div
            onClick={handleLogout}
            className="flex items-center gap-x-[6px] py-2 px-[14px] border-b-[#eee] border-b-[1px] text-black hover:bg-[#f6f6f6] hover:text-primary transition-all duration-150"
          >
            <MdPowerSettingsNew className="w-[28px] text-base" />
            <p className=" text-base  font-semibold overflow-ellipsis whitespace-normal overflow-hidden ">
              Đăng xuất
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderUser;
