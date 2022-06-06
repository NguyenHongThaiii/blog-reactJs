import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import BlogSavedFilter from "./Blog-Saved-Filter";
import blogsApi from "../../../../api/blogsApi";
import SearchPageItem from "../../SearchPage/components/Search-Page-Item";
import { useSelector } from "react-redux";
import Pagination from "../../../components/common/Pagination";
import { FaSort } from "react-icons/fa";
import { useHide } from "../../../context/Global-Provider";

BlogSavedContent.propTypes = {};
const itemsPerPage = 5;

function BlogSavedContent(props) {
  const user = useSelector((state) => state.auth.current);

  const [state, setState] = useState([]);
  const [filters, setFilters] = useState({ limit: 5 });
  const [page, setPage] = useState(1);
  const scrollRef = useRef(null);
  const [show, setShow] = useState(false);
  const [hide, setHide] = useHide();
  useEffect(() => {
    (async () => {
      try {
        // const { data } = await blogsApi.getAll(filters);
        const api = user?.blogSaved?.map((id) => {
          return blogsApi.getAll({ _id: id, ...filters });
        });
        const temp = await Promise.all(api);
        const res = [];

        temp.forEach((item) => {
          item.data.count > 0 ? res.push(item.data.data[0]) : null;
        });
        setState(res);
      } catch (error) {
        console.log("Error 💥 ", error.message);
      }
    })();

    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [filters]);
  const handleOnChange = (value) => {
    console.log(value);
    setFilters((prev) => {
      return { ...prev, ...value };
    });
  };
  const handlePageChange = (page) => {
    setPage(page);
    setFilters((prev) => {
      return { ...prev, page };
    });
  };
  return (
    <div className=" max-w-[1200px] mx-auto px-4  flex flex-col lg:flex-row pb-[70px]">
      <BlogSavedFilter
        onChange={handleOnChange}
        filters={filters}
        show={show}
        onShow={() => {
          setShow(false);
        }}
      />

      <div className="p-[10px] lg:hidden flex items-center justify-between">
        <h1 className="text-[18px] font-bold text-[#1d2129]">
          Danh sách đã lưu
        </h1>
        <div
          className="flex items-center text-[#1d2129] font-medium cursor-pointer"
          onClick={() => {
            setShow(true);
            setHide(true);
          }}
        >
          <FaSort /> Lọc
        </div>
      </div>

      <div className="lg:w-3/4 lg:p-3 w-full pb-[120px]" ref={scrollRef}>
        <div>
          {state?.length > 0 &&
            state?.map((item) => <SearchPageItem data={item} key={item._id} />)}
        </div>
        <div>
          <Pagination
            data={state}
            onChange={(page) => handlePageChange(page)}
            itemsPerPage={itemsPerPage}
            count={state?.length}
            page={page}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogSavedContent;
