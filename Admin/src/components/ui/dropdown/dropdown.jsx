import React, { useState } from "react";
import { cn } from "../../../utils/cn";

const DropdownMenu = ({
  options = [],
  onSelect = () => {},
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <button
        onClick={toggleMenu}
        className="bg-primary border-2 text-primary-foreground rounded-xl px-4 py-2 flex items-center justify-between w-40">
        <span>{selectedOption}</span>
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-primary text-muted-foreground rounded-lg shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-muted-foreground hover:text-primary">
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
