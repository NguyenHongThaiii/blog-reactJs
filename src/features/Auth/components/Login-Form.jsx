import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputControl from "../../../components/Form-Control/Input-Control";
import PasswordControl from "../../../components/Form-Control/Password-Control";
LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm({ onSubmit = null }) {
  const [error, setError] = useState("");
  const { control, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    // resolver: yupResolver(schema),
  });

  const handleOnSubmit = async (value) => {
    if (!onSubmit) return null;
    try {
      await onSubmit(value);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="py-[6px]">
        <label htmlFor="email" className="text-base mb-[4px] inline-block">
          Email hoặc tên người dùng
        </label>
        <InputControl
          control={control}
          name="email"
          focus
          id="email"
          type="email"
        />
      </div>
      <div className="py-[6px]">
        <label htmlFor="password" className="text-base mb-[4px] inline-block">
          Mật khẩu
        </label>
        <PasswordControl
          control={control}
          name="password"
          id="password"
          setValue={setValue}
        />
      </div>
      {error.length > 0 && (
        <span className="block font-medium text-sm text-primary transition-all duration-150">
          {error}
        </span>
      )}
      <button
        formNoValidate={true}
        className=" w-full my-[14px] p-2 text-[18px] font-medium tracking-[0.4px] border-none outline-none rounded-[4px] text-white bg-primary"
      >
        Đăng nhập
      </button>

      <div className="relative text-center overflow-hidden p-2">
        <div className=" absolute top-[50%] left-0 w-1/2 border-t-[1px] border-t-[#717171] translate-x-[-50%] ml-4 "></div>
        <span className=" text-base px-[6px]">hoặc tiếp túc với</span>
        <div className=" absolute top-[50%] right-0 w-1/2 border-t-[1px] border-t-[#717171] translate-x-[50%] mr-4"></div>
      </div>
    </form>
  );
}

export default LoginForm;
