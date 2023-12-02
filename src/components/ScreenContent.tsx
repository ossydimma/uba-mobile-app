import arrowDown from "../assests/down-arrow-5-svgrepo-com.svg";
import logo from "../assests/logo.svg";
import ngFlag from "../assests/emojione_flag-for-nigeria.svg";
import { useContext, useState } from "react";
import { More } from "../pages/More";
import { BgContext, MorePageContext } from "../MyContext";
import { SignUp } from "../pages/SignUp";

export const ScreenContent = () => {
  // states
  const { showMorePage, setShowMorePage } = useContext(MorePageContext);
  const { setBg } = useContext(BgContext);
  const [showDiv, setShowDiv] = useState<boolean>(false);
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [showPrivacy, setShowPrivacy] = useState<boolean>(false);
  const [changeType, setChangeType] = useState<string>("password");

  // functions
  function handleDisplayCountries(): void {
    setShowPrivacy(false)
    setShowSignIn(false);
    setShowDiv(true);
  }
  function handleHideCountries(): void {
    setShowDiv(false);
  }
  function changeBg(): void {
    if (setShowMorePage !== undefined) {
      setShowSignIn(false);
      setShowPrivacy(false);
      setShowDiv(false);
      setShowMorePage(true);
      setBg("light-screen-mode");
    }
  }
  function handleChangeType() {
    if (showIcon === false) {
      setShowIcon(true);
      setChangeType("text");
    } else {
      setShowIcon(false);
      setChangeType("password");
    }
  }

  return (
    <div className={`text-white relative`}>
      <div className="header flex items-center justify-between mx-4">
        <div
          className="countries-container flex cursor-pointer"
          onClick={handleDisplayCountries}
        >
          <div className="flag w-6 h-6 rounded-full overflow-hidden">
            <img src={ngFlag} alt="nigerian flag" className="rounded-full" />
          </div>
          <div className="arrow-down-icon">
            <img src={arrowDown} alt="arrow-icon" />
          </div>
        </div>
        {showDiv && (
          <section
            className={`countries absolute w-full h-full bg-white text-black  top-6 left-0 showCountries`}
          >
            <div className="">
              <div className="flex justify-between">
                <p className="text-xs pb-1 pt-2 border-b-2 border-red-600">
                  Tap to change country
                </p>
                <div className="countries-header-icon flex gap-3 mr-2 mt-1">
                  {/* <i className="fa-solid fa-rotate-right cursor-pointer" onClick={handleReset}></i> */}
                  <i
                    className="fa-solid fa-xmark cursor-pointer"
                    onClick={handleHideCountries}
                  ></i>
                </div>
              </div>
              <ul className="countries-wrapper pl-6 flex flex-col gap-4 text-xs mt-5">
                <li className="cursor-pointer">Benin</li>
                <li className="cursor-pointer">Burkina Faso</li>
                <li className="cursor-pointer">Cameroon</li>
                <li className="cursor-pointer">Chad</li>
                <li className="cursor-pointer">Congo Brazzaville</li>
                <li className="cursor-pointer">Congo DRC</li>
                <li className="cursor-pointer">Cote d'Ivoire</li>
                <li className="cursor-pointer">Gabon</li>
                <li className="cursor-pointer">Ghana</li>
                <li className="cursor-pointer">Guinea</li>
                <li className="cursor-pointer">Kenya</li>
                <li className="cursor-pointer">Liberia</li>
                <li className="cursor-pointer">Mali</li>
                <li className="cursor-pointer">Mozambique</li>
                <li className="cursor-pointer">Nigeria</li>
                <li className="cursor-pointer">Senegal</li>
                <li className="cursor-pointer">Sierra Leone</li>
                <li className="cursor-pointer">Tanzania</li>
                <li className="cursor-pointer">Uganda</li>
                <li className="cursor-pointer">Zambia</li>
              </ul>
            </div>
          </section>
        )}
        <div className="icons flex gap-3 cursor-pointer text-lg ">
          <i className="fa-solid fa-camera"></i>
          <i className="fa-solid fa-ellipsis-vertical" onClick={changeBg}></i>
        </div>
        {showMorePage && <More />}
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
      <div
        className="signin-btn text-center mt-28"
        onClick={() => setShowSignIn(true)}
      >
        <button className="bg-red-600 w-48 h-9 rounded-lg text-xs">
          Sign in
        </button>
      </div>
      {showSignIn && (
        <section className="signIn showCountries bg-black px-5 py-2 absolute w-full h-full top-56 border-x-2 border-gray-400  border-2 rounded-lg">
          <div className="flex items-center justify-between pb-3 ">
            <p>sign in</p>
            <i
              className="fa-solid fa-arrow-down bg-red-600 p-2 rounded-full cursor-pointer"
              onClick={() => setShowSignIn(false)}
            ></i>
          </div>

          <form>
            <div className="flex flex-col gap-3 relative ">
              <input
                type="text"
                className="bg-transparent border-2 border-gray-400 rounded py-1 pl-6 text-xs text-gray-400"
                placeholder="Number"
              />
              <i className="fa-solid fa-user fa-xs absolute top-3 left-2"></i>
              <input
                type={changeType}
                className="bg-transparent border-2 border-gray-400  rounded px-6 py-1 text-xs text-gray-400"
                placeholder="Password"
              />
              <i className="fa-solid fa-lock fa-xs absolute bottom-6 left-2"></i>
              <div onClick={handleChangeType} className="cursor-pointer">
                {showIcon && (
                  <i className="fa-solid fa-eye fa-xs absolute bottom-6 right-2 text-gray-400"></i>
                )}
                {!showIcon && (
                  <i className="fa-solid fa-eye-slash fa-xs absolute bottom-6 right-2 text-gray-400"></i>
                )}
              </div>
            </div>
            <p className="text-xs text-right pt-1 cursor-pointer">
              Forget Password?
            </p>
            <div>
              <button className="bg-red-600 mt-3 w-32 h-8 rounded-sm ml-6">
                Sign In
              </button>
              <i className="fa-solid fa-fingerprint bg-red-600 p-2 rounded-md ml-2 cursor-pointer"></i>
            </div>
          </form>
        </section>
      )}

      <div className="new text-xs flex justify-between mx-3 mt-20 md:mt-24">
        <p className="cursor-pointer" onClick={()=> {if (!showPrivacy) setShowPrivacy(true)}}> Open an Account</p>
        <p className="cursor-pointer">Sign up</p>
      </div>

     {showPrivacy && <section className="absolute top-6   bg-white text-black ml-5 w-52  rounded-xl p-5">
        <i
          className="fa-solid fa-xmark cursor-pointer ml-36 mb-4"
          onClick={()=> setShowPrivacy(false)}
        ></i>
        <h3 className="text-center font-bold mb-2">Privacy Notice</h3>
        <article className="text-xs">
          We take your privacy seriously and only process your personal
          information to make your banking experience better. In accordance with
          NDPR, GDPR, and any applicable regulations, continuing to use this
          platform indicates your consent to the processing of your personal
          data by United Bank for Africa PLC, its subsidiaries and partners as
          detailed in our Privacy Policy.
        </article>
        <div className="flex flex-col gap-2 mt-3 text-sm">
          <button className="bg-red-600 rounded-md py-1">Accept</button>
          <button className=" rounded-md py-1 text-red-600 border-red-600 border-2 hover:bg-gray-200" onClick={()=> setShowPrivacy(false)}>Reject</button>
        </div>
      </section>}
      <SignUp />
    </div>
  );
};
