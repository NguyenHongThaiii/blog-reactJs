import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

TextareaCustomControl.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
};

function TextareaCustomControl({ onChange = null, ...props }) {
  const [textarea, setTextarea] = useState("");
  const [height, setHeight] = useState("auto");
  const [parentHeight, setParentHeight] = useState("auto");
  const textareaRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setParentHeight(`${textareaRef?.current?.scrollHeight}px`);
    setHeight(`${textareaRef?.current?.scrollHeight}px`);
  }, [textarea]);

  const handleOnChange = (event) => {
    const value = event.target.value;
    setHeight("auto");
    setParentHeight(`${textareaRef?.current?.scrollHeight}px`);
    setTextarea(event.target.value);

    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange({ [props.name]: value });
    }, 150);
  };

  return (
    <div className="mt-4" style={{ minHeight: parentHeight }}>
      <textarea
        {...props}
        autoComplete="off"
        ref={textareaRef}
        placeholder="Nhập tối thiểu 10 kí tự."
        value={textarea}
        onChange={handleOnChange}
        className="resize-none overflow-hidden leading-normal w-full text-base border outline-none rounded-[10px] px-2 py-1 "
        style={{ height: height }}
      ></textarea>
    </div>
  );
}

export default TextareaCustomControl;
