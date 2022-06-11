import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import VictoryTable from "./Victory-Table";
import ReviewItem from "./Review-Item";

ProfileContent.propTypes = {
  data: PropTypes.object,
};

function ProfileContent({ data = {} }) {
  const [state, setState] = useState([]);
  return (
    <div className="lg:flex block  justify-center lg:px-4 max-w-[1200px] mx-auto">
      <VictoryTable data={data} />
      <div className="lg:max-w-[720px] w-full  h-full">
        <div className="lg:pt-5 lg:pl-5">
          {data?.listReviews?.length > 0 &&
            data?.listReviews?.map((review, index) => (
              <ReviewItem reviewId={review} key={index} data={data} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileContent;
