import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiltersContext } from "./../pages/Search-Page";

CardFilter.propTypes = {};

const NAME_LIST = ["topic", "area", "convenient", "type"];

function CardFilter(props) {
  const [filters, setFilters] = useContext(FiltersContext);
  const newFilters = NAME_LIST.map((item) => {
    if (filters && filters.length > 0 && filters[item]) {
      return { [item]: JSON.parse(filters[item]) };
    }
  });
  const handleOnRemove = (index, key) => {
    switch (key) {
      case "topic": {
        newFilters[0]?.topic.splice(index, 1);
        newFilters[0].topic = JSON.stringify(newFilters[0]?.topic);
        setFilters((prev) => {
          if (JSON.parse(newFilters[0]?.topic).length > 0) {
            return { ...prev, ...newFilters[0] };
          }
          return { ...prev, topic: null };
        });
        break;
      }
      case "area": {
        newFilters[1]?.area.splice(index, 1);
        newFilters[1].area = JSON.stringify(newFilters[1]?.area);
        setFilters((prev) => {
          if (JSON.parse(newFilters[1]?.area).length > 0) {
            return { ...prev, ...newFilters[1] };
          }
          return { ...prev, area: null };
        });
        break;
      }
      case "convenient": {
        newFilters[2]?.convenient.splice(index, 1);
        newFilters[2].convenient = JSON.stringify(newFilters[2]?.convenient);
        setFilters((prev) => {
          if (JSON.parse(newFilters[2]?.convenient).length > 0) {
            return { ...prev, ...newFilters[2] };
          }
          return { ...prev, convenient: null };
        });
        break;
      }

      case "type": {
        newFilters[3]?.type.splice(index, 1);
        newFilters[3].type = JSON.stringify(newFilters[3]?.type);
        setFilters((prev) => {
          if (JSON.parse(newFilters[3]?.type).length > 0) {
            return { ...prev, ...newFilters[3] };
          }
          return { ...prev, type: null };
        });
        break;
      }

      default:
        break;
    }
  };
  return (
    <div className="mb-3  grid-cols-3 gap-3 hidden lg:grid">
      {newFilters[0]?.topic?.map(
        (item, index) =>
          item !== undefined && (
            <div
              key={index}
              className="text-primary relative flex items-center justify-center bg-white border text-center font-bold border-primary rounded-full py-1 px-2 text-base"
            >
              <span className="grow">{item}</span>
              <AiOutlineClose
                onClick={() =>
                  handleOnRemove(index, Object.keys(newFilters[0])[0])
                }
                className="ml-2 text-[rgba(0,0,0,.25)] text-xl cursor-pointer"
              />
            </div>
          )
      )}
      {newFilters[1]?.area?.map(
        (item, index) =>
          item !== undefined && (
            <div
              key={index}
              className="text-primary relative flex items-center justify-center bg-white border text-center font-bold border-primary rounded-full py-1 px-2 text-base"
            >
              <span className="grow">{item}</span>
              <AiOutlineClose
                onClick={() =>
                  handleOnRemove(index, Object.keys(newFilters[1])[0])
                }
                className="ml-2 text-[rgba(0,0,0,.25)] text-xl cursor-pointer"
              />
            </div>
          )
      )}

      {newFilters[2]?.convenient?.map(
        (item, index) =>
          item !== undefined && (
            <div
              key={index}
              className="text-primary relative flex items-center justify-center bg-white border text-center font-bold border-primary rounded-full py-1 px-2 text-base"
            >
              <span className="grow">{item}</span>
              <AiOutlineClose
                onClick={() =>
                  handleOnRemove(index, Object.keys(newFilters[2])[0])
                }
                className="ml-2 text-[rgba(0,0,0,.25)] text-xl cursor-pointer"
              />
            </div>
          )
      )}
      {newFilters[3]?.type?.map(
        (item, index) =>
          item !== undefined && (
            <div
              key={index}
              className="text-primary relative flex items-center justify-center bg-white border text-center font-bold border-primary rounded-full py-1 px-2 text-base"
            >
              <span className="grow">{item}</span>
              <AiOutlineClose
                onClick={() =>
                  handleOnRemove(index, Object.keys(newFilters[3])[0])
                }
                className="ml-2 text-[rgba(0,0,0,.25)] text-xl cursor-pointer"
              />
            </div>
          )
      )}
    </div>
  );
}

export default CardFilter;
