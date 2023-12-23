import { useContext, useEffect, useState } from "react";
import { ScreenContent } from "./ScreenContent";
import { BgContext, MorePageContext} from "../MyContext";


export function PhoneDisplay() {
  const [showMorePage, setShowMorePage] = useState<boolean>(false);
  const [showContact, setShowContact] = useState<boolean>(false);
  const [showNews, setShowNews] = useState<boolean>(false);
  const [showInbox, setShowInbox] = useState<boolean>(false);
  const [showFaq, setShowFaq] = useState<boolean>(false);
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [showForgottenPage, setShowForgottenPage] = useState<boolean>(false);
  const [showNoti, setShowNoti] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showSignUpHomePage, setShowSignUpHomePage] = useState<boolean>(false);
  const [showHome, setShowHome] = useState<boolean>(false);
  const [hideHome, setHideHome] = useState<boolean>(true);
  const [showNairaSec, setShowNairaSec] = useState<boolean>(false);

  // const [pages, setPages] = useState<morePageType> ({
  //   showMorePage : false,
  //   showContact : false,
  //   showNews : false,
  //   showInbox: false,
  //   showFaq: false,
  //   showAbout: false,
  //   showForgottenPage: false,
  //   showNoti: false,
  //   showSignUp: false,
  //   showSignUpHomePage: false,
  //   showHome: false,

  // })

  // changing background
  const { bg, setBg } = useContext(BgContext);

  // getting current time
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-screen w-100% flex justify-center items-center ">
      <div
        className={`phone w-64 border-black border-4 border-solid overflow-hidden pb-20 ${bg}`}
      >
        <div className="header flex my-3 items-center mx-5 gap-5">
          <div className="time text-sm h-4 w-20   mx-1 overflow-hidden">
            <h1>
              {time.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </h1>
          </div>
          <div className="camera-container">
            <div className="camera-spot w-16 h-6 rounded-full bg-[#1c1a1a] py-2 ml-1">
              <div className="camera w-2 h-2 bg-gray-900 rounded-full ml-12"></div>
            </div>
          </div>
          <div className="icons flex gap-1 text-xs">
            <i className="icon fa-solid fa-signal"></i>
            <i className="icon fa-solid fa-wifi"></i>
            <i className="icon fa-solid fa-battery-half"></i>
          </div>
        </div>
        <MorePageContext.Provider
          value={{
            showMorePage,
            setShowMorePage,
            showContact,
            setShowContact,
            showNews,
            setShowNews,
            showInbox,
            setShowInbox,
            showFaq,
            setShowFaq,
            showAbout,
            setShowAbout,
            showNoti,
            setShowNoti,
            showSignUp,
            setShowSignUp,
            showSignUpHomePage,
            setShowSignUpHomePage,
            showForgottenPage,
            setShowForgottenPage,
            showHome,
            setShowHome,
            hideHome,
            setHideHome,
            showNairaSec,
            setShowNairaSec,
          }}
        >
          <ScreenContent />
        </MorePageContext.Provider>
      </div>
    </div>
  );
}
