import React, { useContext, useEffect, useState } from "react";
import { BgContext, MorePageContext, UserInfo } from "../MyContext";
import sendSvg from "../assests/money-cash-svgrepo-com.svg";
import billSvg from "../assests/money-cash-svgrepo-com (1).svg";
import loadSvg from "../assests/history-svgrepo-com.svg";
import mobileSvg from "../assests/mobile2-svgrepo-com.svg";
import loanImage from "../assests/loan.jpeg";
import eNaeriaImage from "https://enaira.gov.ng/wp-content/uploads/2023/04/enaira-logo.jpg";

export const Home = () => {
  // states
  const [showIcon, setShowIcon] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(true);
  const [changeType, setChangeType] = useState<string>("");
  const [clickTime, setClickTime] = useState<string>("");
  const [showLoan, setShowLoan] = useState<boolean>(true);
  const [showEnaira, setShowEnaira] = useState<boolean>(true);
  const [showService, setShowService] = useState<boolean>(true);
  const [showMobile, setShowMobile] = useState<boolean>(true);
  const [showCustomize, setShowCustomize] = useState<boolean>(true);


  // contexts
  const { bg } = useContext(BgContext);
  const { setShowNoti } = useContext(MorePageContext);
  const user = useContext(UserInfo);
  useEffect(() => {
    setTime();
  }, []);

  // functions

  function setTime(): void {
    setReload(false);

    setTimeout(() => {
      const time = new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      setClickTime(time);
      setReload(true);
    }, 2000);
  }

  function handleNotiPage(): void {
    if (setShowNoti !== undefined) {
      setShowNoti(true);
    }
  }

  function handleClick(): void {
    setTime();
  }
  return (
    <div
      className={`text-white w-full h-full top-0 absolute left-0 showMorePage bg-[#000] home-wrapper scroll-smooth md:h-[465px]`}
    >
      <main className=" h-full relative text-black">
        <header className="h-24  bg-black ">
          <div className="w-60  h-11 -mt-2 bg-black text-white px-2 flex justify-between items-center fixed z-10">
            <span className="flex gap-2">
              <div className=" ">
                <i className="fa-regular fa-user text-xs ml-1 "></i>
              </div>
              <p className="text-xs">{`Hello, ${user.fullName}`}</p>
            </span>

            <span className="flex  gap-2 ">
              <i
                className="fa-regular fa-bell text-gray-400 text-2xl cursor-pointer"
                onClick={handleNotiPage}
              ></i>
              <span className="mt-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 40 48"
                  fill="none"
                >
                  <path
                    d="M0 47.8813L8.14387 8.97778C8.14387 8.97778 22.8028 33.6666 21.717 40.7739C20.6311 47.8813 7.05802 48.3177 0 47.8813Z"
                    fill="red"
                  />
                  <path
                    d="M39.1481 0.118729L31.0042 39.0223C31.0042 39.0223 16.3452 14.3335 17.4311 7.22611C18.5169 0.118731 32.09 -0.317687 39.1481 0.118729Z"
                    fill="red"
                  />
                </svg>
              </span>
            </span>
          </div>
        </header>
        <section className=" absolute top-10 left-7 h-28 w-48 bg-white rounded-lg drop-shadow-xl">
          {reload && (
            <div>
              <p className="text-xs text-center mt-2">
                Account: <span className="tracking-wider">2763732737</span>
              </p>
              <div className="flex justify-center items-center gap-5 font-semibold mr-1 mt-2">
                <h1 className="ml-6 ">
                  NGN{" "}
                  <span
                    className={`${changeType} text-xs `}
                  >{`44444400.00`}</span>
                </h1>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    if (showIcon === true) {
                      setChangeType("my-class");
                      setShowIcon(false);
                    } else {
                      setChangeType("");
                      setShowIcon(true);
                    }
                  }}
                >
                  {showIcon && (
                    <i className="fa-solid fa-eye fa-xs  text-gray-700"></i>
                  )}
                  {!showIcon && (
                    <i className="fa-solid fa-eye-slash fa-xs  text-gray-700"></i>
                  )}
                </div>
              </div>
              <p className="text-xs text-center mt-2">Current Account</p>
              <div className="flex x-1 justify-evenly mt-2 mb-1">
                <i className="fa-solid fa-plus text-xs text-red-600"></i>
                <p className="small-font mx-1">
                  Balance last updated on <span>{clickTime}</span>
                </p>
                <i
                  className="fa-solid fa-rotate text-xs text-gray-900 cursor-pointer"
                  onClick={handleClick}
                ></i>
              </div>
            </div>
          )}
          {!reload && (
            <div className="flex justify-center items-center h-full">
              <span className="loader"></span>
            </div>
          )}
        </section>

        <div className="bg-[#f1f1f1] w-full text-black h-[900px] pt-20 overflow-hidden">
          <div className="bg-red-600 w-2.5 h-2.5 mx-auto rounded-full -mt-4 "></div>

          {showService && <section className="sec-height mx-auto  w-48 bg-white rounded-lg drop-shadow-xl mt-2  pl-1.5 pt-2 ">
            <h2 className="text-sm font-[600]">Service</h2>
            <ul className="w-full h-full flex items-center justify-center gap-1.5 -mt-3">
              <li className="flex flex-col items-center gap-1 cursor-pointer">
                <div className="border-2 p-1.5 drop-shadow-lg bg-white">
                  <img src={sendSvg} alt="icon" />
                </div>
                <p className="text-[9px]">Transfer</p>
              </li>

              <li className="flex flex-col items-center gap-1 cursor-pointer ">
                <div className="border-2 p-1.5   drop-shadow-lg bg-white">
                  <img src={loadSvg} alt="icon" />
                </div>
                <p className="text-[8px] text-center">History</p>
              </li>

              <li className="flex flex-col items-center gap-1 cursor-pointer">
                <div className="border-2 p-1.5 drop-shadow-lg bg-white ">
                  <img src={billSvg} alt="icon" />
                </div>
                <p className="text-[8px]">Pay Bill</p>
              </li>

              <li className="flex flex-col items-center gap-1 cursor-pointer">
                <div className="border-2 p-1.5 drop-shadow-lg bg-white">
                  <img src={mobileSvg} alt="icon" />
                </div>
                <p className="text-[8px]">Mobile</p>
              </li>
            </ul>
          </section>}

          {showLoan && <section className="sec-height mx-auto  w-48 bg-white rounded-lg drop-shadow-xl mt-4 pl-1.5 pt-2">
            <h2 className="text-sm font-[600]">Loans</h2>
            <div className="w-24  mt-0.5 ml-1 cursor-pointer">
              <img
                src={loanImage}
                alt="loan image"
                className="rounded-md h-[50px]"
              />
              <p className="text-[11px] mt-[2px] ml-0.5">Quick Loans</p>
            </div>
          </section>}
          {showEnaira && <section className=" relative mx-auto pb-4 w-48 bg-white rounded-lg drop-shadow-xl mt-4  pt-2">
            <img
              src="https://enaira.gov.ng/wp-content/uploads/2023/04/enaira-logo.jpg"
              alt="eNaria image"
              className="h-10 w-24 ml-1.5"
            />
            <div className=" absolute top-0 left-[49px] w-24 h-10 bg-white pt-2">
              <p className="text-gray-600 text-lg font-[500] -mt-1">eNaira</p>
              <div className="text-[8px] flex flex-col -mt-[8px] gap-[-4px] text-green-900">
                <p>Same Naira</p>
                <p className="-mt-1">More possibilities</p>
              </div>
            </div>
            <div className="mx-[4px] mt-1">
              <p className="text-[10px] font-semibold">
                Access your eNaria Wallet from UBA App
              </p>
              <p className="text-[9px] mt-0.5">
                Secure,fast & easy way to deposit & withdraw & funds from / to
                your UBA app
              </p>
            </div>
            <div className="flex justify-center mt-3">
              <button className="bg-red-600 w-[90%] h-8 rounded-md text-white text-sm">
                Get Started              </button>
            </div>
          </section>}

          {showMobile && <section className="relative mx-auto pb-4 pl-2 pr-2 w-48 bg-white rounded-lg drop-shadow-xl mt-4  pt-3">
            <h2 className=" text-sm font-bold mb-2">Mobile Top up</h2> 
            <p className="text-[11px]">Customer Mobile Number</p>
            <div className="mr-8 relative flex flex-col gap-4">
              <input type="text"  placeholder="07031690110" className="rounded-[4px] outline-none border py-2 pl-[60px] pr- text-xs w-44"/>
              <p className=" bg-red-600 w-[53px] py-[8.3px] px-1 text-[11px] text-white absolute top-0">NG +234</p>
              <i className="fa-solid fa-xmark bg-gray-300 py-[4px] px-[6px] rounded-full text-white text-[10px] absolute top-2 right-[-26px] cursor-pointer"> </i>
              <div className=" w-44 h-9 border text-xs flex items-center px-3 justify-between rounded-[4px]">
                <p className="text-gray-400"> Select Account</p>
                <i className="fa-solid fa-caret-down text-gray-600 cursor-pointer"></i>
              </div>
              <div className=" w-44 h-9 border text-xs flex items-center px-3 justify-between rounded-[4px]">
                <p className="text-gray-400"> Select Service</p>
                <i className="fa-solid fa-caret-down text-gray-600 cursor-pointer"></i>
              </div>
              <button className="bg-red-600 py-2 text-sm text-white  w-44 rounded-[4px]">Continue</button>
              
            </div>
          </section>} 
          <section className="flex  justify-between items-center gap-1 mx-auto pb-4 pl-2 pr-2 w-48 bg-white rounded-lg drop-shadow-xl mt-4  pt-4">
            <p className=" text-sm">Customize Your Home</p>
            <i className="fa-solid fa-plus bg-gray-300 py-2 px-2.5 text-red-600 text-sm rounded-md cursor-pointer"></i>
          </section>
          

           
            


          <div className=" absolute ">
            <nav className="nav fixed w-[232px] h-10 bg-[#F1f1f1] border-b-[4px] border-black rounded-[18px] bottom-[67px] text-red-600   left-[26.5%] md:bottom-[67px] md:left-[41.5%]">
              <ul className="flex justify-around items-center gap-4 mt-1">
                <li className="flex flex-col items-center">
                  <i className="fa-solid fa-house cursor-pointer"></i>
                  <p className="text-xs">Home</p>
                </li>
                <li className="flex flex-col items-center">
                  <i className="fa-solid fa-bars cursor-pointer"></i>
                  <p className="text-xs">More</p>
                </li>
              </ul>
            </nav>
          </div>
          <div className=" relative"> 
            <section className="showCountries bg-white px-2.5 py-2 absolute w-full h-[280px] bottom-[-40px] z-10 rounded-lg">
              <div className="flex justify-between items-center" >
                <p className=" text-sm text-gray-400 pl-2">Customize Your Home</p>
                <button className="  bg-red-600 text-white text-xs py-1.5 px-3 rounded">Done</button>
              </div>
              <ul className=" mr-3 ml-1 mt-5">
                <li className="flex justify-between">
                  <p className=" text-gray-800">Services</p>
                  <input type="checkbox" className=" w-6 rounded-full" />
                </li>
                
              </ul>
            </section>
          </div> 

        </div>
      </main>
    </div>
  );
};
