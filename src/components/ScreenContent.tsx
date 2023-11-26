import arrowDown from "../assests/down-arrow-5-svgrepo-com.svg";
import logo from "../assests/logo.svg";
import ngFlag from "../assests/emojione_flag-for-nigeria.svg";
import { useState } from "react";
export const ScreenContent = () => {
  const [showDiv, setShowDiv] = useState<boolean>(false);
  // const [AddClass, setAddClass] = useState('');

  function handleDisplayCountries() : void{
    setShowDiv(true)
  }
  function handleHideCountries() : void{ 
    setShowDiv(false)
  }
  // function handleReset() : void{ 
  //   const call = setInterval(()=> {
  //     handleDisplayCountries()
  //   }, 2000)
  //  setInterval(()=> {
  //   setShowDiv(false)
  // }, 2000)
  
  //   clearInterval(call)
  // }
 
  return (
    <div className="text-white relative">
      <div className="header flex items-center justify-between mx-4">
        <div className="countries-container flex cursor-pointer" onClick={handleDisplayCountries}>
          <div className="flag w-6 h-6 rounded-full overflow-hidden">
            <img src={ngFlag} alt="nigerian flag" className="rounded-full" />
          </div>
          <div className="arrow-down-icon">
            <img src={arrowDown} alt="arrow-icon" />
          </div>
        </div>
        {showDiv && (
          <section className={`countries absolute w-full h-full bg-white text-black  top-6 left-0 showCountries` }>
            <div className="">
              <div className="flex justify-between">
                <p className="text-xs pb-1 pt-2 border-b-2 border-red-600">Tap to change country</p>
                <div className="countries-header-icon flex gap-3 mr-2 mt-1">
                  <i className="fa-solid fa-rotate-right cursor-pointer" onClick={handleReset}></i>
                  <i className="fa-solid fa-xmark cursor-pointer" onClick={handleHideCountries}></i>
                </div>
              </div>
              <ul className="countries-wrapper pl-6 flex flex-col gap-4 text-xs mt-5">
                <li>Benin</li>
                <li>Burkina Faso</li>
                <li>Cameroon</li>
                <li>Chad</li>
                <li>Congo Brazzaville</li>
                <li>Congo DRC</li>
                <li>Cote d'Ivoire</li>
                <li>Gabon</li>
                <li>Ghana</li>
                <li>Guinea</li>
                <li>Kenya</li>
                <li>Liberia</li>
                <li>Mali</li>
                <li>Mozambique</li>
                <li>Nigeria</li>
                <li>Senegal</li>
                <li>Sierra Leone</li>
                <li>Tanzania</li>
                <li>Uganda</li>
                <li>Zambia</li>
              </ul>
            </div>
          </section>
        )}

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
        <button className="bg-red-600 w-48 h-9 rounded-lg text-xs">
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
