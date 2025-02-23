// import React, { useState } from "react";
// import { cn } from "../../utilis/cn";

// export const ToggleButton = ({
//   initialIsOn = false,
//   className = "",
//   color = "primary",
//   ...props
// }) => {
//   const [isOn, setIsOn] = useState(initialIsOn);

//   const handleClick = () => {
//     setIsOn((prev) => !prev);
//   };

//   return (
//     <button
//       type="button"
//       onClick={handleClick}
//       className={cn(
//         "relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 ease-in-out",
//         "bg-muted-foreground", // Always use muted-foreground as background
//         isOn
//           ? color === "primary"
//             ? "text-primary" // Primary text color when ON
//             : color === "secondary"
//             ? "text-secondary" // Secondary text color (if needed) when ON
//             : "text-primary"
//           : "text-muted-foreground", // Muted text color when OFF
//         className
//       )}
//       {...props}>
//       <span
//         className={cn(
//           "absolute inline-block w-7 h-7 rounded-full bg-background transform transition-transform duration-300 ease-in-out",
//           isOn ? "translate-x-8" : "translate-x-0"
//         )}
//       />
//       <span className="relative z-10 text-xs font-semibold">
//         {isOn ? "ON" : "OFF"}
//       </span>
//     </button>
//   );
// };

// export default ToggleButton;

const ToggleButton = () => {
  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        className="peer appearance-none focus:outline-none rounded-full w-14 h-8 bg-gray-100 checked:bg-blue-500 border-2 border-gray-400 transition-colors"
      />
      <span className="rounded-full pointer-events-none ms-1 absolute size-6 peer-checked:translate-x-6 transition-[transform_color] bg-gray-400 peer-checked:bg-white inline-block"></span>
    </div>
  );
};

export { ToggleButton };
