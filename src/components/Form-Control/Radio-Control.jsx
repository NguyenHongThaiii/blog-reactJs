import React from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

RadioControl.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
};

function RadioControl({ control, className, ...props }) {
  const { field } = useController({
    defaultValue: "",
    name: props.name,
    control: control,
  });
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="radio"
        className="h-5 w-5 cursor-pointer checked:bg-primary accent-primary"
        {...field}
        {...props}
      />
      <label
        htmlFor={props.id}
        className="text-sm  text-black px-2 block cursor-pointer"
      >
        {props.label}
      </label>
    </div>
  );
}

export default RadioControl;
