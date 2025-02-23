import React from "react";
import { MainHeader } from "./components/common";

const HomePage = () => {
  return (
    <div>
      <MainHeader title="Home" subTitle="This is the landing page." />
    </div>
  );
};
export default HomePage;

// export const Home = () => {
//   const { theme, changeTheme } = useTheme();
//   console.log("🚀 ~ Home ~ theme, changeTheme:", theme, changeTheme);
//   return (
//     <div className="card">
//       <h3>Home Page</h3>
//       <button onClick={() => changeTheme("light")} className="">
//         Light Theme
//       </button>
//       <button onClick={() => changeTheme("dark")} className="">
//         Dark Theme
//       </button>
//     </div>
//   );
// };
