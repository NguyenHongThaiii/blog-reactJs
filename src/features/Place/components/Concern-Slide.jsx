import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SliderTemplate from "../../../components/Slider-Template";
import ProminentPlaceItem from "../../Home/components/Prominent-Place-Item";
import { handleInnerHeightArea } from "../../../utils";

ConcernSlide.propTypes = {
  data: PropTypes.array,
};

function ConcernSlide({ data = [] }) {
  const [numberSlides, setNumberSlides] = useState(null);

  useEffect(() => {
    (async () => {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    })();
  }, []);
  const handleResize = () => {
    setNumberSlides(handleInnerHeightArea(window.innerWidth));
  };

  return (
    <div className="flex items-center justify-between  gap-x-3 gap-y-3  flex-wrap overflow-hidden  py-1 ">
      {data.map((item) => (
        <div className="lg:flex-1 lg:w-1/4 w-[45%]" key={item._id}>
          <ProminentPlaceItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default ConcernSlide;
