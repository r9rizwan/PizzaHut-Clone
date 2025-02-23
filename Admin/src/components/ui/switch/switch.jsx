// src/components/ui/Switch.jsx
import React from "react";

const Switch = ({ checked, onChange, label }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="hidden" // Hide default checkbox
        />
        <span
          className={`w-10 h-5 bg-gray-300 rounded-full flex items-center transition-colors duration-300 ${
            checked ? "bg-green-500" : "bg-gray-300"
          }`}>
          <span
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              checked ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </span>
      </label>
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
};

export default Switch;
