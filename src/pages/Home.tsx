import React, { ChangeEvent, ReactNode, useContext, useEffect, useState } from "react";
import { BgContext, MorePageContext, UserInfo } from "../MyContext";
import sendSvg from "../assests/money-cash-svgrepo-com.svg";
import billSvg from "../assests/money-cash-svgrepo-com (1).svg";
import loadSvg from "../assests/history-svgrepo-com.svg";
import mobileSvg from "../assests/mobile2-svgrepo-com.svg";
import loanImage from "../assests/loan.jpeg";
import flag from "../assests/flag.jpeg";
import { Slider } from "../components/Slider";
import { SwiperSlide } from "swiper/react";
import { PopUP } from "../components/PopUP";
import successImg from "../assests/leo_uba_thubs_up.png";
import { Enaira } from "./Enaira";
import { QickLoan } from "./QickLoan";
import { Loading } from "../components/Loading";
import { MobileTopUp } from "./MobileTopUp";

interface selectType {
  item1?: boolean;
  item2?: boolean;
  item3?: boolean;
}
export interface selectedType {
  number: string ;
  account: string | ReactNode;
  service: string;
  btnText: string | ReactNode;
}
export interface displaySectionType {
  showIcon: boolean;
  showLoan: boolean;
  showEnaira: boolean;
  showService: boolean;
  showMobile: boolean;
  showCustomize: boolean;
  showBuySec: boolean;
  showAccDetailSec: boolean;
  showError: boolean;
  showLoader: boolean;
  showMobileSec2: boolean;
  showSucess: boolean;
  showFeedBack: boolean;
  showQickLoan : boolean;
  showMobilePage : boolean;
}
interface checkedType {
  checkLoan: boolean;
  checkNaira: boolean;
  checkService: boolean;
  checkMobile: boolean;
}
export interface stylesType {
  changeType: string;
  scroll: string;
  addHeight: string;
  addOpacity: string;
}

