import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

CustomRate.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
};

function CustomRate({ name = "", title = "", onChange = null }) {
  const nodeRef = useRef(null);
  const [status, setStatus] = useState(true);
  const [count, setCount] = useState(5);
  useEffect(() => {
    let listStar = document.querySelectorAll(`.mouseover_${name}`);

    const handleMouseout = (event) => {
      const cur = nodeRef.current;
      listStar = cur.querySelectorAll(`.mouseover_${name}`);
      listStar.forEach((item, index) => {
        item.className = `cursor-pointer absolute inset-0 z-20  transition-all w-10 h-10  mouseover_${name} text-primary   `;
      });
    };

    const handleMouseover = (event) => {
      const cur = nodeRef.current;
      listStar = cur.querySelectorAll(`.mouseover_${name}`);
      const indexStar = [...listStar].findIndex((item) =>
        item.contains(event.target)
      );

      listStar.forEach((item, index) => {
        if (index > indexStar) {
          item.className = `cursor-pointer absolute inset-0 z-20 transition-all text-[#d8d8d8]  w-10 h-10  mouseover_${name} hover:opacity-0 hover:invisible z-0`;
        }
      });
    };

    if (nodeRef && nodeRef.current && status) {
      listStar.forEach((star) => {
        star.addEventListener("mouseover", handleMouseover);
        star.addEventListener("mouseout", handleMouseout);
      });
    }

    return () => {
      listStar.forEach((star) => {
        star.removeEventListener("mouseover", handleMouseover);
        star.removeEventListener("mouseout", handleMouseout);
      });
    };
  }, [status]);

  const handleClick = (index) => {
    if (!onChange) return null;

    setCount(index);
    setStatus(false);
    onChange({ [name]: index });
  };

  return (
    <div className="pl-[10px] pr-5 flex items-center justify-between mb-1">
      <span className="grow">{title}</span>

      <div className="flex " ref={nodeRef}>
        {Array.from(new Array(5)).map((item, index) => (
          <div
            onClick={() => handleClick(index + 1)}
            key={index}
            className="relative w-10 h-10 pl-[36px] "
          >
            <div
              className={`cursor-pointer absolute inset-0 z-20 transition-all  duration-300 mouseover_${name} ${
                index + 1 > count ? "text-[#d8d8d8]" : "text-primary"
              }`}
            >
              <FaStar className="w-8 h-8 m-0 " />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomRate;

{
  /* <svg
  viewBox="64 64 896 896"
  focusable="false"
  data-icon="star"
  width="1em"
  height="1em"
  fill="currentColor"
  aria-hidden="true"
  style="color: #333;"
>
  <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
</svg>; */
}

{
  /* <svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="color: #333;"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg> */
}
