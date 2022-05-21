import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

ProminentPlaceItem.propTypes = {
  items: PropTypes.object,
};

function ProminentPlaceItem({ item }) {
  const address = item.startLocation.address.split(",")[1];
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/place/${item.slug}`);
  };
  return (
    <div
      onClick={handleClick}
      className="rounded-[10px] shadow-xl cursor-pointer hover-scale hover:shadow-2xl transition-all duration-200 "
    >
      <div className="w-full  leading-[0] overflow-hidden h-[200px] md:h-[240px] lg:max-w-[273px]">
        <img
          src={`${import.meta.env.VITE_URL_BLOGS}${item.imgPreview[3]}`}
          alt={item.name}
          className="rounded-t-[10px] w-full h-full object-cover transition-all duration-1000"
        />
      </div>
      <div className="px-[15px] py-[2px] ">
        <p className="text-text font-bold text-[18px] pt-[6px] pb-[2px]">
          {item.name}
        </p>
        <p className="text-black text-[14px] pb-[6px]">{address}</p>
      </div>
    </div>
  );
}

export default ProminentPlaceItem;
