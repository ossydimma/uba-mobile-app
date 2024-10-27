import React, { useContext, useState } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { BgContext, MorePageContext } from "../MyContext";
import type { displaySectionType } from "./Home";
import { EmptyPage } from "./EmptyPage";
import sendSvg from "../assests/money-cash-svgrepo-com.svg";
import billSvg from "../assests/money-cash-svgrepo-com (1).svg";
import loadSvg from "../assests/history-svgrepo-com.svg";
import mobileSvg from "../assests/mobile2-svgrepo-com.svg";
import { PopUP } from "../components/PopUP";
import { Loading } from "../components/Loading";
export interface homeDisplaytype {
  setDisplaysection: React.Dispatch<React.SetStateAction<displaySectionType>>;
}

export const LifeStyle = ({ setDisplaysection }: homeDisplaytype) => {
  // contexts
  const { setBg } = useContext(BgContext);
  const { setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);

  const [display, setDisplay] = useState({
    loader: false,
    popUp: false,
    opacity : ''
  });
  function handleClick() {
    setDisplay((prev)=> ({...prev, opacity : 'opacity-5'}))
    setDisplay((prev)=> ({...prev, loader: true}))
    setTimeout(()=> {
        setDisplay((prev)=> ({...prev, loader: false}))
        setDisplay((prev)=> ({...prev, popUp: true}))
    },2000)
  }
  return (
    <section className=" text-black w-full h-screen top-0 absolute left-0 showMorePage bg-white">
      <div className={`${display.opacity}`}>
        <MoreHeader
          name="Lifestyle"
          onClick={() => {
            if (setHideHome !== undefined) {
              setDisplaysection((prev) => ({
                ...prev,
                showLifeStylePage: false,
              }));
              setHideHome(true);
              setBg("dark-screen-mode");
            }
          }}
        />
        <div className=" w-[90%] mt-4 h-auto  mx-auto pb-5 sm:pb-4 border border-gray-300 rounded-lg overflow-hidden bg-[#f1f1f1]">
          <h2 className=" text-center font-semibold py-5 sm:py-3 text-2xl sm:text-sm ">Service</h2>
          <div>
            <ul className="w-full h-full flex items-center justify-evenly  sm:-mt-3">
              <li className="flex flex-col items-center  cursor-pointer" onClick={handleClick}>
                <div className=" p-1.5  ">
                  <img src={sendSvg} alt="icon" className=" w-12 sm:w-7 " />
                </div>
                <p className="text-lg sm:text-[11px]">Sport</p>
              </li>

              <li className="flex flex-col items-center  cursor-pointer" onClick={handleClick}>
                <div className=" p-1.5    ">
                  <img src={loadSvg} alt="icon" className="  w-12 sm:w-7 " />
                </div>
                <p className="text-lg sm:text-[11px] text-center">Event</p>
              </li>

              <li
                className="flex flex-col items-center  cursor-pointer" onClick={handleClick}
                
              >
                <div className=" p-1.5   ">
                  <img src={billSvg} alt="icon" className="  w-12 sm:w-7 " />
                </div>
                <p className="text-lg sm:text-[11px]">Lifestyle</p>
              </li>

              <li
                className="flex flex-col items-center  cursor-pointer" onClick={handleClick}
              >
                <div className=" p-1.5  ">
                  <img src={mobileSvg} alt="icon" className="  w-12 sm:w-7 " />
                </div>
                <p className="text-lg sm:text-[11px]">Movies</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showNoti && (
        <EmptyPage
          pageName="Notification"
          article="There Are No Notification"
          onClick={() => {
            if (setShowNoti !== undefined) {
              setShowNoti(false);
            }
          }}
        />
      )}
      {display.loader && <Loading className="absolute top-[180px] left-[6rem] sm:left-4" />}
      {display.popUp && (
        <PopUP
          icon={
            <i className="fa-solid fa-xmark bg-red-600 py-3 px-5 rounded-full text-white text-2xl"></i>
          }
          onClick={() => {
            setDisplay((prev)=> ({...prev, opacity : ''}))
            setDisplay((prev)=> ({...prev, popUp: false}))
          }}
          className="absolute top-[75px] left-[5rem] sm:left-5 border border-gray-300"
          title="Failed"
          msg="Service not avaliable at the moment"
        />
      )}
    </section>
  );
};
