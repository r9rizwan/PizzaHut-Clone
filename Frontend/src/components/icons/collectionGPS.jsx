import React from "react";

export const CollectionGPS = ({ color = "#000000", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    id="Map-Pin-Restaurant--Streamline-Nova"
    height="24"
    width="24"
    {...props}>
    <desc>Map Pin Restaurant Streamline Icon: https://streamlinehq.com</desc>
    <path
      stroke={color} // Use color prop to dynamically set stroke color
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="M20 8.80005C20 13.1 12 22.8 12 22.8S4 13.1 4 8.80005C4 4.50005 7.6 1 12 1s8 3.50005 8 7.80005Z"
    />
    <path
      stroke={color} // Use color prop to dynamically set stroke color
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="M9.6 9v4.8"
    />
    <path
      stroke={color} // Use color prop to dynamically set stroke color
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="M8 5.80005v1.59997C8 8.30002 8.7 9 9.6 9c0.9 0 1.6 -0.69998 1.6 -1.59998V5.80005"
    />
    <path
      stroke={color} // Use color prop to dynamically set stroke color
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="2"
      d="M14 13.8V6.80005s2 1 2 3.99995l-2 0"
    />
  </svg>
);
