import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import blogsApi from "../../../../api/blogsApi";
import SliderTemplate from "../../../components/Slider-Template";
import NearAreaItem from "./Near-Area-Item";
import { handleInnerHeightArea } from "../../../utils";
NearArea.propTypes = {};

function NearArea() {
  const [state, setState] = useState([]);
  const [numberSlides, setNumberSlides] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await blogsApi.getAll({ limit: 5 });
        setState(data.data);

        window.addEventListener("resize", handleResize);
      } catch (error) {
        console.log("Error 💥", error.message);
      }
    })();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleResize = () => {
    setNumberSlides(handleInnerHeightArea(window.innerWidth));
  };
  return (
    <SliderTemplate
      state={state}
      slidesPerView={numberSlides || handleInnerHeightArea(window.innerWidth)}
      title="Khu vực gần đây"
    >
      {(item) => <NearAreaItem item={item} />}
    </SliderTemplate>
  );
}

export default NearArea;
