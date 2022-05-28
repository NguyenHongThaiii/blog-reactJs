import React, { useState } from "react";
import PropTypes from "prop-types";

ReadMore.propTypes = {};

function ReadMore({ children }) {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(false);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 280) : text}
      <span
        onClick={toggleReadMore}
        className="read-or-hide text-primary hover:underline cursor-pointer transition-all"
      >
        {isReadMore && text.length > 280 ? "... Xem thêm" : " "}
      </span>
    </p>
  );
}

export default ReadMore;
