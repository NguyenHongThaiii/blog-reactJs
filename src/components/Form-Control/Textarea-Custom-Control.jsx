import PropTypes from "prop-types";
import React, { useRef, useState } from "react";

TextareaCustomControl.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  onKeyPress: PropTypes.func,
};
const MIN_TEXTAREA_HEIGHT = 40;

function TextareaCustomControl({
  onChange = null,
  className = "",
  onKeyPress = null,
  ...props
}) {
  const [textarea, setTextarea] = useState("");

  const [height, setHeight] = useState("auto");
  const textareaRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleOnChange = (event) => {
    const value = event.target.value;
    setHeight("auto");
    setTextarea(event.target.value);

    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange({ [props.name]: value });
    }, 0);
  };
  const handleOnKeyPress = (event) => {
    if (event.key !== "Enter" || !onKeyPress) return;
    onKeyPress();
    setTextarea("");
  };

  React.useLayoutEffect(() => {
    // Reset height - important to shrink on delete
    textareaRef.current.style.height = "inherit";
    // Set height
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
  }, [textarea]);

  return (
    <div className="mt-4">
      <textarea
        autoComplete="off"
        ref={textareaRef}
        placeholder="Nhập tối thiểu 10 kí tự."
        value={textarea}
        onKeyPress={handleOnKeyPress}
        onChange={handleOnChange}
        className={`resize-none overflow-hidden leading-normal w-full text-base border outline-none rounded-[10px] px-2 py-1 ${className}`}
        {...props}
        style={{
          minHeight: MIN_TEXTAREA_HEIGHT,
          resize: "none",
        }}
      ></textarea>
    </div>
  );
}

export default TextareaCustomControl;
