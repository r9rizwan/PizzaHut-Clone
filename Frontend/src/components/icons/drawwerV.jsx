import React from "react";

export function DrawwerV(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      {...props}>
      <g
        fill="none"
        stroke="green"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}>
        <path d="M15 11.063C12.53 13.65 10.059 20 10.059 20S6.529 11.063 3 9"></path>
        <path d="m20.496 5.577l.426 4.424c.276 2.87-1.875 5.425-4.745 5.702c-2.816.27-5.367-1.788-5.638-4.604a5.12 5.12 0 0 1 4.608-5.59l4.716-.454a.58.58 0 0 1 .633.522"></path>
      </g>
    </svg>
  );
}
