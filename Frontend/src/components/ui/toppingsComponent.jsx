import { RadioInput } from "./radio-input";

const ToppingsComponent = ({
  children,
  imageSrc,
  altText,
  value,
  onChange,
  selectedOption,
  id,
}) => {
  return (
    <li className="flex items-center space-x-4 cursor-pointer border-b border-gray-300 pb-4 mb-4">
      <RadioInput
        id={id}
        value={value}
        onChange={onChange}
        checked={value === selectedOption}
      />
      <label htmlFor={id} className="flex items-center space-x-4">
        <img src={imageSrc} alt={altText} className="w-12 h-12 rounded-lg" />
        <div>{children}</div>
      </label>
    </li>
  );
};

export default ToppingsComponent;
