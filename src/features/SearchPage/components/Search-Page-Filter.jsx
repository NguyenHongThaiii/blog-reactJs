import React, { useEffect, useState } from "react";
import categoriesApi from "../../../../api/categorieApi";
import CustomLayoutFilter from "./CustomLayoutFilter";
import PropTypes from "prop-types";
import CustomFilterMobile from "./Custom-Filter-Mobile";
SearchPageFilter.propTypes = {
  onChange: PropTypes.func,
  show: PropTypes.bool,
  onShow: PropTypes.func,
  filters: PropTypes.object,
};

function SearchPageFilter({
  onChange = null,
  show = false,
  onShow = null,
  filters = {},
}) {
  const [state, setState] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await categoriesApi.getAll();
        setState(data.data[0]);
      } catch (error) {
        console.log("Error 💥", error.message);
      }
    })();
  }, []);

  const handleOnChange = (value) => {
    if (!onChange) return null;

    onChange(value);
  };

  return (
    <>
      <CustomLayoutFilter
        data={state}
        onChange={handleOnChange}
        filters={filters}
      />
      <CustomFilterMobile
        parentFilters={filters}
        data={state}
        onChange={handleOnChange}
        show={show}
        onShow={onShow}
      />
    </>
  );
}

export default SearchPageFilter;
