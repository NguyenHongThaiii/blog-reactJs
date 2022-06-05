import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { Collapse, UnmountClosed } from "react-collapse";
import CheckboxControl from "../../../components/Form-Control/Checkbox-Control";
import CheckboxCustomControl from "../../../components/Form-Control/Checkbox-Custom-Control";
import { FiltersContext } from "../pages/Search-Page";

TypeFilter.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  mobile: PropTypes.bool,
  filters: PropTypes.object,
  type: PropTypes.string,
};

function TypeFilter({
  mobile = false,
  title = "",
  data = [],
  name = "",
  onChange = null,
  filters = {},
  type = "checkbox",
}) {
  const [show, setShow] = useState(true);
  // const [filters] = useContext(FiltersContext);

  const handleOnChange = (value, event) => {
    if (!onChange) return null;
    const queryParams = filters.type
      ? JSON.parse(filters.type).map((item) => `"${item}"`)
      : [];
    const array = [...queryParams];
    Object.keys(value).forEach((item) => {
      if (value[item] === true) {
        array.push(`"${item}"`);
      } else {
        const index = array.findIndex((key) => {
          return JSON.parse(key) === item;
        });
        array.splice(index, 1);
      }
    });

    const res = [...new Set([...array])];

    if (type === "radio") {
      Object.keys(value).forEach((key) => {
        onChange({ type: `["${key}"]` });
      });
      return;
    }
    if (res.length > 0) {
      onChange({ type: `[${res}]` });
    } else {
      onChange({ type: null });
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
          className={`scroll-bar ${
            data.length > 0 &&
            `${
              !mobile
                ? "p-[10px] flex overflow-y-auto flex-col gap-y-[10px] max-h-[242px] "
                : "p-[10px] grid grid-cols-2 overflow-y-auto gap-y-0 "
            }`
          }`}
        >
          {data.map((item, index) =>
            !mobile ? (
              <CheckboxControl
                key={index}
                label={item}
                name={item}
                id={item}
                value={item}
                onChange={handleOnChange}
                checked={
                  filters.type
                    ? JSON.parse(filters.type)?.includes(item)
                    : false
                }
              />
            ) : (
              <CheckboxCustomControl
                key={index}
                label={item}
                name={item}
                id={item.replaceAll(" ", "")}
                value={item}
                onChange={handleOnChange}
                checked={
                  filters.type
                    ? JSON.parse(filters.type)?.includes(item)
                    : false
                }
              />
            )
          )}
        </form>
      </UnmountClosed>
    </>
  );
}

export default TypeFilter;
