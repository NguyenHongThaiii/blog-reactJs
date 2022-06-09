import React, { useState } from "react";
import PropTypes from "prop-types";
import TextareaCustomControl from "../../../components/Form-Control/Textarea-Custom-Control";

ReviewItemForm.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func,
};

function ReviewItemForm({ user = {}, onSubmit = null }) {
  const [state, setState] = useState("");

  const handleOnChange = (value) => {
    setState(value?.reply);
  };
  const handleOnSubmit = () => {
    if (!onSubmit || state.trim().length === 0) return;
    onSubmit({ reply: state });
    setState("");
  };
  return (
    <div className="flex gap-x-2 pt-[10px] px-[6px] pb-[2px]  ">
      <div className="w-9 h-9 bg-[#eee] shrink rounded-full overflow-hidden border-none  ">
        <img
          src={`${import.meta.env.VITE_URL_USERS}${user?.photo}`}
          alt={user?.name}
          className="h-full w-full object-cover"
        />
      </div>
      <form className="w-full mt-[-16px]">
        <TextareaCustomControl
          name="reply"
          onChange={handleOnChange}
          onKeyPress={handleOnSubmit}
          placeholder="Viết bình luận..."
          className="bg-[#eee] rounded-full text-sm focus:border-primary transition-all focus:shadow-[0_0_0_2px_rgb(238,0,51,0.2)]"
        />
      </form>
    </div>
  );
}

export default ReviewItemForm;
