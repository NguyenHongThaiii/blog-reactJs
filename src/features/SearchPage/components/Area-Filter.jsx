import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { Collapse, UnmountClosed } from "react-collapse";
import CheckboxControl from "../../../components/Form-Control/Checkbox-Control";
import CheckboxCustomControl from "../../../components/Form-Control/Checkbox-Custom-Control";
import { FiltersContext } from "../pages/Search-Page";

AreaFilter.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  mobile: PropTypes.bool,
};

function AreaFilter({
  title = "",
  data = [],
  name = "",
  onChange = null,
  mobile = false,
}) {
  const [filters] = useContext(FiltersContext);
  const [show, setShow] = useState(true);

  const handleOnChange = (value, event) => {
    if (!onChange) return null;
    const queryParams = filters.area
      ? JSON.parse(filters.area).map((item) => `"${item}"`)
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
    if (res.length > 0) {
      onChange({ area: `[${res}]` });
    } else {
      onChange({ area: null });
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
          <i className="fa-solid fa-angle-down mr-4"></i>
        </div>
      </Collapse>
      <UnmountClosed isOpened={show}>
        <div
          className={`scroll-bar ${
            data.length > 0 &&
            `${
              !mobile
                ? "p-[10px] flex overflow-y-auto flex-col gap-y-[10px] max-h-[242px]"
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
                  filters.area
                    ? JSON.parse(filters.area)?.includes(item)
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
                  filters.area
                    ? JSON.parse(filters.area)?.includes(item)
                    : false
                }
              />
            )
          )}
        </div>
      </UnmountClosed>
    </>
  );
}

export default AreaFilter;
