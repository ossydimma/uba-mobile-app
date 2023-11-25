import arrowDown from "../assests/down-arrow-5-svgrepo-com.svg";
import logo from "../assests/logo.svg";
import ngFlag from "../assests/emojione_flag-for-nigeria.svg";
export const ScreenContent = () => {
  return (
    <div className="text-white">
      <div className="header flex items-center justify-between mx-4">
        <div className="countries-container flex cursor-pointer">
          <div className="flag w-6 h-6 rounded-full overflow-hidden">
            <img src={ngFlag} alt="nigerian flag" className="rounded-full" />
          </div>
          <div className="arrow-down-icon">
            <img src={arrowDown} alt="arrow-icon" className="text-red-600" />
          </div>
        </div>
        <div className="icons flex gap-3 cursor-pointer text-lg ">
          <i className="fa-solid fa-camera"></i>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>
      <div className="logo ml-6 mt-8 flex justify-center items-center gap-2  pb-2">
        <h1 className="font-bold text-5xl pt-3">UBA</h1>
        <img src={logo} alt="logo" />
      </div>
      <div className="topup cursor-pointer mt-3">
        <div className="topUP-icon m-auto text-sm w-8 h-8 bg-white py-2 rounded-full">
          <i className="fa-solid fa-file flex justify-center text-black"></i>
        </div>
        <p className="text-xs text-center mt-1">TOP-UP</p>
      </div>
      <div className="signin-btn text-center mt-28">
        <button className="bg-red-600 w-44 h-9 rounded-lg text-xs">
          Sign in
        </button>
      </div>
      <div className="new text-xs flex justify-between mx-3 mt-20 md:mt-24">
        <p className="cursor-pointer"> Open an Account</p>
        <p className="cursor-pointer">Sign up</p>
      </div>
    </div>
  );
};