export const Home = () => {

  // contexts
  const { setBg } = useContext(BgContext);
  const { setShowNoti, hideHome, setHideHome, showNairaSec, setShowNairaSec } = useContext(MorePageContext);
  const user = useContext(UserInfo);

  // states
  const [reload, setReload] = useState<boolean>(true);
  const [clickTime, setClickTime] = useState<string>("");
  // const [balance, setBalance] = useState<string>("44444400.00");
  let [mobileAmount, setMobileAmount] = useState<number | undefined>(undefined);
  const [styles, setStyles] = useState<stylesType>({
    changeType: "",
    scroll: "home-wrapper",
    addHeight: "h-auto",
    addOpacity: "",
  });
  
  const [select, setSelect] = useState<selectType>({
    item1: false,
    item2: false,
    item3: false,
  });
  const [selected, setSelected] = useState<selectedType>({
    number: "07031690110",
    account: "Select Account",
    service: "Select Service",
    btnText: "Continue",
  });
  const [displaySection, setDisplaysection] = useState<displaySectionType>({
    showIcon: true,
    showLoan: true,
    showMobile: true,
    showCustomize: true,
    showService: true,
    showEnaira: true,
    showBuySec: false,
    showAccDetailSec: false,
    showError: false,
    showLoader: false,
    showMobileSec2: false,
    showSucess: false,
    showFeedBack: false,
    showQickLoan : false,
    showMobilePage : false,
  });

  const [checked, setChecked] = useState<checkedType>({
    checkLoan: true,
    checkMobile: true,
    checkNaira: true,
    checkService: true,
  });

  
  

  
  

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
  function updateInputValueHandler(e : ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(e.target.value);
    const displayValue = isNaN(newValue) ? undefined : newValue;
    setMobileAmount(displayValue);
  }
  function handleExitPopup( ) {
    setDisplaysection((prev) => ({...prev, showError: false, showSucess : false}))
    setStyles((prev) =>({...prev, addHeight :'h-auto'}))
    setStyles((prev) =>({...prev, addOpacity :''}))
  }

  function handleMobileBtn() : void {
    if (selected.btnText === "Continue ") {
      if (
        /^[0-9]+$/.test(selected.number) &&
        selected.number.length === 11 &&
        selected.account !== "Select Account" &&
        selected.service !== "Select Service"
      ) {
        setSelected((prev) => ({
          ...prev,
          btnText: (
            <div className="flex justify-center items-center h-full">
              <span className="loader"></span>
            </div>
          ),
        }));
        setTimeout(() => {
          setDisplaysection((prev) => ({ ...prev, showMobileSec2: true }));
          setSelected((prev) => ({ ...prev, btnText: "Confirm" }));
        }, 2000);
      } else if (
        /^[0-9]+$/.test(selected.number) &&
        selected.number.length !== 11 &&
        selected.account !== "Select Account" &&
        selected.service !== "Select Service"
      ) {
        setStyles((prev) => ({ ...prev, addOpacity: "opacity-0" }));
        setStyles((prev) => ({ ...prev, addHeight: "h-[600px]" }));
        setTimeout(() => {
          setDisplaysection((prev) => ({ ...prev, showError: true }));
        }, 4000);
      }
    }
    if (selected.btnText === "Confirm") {
      if (mobileAmount !== undefined &&( mobileAmount > 4 && mobileAmount <= 50000))  {
        setStyles((prev) => ({ ...prev, addOpacity: "opacity-0" }));
        setDisplaysection((prev) => ({ ...prev, showLoader: true }));
        setStyles((prev) => ({ ...prev, addHeight: "h-[600px]" }));
        setTimeout(() => {
          setDisplaysection((prev) => ({ ...prev, showLoader: false }));
          setDisplaysection((prev) => ({ ...prev, showSucess: true }));
        }, 4000);
        setDisplaysection((prev) => ({ ...prev, showMobileSec2: false }));
        setSelected((prev) => ({ ...prev, account: "Select Account" }));
        setSelected((prev) => ({ ...prev, service: "Select Service" }));
        setSelected((prev) => ({ ...prev, btnText: "Continue" }));
      }
      if (mobileAmount === undefined || mobileAmount < 5 || mobileAmount > 50000) {
        setDisplaysection((prev)=>({...prev, showFeedBack : true}))
      }
    }
  }
  

  function handleCustomize() {
    checked.checkService === false
      ? setDisplaysection((prev) => ({ ...prev, showService: false }))
      : setDisplaysection((prev) => ({ ...prev, showService: true }));
    checked.checkLoan === false
      ? setDisplaysection((prev) => ({ ...prev, showLoan: false }))
      : setDisplaysection((prev) => ({ ...prev, showLoan: true }));
    checked.checkNaira === false
      ? setDisplaysection((prev) => ({ ...prev, showEnaira: false }))
      : setDisplaysection((prev) => ({ ...prev, showEnaira: true }));
    checked.checkMobile === false
      ? setDisplaysection((prev) => ({ ...prev, showMobile: false }))
      : setDisplaysection((prev) => ({ ...prev, showMobile: true }));

    setDisplaysection((prev) => ({ ...prev, showCustomize: true }));
    setStyles((prev) => ({ ...prev, scroll: "home-wrapper" }));
  }
  
  return (
    <div>
      <div
        className={`text-white w-full h-full top-0 absolute left-0 showMorePage bg-[#000] ${styles.scroll} scroll-smooth md:h-[465px]`}
      >
        {hideHome && <main className=" h-full relative text-black">
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
                  {user.accountType}: <span className="tracking-wider">{user.accountNo}</span>
                </p>
                <div className="flex justify-center items-center gap-5 font-semibold mr-1 mt-2">
                  <h1 className="ml-6 ">
                    NGN{" "}
                    <span className={`${styles.changeType} text-xs `}>
                      {user.balance}
                    </span>
                  </h1>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (displaySection.showIcon === true) {
                        setStyles((prev) => ({
                          ...prev,
                          changeType: "my-class",
                        }));
                        setDisplaysection((prev) => ({
                          ...prev,
                          showIcon: false,
                        }));
                      } else {
                        setStyles((prev) => ({ ...prev, changeType: "" }));
                        setDisplaysection((prev) => ({
                          ...prev,
                          showIcon: true,
                        }));
                      }
                    }}
                  >
                    {displaySection.showIcon && (
                      <i className="fa-solid fa-eye fa-xs  text-gray-700"></i>
                    )}
                    {!displaySection.showIcon && (
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

          <div
            className={`bg-[#f1f1f1] w-full text-black ${styles.addHeight} pt-20 pb-[50px] overflow-hidden  min-h-full`}
          >
            <div className="bg-red-600 w-2.5 h-2.5 mx-auto rounded-full -mt-4 "></div>
            <div className={`relative ${styles.addOpacity }`}>
              {displaySection.showService && (
                <section className="sec-height mx-auto  w-48 bg-white rounded-lg drop-shadow-xl mt-2  pl-1.5 pt-2 ">
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

                    <li 
                      className="flex flex-col items-center gap-1 cursor-pointer"
                      onClick={()=> {
                        if (setHideHome !== undefined) {
                          setHideHome(false)
                        }
                        setBg("light-screen-mode");
                        setDisplaysection((prev) => ({...prev, showMobilePage : true}))
                        
                      }}
                      >
                      <div className="border-2 p-1.5 drop-shadow-lg bg-white">
                        <img src={mobileSvg} alt="icon" />
                      </div>
                      <p className="text-[8px]">Mobile</p>
                    </li>
                  </ul>
                </section>
              )}

              {/*<-------------------------loan sec ---------------------------> */}
              {displaySection.showLoan && (
                <section className="sec-height mx-auto  w-48 bg-white rounded-lg drop-shadow-xl mt-4 pl-1.5 pt-2">
                  <h2 className="text-sm font-[600]">Loans</h2>
                  <div 
                    className="w-24  mt-0.5 ml-1 cursor-pointer"
                    onClick={()=>{ 
                      if (setHideHome !== undefined){ 
                        setHideHome(false)
                        setDisplaysection((prev)=> ({...prev, showQickLoan : true}))
                        setBg("light-screen-mode");
                      }
                  
                  }}
                    >
                    <img
                      src={loanImage}
                      alt="loan"
                      className="rounded-md h-[50px]"
                    />
                    <p className="text-[11px] mt-[2px] ml-0.5">Quick Loans</p>
                  </div>
                </section>
              )}

              {/* -------------------Enaira sec-------------------------- */}
              {displaySection.showEnaira && (
                <section className=" relative mx-auto pb-4 w-48 bg-white rounded-lg drop-shadow-xl mt-4  pt-2">
                  <img
                    src="https://enaira.gov.ng/wp-content/uploads/2023/04/enaira-logo.jpg"
                    alt="eNaria"
                    className="h-10 w-24 ml-1.5"
                  />
                  <div className=" absolute top-0 left-[49px] w-24 h-10 bg-white pt-2">
                    <p className="text-gray-600 text-lg font-[500] -mt-1">
                      eNaira
                    </p>
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
                      Secure,fast & easy way to deposit & withdraw & funds from /
                      to your UBA app
                    </p>
                  </div>
                  <div className="flex justify-center mt-3">
                    <button 
                      className="bg-red-600 w-[90%] h-8 rounded-md text-white text-sm"
                      onClick={()=> {
                        if (setShowNairaSec && setHideHome !== undefined) {
                          setShowNairaSec(true)
                          setHideHome(false)
                        }
                        setBg("light-screen-mode");
                        setDisplaysection((prev) => ({...prev, showNairaSec : true}))
                        
                      }}
                      >
                      Get Started{" "}
                    </button>
                  </div>
                </section>
              )}

              {/* --------------------------------mobile sec------------------------------- */}
              {displaySection.showMobile && (
                <section className="relative mx-auto pb-4 pl-2 pr-2 w-48 bg-white rounded-lg drop-shadow-xl mt-4  pt-3">
                  <h2 className=" text-sm font-bold mb-2">Mobile Top up</h2>
                  <p className="text-[11px]">Customer Mobile Number</p>
                  <div className="mr-8 relative flex flex-col gap-4">
                    <input
                      type="text"
                      value={selected.number}
                      className="rounded-[4px] outline-none border py-2 pl-[60px] pr- text-xs w-44 text-gray-600"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSelected((prev) => ({
                          ...prev,
                          number: e.target.value,
                        }));
                      }}
                    />
                    <p className=" bg-red-600 w-[53px] py-[8.3px] px-1 text-[11px] text-white absolute top-0">
                      NG +234
                    </p>
                    <i 
                      className="fa-solid fa-xmark bg-gray-300 py-[4px] px-[6px] rounded-full text-white text-[10px] absolute top-2 right-[-26px] cursor-pointer"
                      onClick={()=> {
                        setSelected((prev)=> ({...prev, number : ''}))
                      }}
                      ></i>
                    <div
                      className=" w-44 h-9 border text-xs flex items-center px-3 justify-between rounded-[4px] cursor-pointer"
                      onClick={() => {
                        setDisplaysection((prev) => ({
                          ...prev,
                          showBuySec: false
                        }))
                        displaySection.showAccDetailSec === false
                        ? setDisplaysection((prev) => ({
                          ...prev,
                          showAccDetailSec: true
                        }))
                        : setDisplaysection((prev) => ({
                          ...prev,
                          showAccDetailSec: false
                        }));
                      }}
                    >
                      <div className="text-gray-600">{selected.account}</div>
                      <i className="fa-solid fa-caret-down text-gray-600"></i>
                    </div>
                    <div
                      className=" w-44 h-9 border text-xs flex items-center px-3 justify-between rounded-[4px] cursor-pointer"
                      onClick={() => {
                        displaySection.showBuySec === false
                          ? setDisplaysection((prev) => ({
                              ...prev,
                              showBuySec: true,
                            }))
                          : setDisplaysection((prev) => ({
                              ...prev,
                              showBuySec: false,
                            }));
                      }}
                    >
                      <p className="text-gray-600">{selected.service}</p>
                      <i className="fa-solid fa-caret-down text-gray-600"></i>
                    </div>
                    {displaySection.showMobileSec2 && (
                      <div>
                        <div className=" flex justify-center items-center gap-4 ml-6 -mt-3">
                          <img src={flag} alt="flag" className=" w-5 h-3 " />
                          <p className=" text-xs">Nigeria</p>
                        </div>
                        <Slider className="w-44 mt-5">
                          <SwiperSlide>Nigeria MTN</SwiperSlide>
                          <SwiperSlide>Nigeria Airtel</SwiperSlide>
                          <SwiperSlide>Nigeria Glo</SwiperSlide>
                          <SwiperSlide>Nigeria 9Mobile</SwiperSlide>
                        </Slider>
                        <div className=" text-xs  ml-9 my-4 text-center">
                          Enter Amount From <p>5 to 50000 NGN</p>
                        </div>

                        <div className=" flex w-4 h-10 item-center gap-2 mx-1.5 mt-5">
                          <i
                            className="fa-solid fa-minus  border-red-600 border px-3 pt-1 mt-1 h-6 rounded-lg text-xs hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                              if (
                                mobileAmount !== undefined &&
                                mobileAmount !== 0
                              )
                                setMobileAmount(mobileAmount--);
                            }}
                          ></i>
                          <input
                            type="text"
                            className=" w-20 h-8 border rounded-sm border-gray-300 outline-none text-xs px-1 text-center"
                            value={mobileAmount}
                            placeholder="Amount"
                            onChange={updateInputValueHandler}
                          />
                          <i
                            className="fa-solid fa-plus  border-red-600 border px-3 pt-1 mt-1 h-6 rounded-lg text-xs hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                              setMobileAmount(0);
                              if (mobileAmount !== undefined)
                                setMobileAmount(mobileAmount++);
                            }}
                          ></i>
                        </div>
                        {displaySection.showFeedBack && <div className=" text-[10px] text-red-600 text-center w-28 ml-9 leading-3 -mt-1">
                          {mobileAmount === undefined ? (
                            <p>please enter correct amount number</p>
                          ) : mobileAmount !== undefined && (mobileAmount < 5 || mobileAmount > 50000) ? (
                            <p>please Enter Amount From 5.0 to 50000.0 NGN </p>
                          ) : ""}
                        </div>}
                      </div>
                    )}
                    <button
                      className="bg-red-600 py-2 text-sm text-white  w-44 rounded-[4px]"
                      onClick={handleMobileBtn}
                    >
                      {selected.btnText}
                    </button>
                  </div>
                </section>
              )}

              {/* -------------------------customize sec ---------------------- */}
              {displaySection.showCustomize && (
                <section className="flex  justify-between items-center gap-1 mx-auto pb-4 pl-2 pr-2 w-48 bg-white rounded-lg drop-shadow-xl mt-4  pt-4">
                  <p className=" text-sm">Customize Your Home</p>
                  <i
                    className="fa-solid fa-plus bg-gray-300 py-2 px-2.5 text-red-600 text-sm rounded-md cursor-pointer"
                    onClick={() => {
                      setDisplaysection((prev) => ({
                        ...prev,
                        showCustomize: false,
                      }));
                      setStyles((prev) => ({ ...prev, scroll: "" }));
                    }}
                  ></i>
                </section>
              )}

              {/* ------------------footer----------------------------- */}
              <div className=" relative ">
                <nav className="nav fixed w-[232px] h-10 bg-[#F1f1f1] border-b-[4px] border-black rounded-[18px] bottom-[67px] text-red-600  -ml-[115px] left-[50%] ">
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

              {/*------------------------------------ customize select section-------------------- */}
              {!displaySection.showCustomize && (
                <section className="showCountries bg-white px-2.5 py-2 absolute w-full h-[280px] top-0  z-10 rounded-lg">
                  <div className="flex justify-between items-center">
                    <p className=" text-sm text-gray-400 pl-2">
                      Customize Your Home
                    </p>
                    <button
                      className="  bg-red-600 text-white text-xs py-1.5 px-3 rounded"
                      onClick={handleCustomize}
                    >
                      Done
                    </button>
                  </div>
                  <ul className=" mr-3 ml-1 mt-8 flex flex-col gap-7">
                    <li
                      className="flex justify-between"
                      onClick={() =>
                        checked.checkService === true
                          ? setChecked((prev) => ({
                              ...prev,
                              checkService: false,
                            }))
                          : setChecked((prev) => ({
                              ...prev,
                              checkService: true,
                            }))
                      }
                    >
                      <label className=" text-gray-800">Services</label>
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={checked.checkService}
                      />
                    </li>
                    <li
                      className="flex justify-between"
                      onClick={() =>
                        checked.checkLoan === true
                          ? setChecked((prev) => ({ ...prev, checkLoan: false }))
                          : setChecked((prev) => ({ ...prev, checkLoan: true }))
                      }
                    >
                      <label className=" text-gray-800">Loan</label>
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={checked.checkLoan}
                      />
                    </li>
                    <li
                      className="flex justify-between"
                      onClick={() =>
                        checked.checkNaira === true
                          ? setChecked((prev) => ({ ...prev, checkNaira: false }))
                          : setChecked((prev) => ({ ...prev, checkNaira: true }))
                      }
                    >
                      <label className=" text-gray-800">eNaira</label>
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={checked.checkNaira}
                      />
                    </li>
                    <li
                      className="flex justify-between"
                      onClick={() =>
                        checked.checkMobile === true
                          ? setChecked((prev) => ({
                              ...prev,
                              checkMobile: false,
                            }))
                          : setChecked((prev) => ({ ...prev, checkMobile: true }))
                      }
                    >
                      <label className=" text-gray-800">Mobile Top Up</label>
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={checked.checkMobile}
                      />
                    </li>
                  </ul>
                </section>
              )}

              {/*---------------------------- mobile service section--------------------------- */}

              {displaySection.showBuySec && (
                <ul className=" showCountries bg-white px-2.5 py-3 absolute w-full h-[70px] bottom-[75px]  z-10 rounded-lg ">
                  <li
                    className="flex justify-between pb-3 cursor-pointer"
                    onClick={() => {
                      setSelect((prev) => ({
                        ...prev,
                        item1: true,
                        item2: false,
                      }));
                      setSelected((prev) => ({
                        ...prev,
                        service: "Buy Airtime",
                      }));
                      setDisplaysection((prev) => ({
                        ...prev,
                        showBuySec: false,
                      }));
                    }}
                  >
                    <p className=" text-xs ">Buy Airtime</p>
                    {select.item1 && (
                      <i className="fa-solid fa-check text-red-600"></i>
                    )}
                  </li>
                  <li
                    className="flex justify-between cursor-pointer"
                    onClick={() => {
                      setSelect((prev) => ({
                        ...prev,
                        item1: false,
                        item2: true,
                      }));
                      setSelected((prev) => ({
                        ...prev,
                        service: "Buy Data",
                      }));
                      setDisplaysection((prev) => ({
                        ...prev,
                        showBuySec: false,
                      }));
                    }}
                  >
                    <p className=" text-xs ">Buy Data</p>
                    {select.item2 && (
                      <i className="fa-solid fa-check text-red-600"></i>
                    )}
                  </li>
                </ul>
              )}

              {/* **************************************mobile select Account******************* */}
              {displaySection.showAccDetailSec && (
                <section
                  className=" showCountries bg-white px-2.5 flex items-center absolute w-full h-[105px] bottom-[88px]  z-10 rounded-lg cursor-pointer"
                  onClick={() => {
                    setSelect((prev) => ({ ...prev, item3: true }));
                    setSelected((prev) => ({
                      ...prev,
                      account: (
                        <div className=" -mx-2 text-gray-700">
                          <div className="flex justify-between items-center">
                            <p className=" uppercase text-[8px] ">
                              {user.fullName}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-[8px]">
                              {user.accountType}:
                              <span className="tracking-wider">{user.accountNo}</span>
                            </p>
                            <p className="text-[8px] font-semibold ml-2">
                              NGN <span className={`  `}>{user.balance}</span>
                            </p>
                          </div>
                        </div>
                      ),
                    }));
                    setDisplaysection((prev) => ({
                      ...prev,
                      showAccDetailSec: false,
                    }));
                  }}
                >
                  <div className=" flex flex-col gap-3 ">
                    <div className="flex justify-between items-center">
                      <p className=" uppercase text-xs mb-1">{user.fullName}</p>
                      {select.item3 && (
                        <i className="fa-solid fa-check text-red-600"></i>
                      )}
                    </div>
                    <div className="flex justify-between gap-6 items-center">
                      <p className="text-[10px]">
                        Account:{" "}
                        <span className="tracking-wider">2763732737</span>
                      </p>
                      <p className="text-[10px] font-semibold">
                        NGN <span className={`  `}>{user.balance}</span>
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
          
          {displaySection.showLoader && <Loading className='absolute top-[480px] left-4'/> }
          {displaySection.showError && (
            <PopUP
              icon={
                <i className="fa-solid fa-xmark bg-red-600 py-3 px-5 rounded-full text-white text-2xl"></i>
              }
              onClick={handleExitPopup}
              className='absolute top-[330px] left-4'
              title="Failed"
              msg="Invalid mobile number, please use the right phone number format and retry"
            />
          )}

          {displaySection.showSucess && (
            <PopUP
              onClick={handleExitPopup}
              icon={
                <div className="successImg">
                  <img src={successImg} alt="thumb up" />
                </div>
              }
              className="absolute top-[330px] left-4"
              title="Success"
              msg={`Your ${
                selected.service === "Buy Airtime" ? "Airtime" : "Data"
              } topup was Successful`}
              />
          )}
          </main>}
          {displaySection.showQickLoan && <QickLoan  setDisplaysection={setDisplaysection}/>}
      </div>
        {showNairaSec && <Enaira setDisplaysection={setDisplaysection} setStyles={setStyles} />}
        {displaySection.showMobilePage && <MobileTopUp selected={selected} setSelected={setSelected} mobileAmount={mobileAmount} setMobileAmount={setMobileAmount} updateInputValueHandler={updateInputValueHandler} setDisplaysection={setDisplaysection}/>}
    </div>

  );
};
