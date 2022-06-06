import React from "react";
import PropTypes from "prop-types";
import LayoutUser from "../../../components/Layout-User";
import { useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";

ProfilePage.propTypes = {};

function ProfilePage(props) {
  const user = useSelector((state) => state.auth.current);
  return (
    <LayoutUser>
      <div>
        <div className="max-w-[1200px] px-4 pb-[100px] mx-auto">
          <div className="h-[250px] py-5 px-10 flex items-center justify-center bg-[linear-gradient(180deg,#ffb8b8,#fafafa)] rounded-br-2xl rounded-bl-2xl relative">
            <div className="flex flex-col items-center absolute top-[34%] justify-center ">
              <div className="w-[200px] h-[200px] p-[6px] rounded-full bg-white relative">
                <img
                  src={`${import.meta.env.VITE_URL_USERS}${user?.photo}`}
                  alt={`${user?.name}`}
                  className="rounded-full w-full h-full object-cover"
                />
                <div className="absolute bottom-[10px] right-[20px] w-[38px] h-[38px] text-[20px] flex items-center justify-center rounded-full text-[rgb(64, 64, 64)] bg-[rgb(239,239,239)]">
                  <FaCamera className="" />
                </div>
              </div>
              <h1 className="text-[32px] text-[rgba(0,0,0,.85)] font-bold ">
                {user?.name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
}

export default ProfilePage;
