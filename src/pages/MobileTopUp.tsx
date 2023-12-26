import React, { ChangeEvent, useContext, useState } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { BgContext, MorePageContext, UserInfo } from "../MyContext";
import type { selectedType, displaySectionType } from "./Home";
import { Slider } from "../components/Slider";
import { SwiperSlide } from "swiper/react";
import flag from "../assests/flag.jpeg";
import { Loading } from "../components/Loading";
import { PopUP } from "../components/PopUP";
import successImg from "../assests/leo_uba_thubs_up.png";
import { EmptyPage } from "./EmptyPage";

interface selectType {
  selected: selectedType;
  setSelected: React.Dispatch<React.SetStateAction<selectedType>>;
  mobileAmount: number | undefined;
  setMobileAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
  updateInputValueHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  setDisplaysection: React.Dispatch<React.SetStateAction<displaySectionType>>;
}

export const MobileTopUp = ({
  selected,
  setSelected,
  mobileAmount,
  setMobileAmount,
  updateInputValueHandler,
  setDisplaysection,
}: selectType) => {
  // contexts
  const { setBg } = useContext(BgContext);
  const user = useContext(UserInfo);
  const { setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);

  const [display, setDisplay] = useState({
    feedBack: false,
    loader: false,
    popUp: false,
    confirmDiv: false,
  });
  const [addStyles, setAddStyle] = useState({
    scroll: "home-wrapper",
    opacity: "",
  });

  function handleMobileBtn() {
    if (
      selected.btnText === "Continue" &&
      /^[0-9]+$/.test(selected.number) &&
      selected.number.length === 11
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
        setDisplay((prev) => ({ ...prev, confirmDiv: true }));
        setSelected((prev) => ({ ...prev, btnText: "Confirm" }));
      }, 2000);
    }

    if (selected.btnText === "Confirm") {
      if (
        mobileAmount !== undefined &&
        mobileAmount > 4 &&
        mobileAmount <= 50000
      ) {
        setAddStyle((prev) => ({ ...prev, opacity: "opacity-[0.06]" }));
        setAddStyle((prev) => ({ ...prev, scroll: "" }));
        setDisplay((prev) => ({ ...prev, loader: true }));
        setTimeout(() => {
          setDisplay((prev) => ({ ...prev, loader: false }));
          setDisplay((prev) => ({ ...prev, popUp: true }));
        }, 2000);
      }
      if (
        mobileAmount === undefined ||
        mobileAmount < 5 ||
        mobileAmount > 50000
      ) {
        setDisplay((prev) => ({ ...prev, feedBack: true }));
      }
    }
  }
  return (
    <div
      className={`   text-black w-full h-screen top-0 absolute left-0 showMorePage bg-white ${addStyles.scroll}`}
    >
      <div className={`${addStyles.opacity}`}>
        <MoreHeader
          name="Mobile Top-up"
          onClick={() => {
            if (setHideHome !== undefined) {
              setDisplaysection((prev) => ({ ...prev, showMobilePage: false }));
              setHideHome(true);
              setBg("dark-screen-mode");
            }
          }}
        />
        <main className=" px-3 pt-2 ">
          <section className=" w-[100%] h-auto  y-3 border border-gray-300 rounded-3xl overflow-hidden">
            <p className="text-sm pl-2.5 font-semibold  bg-gray-200 py-3 ">
              Pay from
            </p>
            <div className=" py-2">
              <p className="text-sm text-center ">{user.fullName}</p>
              <p className="text-xs text-center ">
                {user.accountType}: <span className="">{user.accountNo}</span>
              </p>
              <p className="text-[11px] text-center ">
                NGN<span className={` `}>{user.balance}</span>
              </p>
            </div>
          </section>
          <section className="relative w-[100%] h-auto pb-5 y-3 border border-gray-300  bg-white rounded-3xl drop-shadow-xl mt-4 mb-8 overflow-hidden">
            <h2 className=" text-sm pl-2.5 font-semibold  bg-gray-200 py-3 ">
              Mobile Top up
            </h2>
            <p className="text-[11px] px-3 mt-3">Customer Mobile Number</p>
            <div className="mr-8 relative flex flex-col gap-4 px-3 ">
              <input
                type="text"
                value={selected.number}
                className="rounded-md outline-none border py-2 pl-[60px] pr- text-xs w-[190px] text-gray-600"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSelected((prev) => ({
                    ...prev,
                    number: e.target.value,
                  }));
                }}
              />
              <p className=" bg-red-600 w-[53px] py-[8.3px] px-1 text-[11px] text-white absolute top-0 rounded-s-md">
                NG +234
              </p>
              <i
                className="fa-solid fa-xmark bg-gray-300 py-[4px] px-[6px] rounded-full text-white text-[10px] absolute top-2 right-[-15px] cursor-pointer"
                onClick={() => {
                  setSelected((prev) => ({
                    ...prev,
                    number: "",
                  }));
                }}
              ></i>
              <Slider className="w-[180px] my-3">
                <SwiperSlide>Buy Airtime</SwiperSlide>
                <SwiperSlide>Buy Data</SwiperSlide>
              </Slider>
              {display.confirmDiv && (
                <div>
                  <div className=" flex justify-center items-center gap-4 ml-10 mt-3">
                    <img src={flag} alt="flag" className=" w-5 h-3 " />
                    <p className=" text-xs">Nigeria</p>
                  </div>

                  <Slider className="w-[180px] my-8">
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
                        if (mobileAmount !== undefined && mobileAmount !== 0)
                          setMobileAmount(mobileAmount--);
                      }}
                    ></i>
                    <input
                      type="text"
                      className=" w-[85px] h-8 border rounded-sm border-gray-300 outline-none text-xs px-1 text-center"
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
                  {display.feedBack && (
                    <div className=" text-[10px] text-red-600 text-center w-28 ml-9 leading-3 -mt-1">
                      {mobileAmount === undefined ? (
                        <p>please enter correct amount number</p>
                      ) : mobileAmount !== undefined &&
                        (mobileAmount < 5 || mobileAmount > 50000) ? (
                        <p>please Enter Amount From 5.0 to 50000.0 NGN </p>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
              )}
              <button
                className="bg-red-600 py-2 text-sm text-white  w-[190px] rounded-[4px]"
                onClick={handleMobileBtn}
              >
                {selected.btnText}
              </button>
            </div>
          </section>
        </main>
      </div>
      {display.loader && <Loading className="absolute top-[170px] left-4" />}
      {display.popUp && (
        <PopUP
          onClick={() => {
            setAddStyle((prev) => ({ ...prev, opacity: "" }));
            setAddStyle((prev) => ({ ...prev, scroll: "home-wrapper" }));
            setDisplay((prev) => ({ ...prev, popUp: false }));
            setDisplay((prev) => ({ ...prev, confirmDiv: false }));
          }}
          icon={
            <div className="successImg">
              <img src={successImg} alt="thumb up" />
            </div>
          }
          className="absolute top-[65px] left-5 border border-gray-300"
          title="Success"
          msg={`Your ${
            selected.service === "Buy Airtime" ? "Airtime" : "Data"
          } topup was Successful`}
        />
      )}
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
    </div>
  );
};
