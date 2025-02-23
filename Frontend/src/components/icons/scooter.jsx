import React from "react";

export const Scooter = ({ color = "#322f32", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    id="Motorbicycle-Scooter--Streamline-Nova"
    height="24"
    width="24"
    transform="scale(-1, 1) translate(0, 0)"
    {...props}>
    <desc>Motorbicycle Scooter Streamline Icon: https://streamlinehq.com</desc>
    <defs></defs>
    <path
      d="M3.7677 9.0557H11.999C12.9042 9.0557 13.47 8.0757 13.0174 7.2918C12.8073 6.928 12.4191 6.7039 11.999 6.7039H3.7677C2.8625 6.7039 2.2967 7.6838 2.7493 8.4677C2.9594 8.8315 3.3476 9.0557 3.7677 9.0557ZM17.8786 19.6388H16.919C17.8099 22.1965 21.1355 22.8305 22.9051 20.7801C24.1893 19.292 24.0052 17.0404 22.4963 15.7807C22.0886 18.0119 20.1467 19.6343 17.8786 19.6388ZM6.1195 21.9906C7.61 21.9872 8.9367 21.045 9.4309 19.6388H2.8082C3.3024 21.045 4.629 21.9872 6.1195 21.9906Z"
      fill={color} // Use color prop to dynamically set fill
      strokeWidth="1"
    />
    <path
      d="M21.4063 9.84V5.528C21.4063 3.5797 19.8269 2.0002 17.8786 2.0002H15.5267V4.3521H17.8786C18.528 4.3521 19.0545 4.8785 19.0545 5.528V14.9352C19.0545 15.5846 18.528 16.1111 17.8786 16.1111H11.999V10.2316H6.1195C2.8722 10.2314 0.24 12.8638 0.24 16.1111V18.4629H17.8785C19.8268 18.4628 21.4063 16.8834 21.4063 14.9352V12.975L23.7581 13.7593V9.0557Z"
      fill={color} // Use color prop to dynamically set fill
      strokeWidth="1"
    />
  </svg>
);
