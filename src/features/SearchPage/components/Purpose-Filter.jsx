import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { Collapse, UnmountClosed } from "react-collapse";
import CheckboxControl from "../../../components/Form-Control/Checkbox-Control";
import { useForm } from "react-hook-form";
import queryString from "query-string";
import { FiltersContext, ResetContext } from "../pages/Search-Page";
import CheckboxCustomControl from "../../../components/Form-Control/Checkbox-Custom-Control";

PurposeFilter.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  mobile: PropTypes.bool,
  filters: PropTypes.object,
  type: PropTypes.string,
};

function PurposeFilter({
  mobile = false,
  title = "",
  data = [],
  name = "",
  filters = {},
  type = "checkbox",
  onChange = null,
}) {
  // const [filters] = useContext(FiltersContext);
  const [show, setShow] = useState(true);

  const handleOnChange = (value, event) => {
    if (!onChange) return null;
    const queryParams = filters.topic
      ? JSON.parse(filters.topic).map((item) => `"${item}"`)
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
        onChange({ topic: `["${key}"]` });
      });
      return;
    }
    if (res.length > 0) {
      onChange({ topic: `[${res}]` });
    } else {
      onChange({ topic: null });
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
                type={type}
                checked={
                  filters?.topic
                    ? JSON.parse(filters?.topic)?.includes(item)
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
                type={type}
                onChange={handleOnChange}
                checked={
                  filters?.topic
                    ? JSON.parse(filters?.topic)?.includes(item)
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

export default PurposeFilter;
