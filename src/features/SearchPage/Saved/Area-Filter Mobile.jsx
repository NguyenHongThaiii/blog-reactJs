import PropTypes from "prop-types";
import React, { useState } from "react";
import { Collapse, UnmountClosed } from "react-collapse";
import CheckboxControl from "../../../components/Form-Control/Checkbox-Control";
import { useForm } from "react-hook-form";
import queryString from "query-string";
import CheckboxCustomControl from "../../../components/Form-Control/Checkbox-Custom-Control";

AreaFilterMobile.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

function AreaFilterMobile({
  title = "",
  data = [],
  name = "",
  onChange = null,
}) {
  const [show, setShow] = useState(true);
  const { control, handleSubmit } = useForm({});

  const handleOnChange = (value, event) => {
    if (!onChange) return null;
    const array = [];
    Object.keys(value).forEach((item) => {
      if (value[item] === true) {
        array.push(`"${item}"`);
      }
    });

    if (array.length > 0) {
      onChange({ area: `[${array}]` });
    } else {
      onChange({ area: undefined });
    }
  };
  return (
    <>
      <Collapse isOpened={true}>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            setShow((prev) => !prev);
          }}
        >
          <h4 className="py-3 pl-2 pr-10 text-[rgba(0,0,0,.85)] font-semibold  grow ">
            {title}
          </h4>
          <i className="fa-solid fa-angle-down "></i>
        </div>
      </Collapse>
      <UnmountClosed isOpened={show}>
        <form
          onInput={handleSubmit(handleOnChange)}
          className={`scroll-bar ${
            data.length > 0 &&
            "p-[10px] grid grid-cols-2 overflow-y-auto gap-y-0  "
          }`}
        >
          {data.map((item, index) => (
            <CheckboxCustomControl
              key={index}
              control={control}
              label={item}
              name={item}
              id={item.replaceAll(" ", "")}
              value={item}
            />
          ))}
        </form>
      </UnmountClosed>
    </>
  );
}

export default AreaFilterMobile;
