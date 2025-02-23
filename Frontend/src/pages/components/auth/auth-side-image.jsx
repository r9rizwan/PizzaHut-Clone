import sideImage from "/images/banners/login-banner.jpeg";
import bottomImage from "/svg/login-icon.svg";

export const AuthSideImage = () => {
  return (
    <div className="w-6/12 bg-[url('/images/banners/login-banner.jpeg')] flex items-end h-screen bg-no-repeat bg-cover">
      <figure className="bg-black h-28 flex justify-center items-center w-full">
        <img src={bottomImage} className="h-" />
      </figure>
    </div>
  );
};
