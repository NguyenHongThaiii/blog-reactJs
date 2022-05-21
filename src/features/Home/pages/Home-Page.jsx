import React from "react";
import PropTypes from "prop-types";
import Slider from "../components/Slider";
import Purpose from "../components/Purpose";
import NearArea from "../components/Near-Area";
import ProminentPlace from "../components/Promient-Place";
import SuggestArea from "../components/Sugget-Area";
import LayoutUser from "../../../components/Layout-User";

HomePage.propTypes = {};

function HomePage(props) {
  return (
    <LayoutUser>
      <Slider />
      <Purpose />
      <NearArea />
      <ProminentPlace />
      <SuggestArea />
    </LayoutUser>
  );
}

export default HomePage;
