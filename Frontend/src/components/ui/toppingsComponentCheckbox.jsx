import React from "react";
import { CheckboxInput } from "./checkbox-input";

const ToppingsComponentCheckBox = ({
  children,
  imageSrc,
  altText,
  value,
  onChange,
  selectedOptions = [],
  id,
}) => {
  return (
    <li className="flex items-center space-x-4 cursor-pointer border-b border-gray-300 pb-4 mb-4">
      <CheckboxInput
        id={id}
        value={value}
        onChange={onChange}
        checked={selectedOptions.includes(value)} // Check if this topping is selected
      />
      <label htmlFor={id} className="flex items-center space-x-4">
        <img src={imageSrc} alt={altText} className="w-12 h-12 rounded-lg" />
        <div>{children}</div>
      </label>
    </li>
  );
};

export default ToppingsComponentCheckBox;
