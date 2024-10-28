import { useContext, useState } from "react";
import { homeDisplaytype } from "./LifeStyle";
import { BgContext, MorePageContext } from "../MyContext";
import { EmptyPage } from "./EmptyPage";
import { Contact } from "./Contact";
import { Faq } from "./Faq";
import { About } from "./About";
import { BankServices } from "./BankServices";
import { Settings } from "./Settings";

export interface showType {
  services: boolean;
  settings: boolean;
}

export const MoreFeatures = ({ setDisplaysection }: homeDisplaytype) => {
  const {
    setHideHome,
    showContact,
    setShowMorePage,
    setShowNoti,
    setShowContact,
    showInbox,
    setShowInbox,
    showAbout,
    setShowAbout,
    showFaq,
    setShowFaq,
    showNoti,
    setShowHome,
  } = useContext(MorePageContext);

  const [show, setShow] = useState<showType>({
    services: false,
    settings: false,
  });

  const { setBg } = useContext(BgContext);
  return (
    <div className=" bg-white h-screen w-full absolute top-0 text-black home-wrapper">
      <nav className="more-menu flex justify-between items-center pb-2 pl-8 pr-3 shadow-md shadow-gray-400">
        <h2 className="font-semibold">More</h2>
        <i
          className="fa-regular fa-bell text-gray-400 text-xl cursor-pointer"
          onClick={() => {
            if (setShowNoti && setHideHome !== undefined) {
              setHideHome(false);
              setBg("light-screen-mode");
              setShowNoti(true);
            }
          }}
        ></i>
      </nav>
      <main>
        <ul className="text-lg sm:text-sm flex flex-col  mx-2 mt-2">
          <li
            className=" flex justify-between items-center py-3 border-b  "
            onClick={() => setShow((prev) => ({ ...prev, services: true }))}
          >
            <span>Bank Services</span>
            <i className="fa-solid fa-angle-right"></i>
          </li>
          <li
            className=" flex justify-between items-center py-3 border-b  "
            onClick={() => setShow((prev) => ({ ...prev, settings: true }))}
          >
            <span>Settings</span>
            <i className="fa-solid fa-angle-right"></i>
          </li>

          <li
            className=" flex justify-between items-center py-3 border-b"
            onClick={() => {
              if (setShowInbox !== undefined) {
                setShowInbox(true);
              }
            }}
          >
            <span>My Inbox</span>
            <i className="fa-solid fa-angle-right"></i>
          </li>
          <li
            className=" flex justify-between items-center py-3 border-b "
            onClick={() => {
              if (setShowNoti && setHideHome) {
                setHideHome(false);
                setBg("light-screen-mode");
                setShowNoti(true);
              }
            }}
          >
            <span>Notification Center</span>
            <i className="fa-solid fa-angle-right"></i>
          </li>
          <li
            className=" flex justify-between items-center py-3 border-b"
            onClick={() => {
              if (setShowFaq !== undefined) {
                setShowFaq(true);
              }
            }}
          >
            <span>FAQ</span>
            <i className="fa-solid fa-angle-right"></i>
          </li>
          <li
            className=" flex justify-between items-center py-3 border-b"
            onClick={() => {
              if (setShowAbout !== undefined) {
                setShowAbout(true);
              }
            }}
          >
            <span>About</span>
            <i className="fa-solid fa-angle-right"></i>
          </li>
          <li
            className=" flex justify-between items-center py-3 border-b"
            onClick={() => {
              if (setShowContact !== undefined) {
                setShowContact(true);
              }
            }}
          >
            <span>Contact us</span>
            <i className="fa-solid fa-angle-right"></i>
          </li>
          <li className=" flex justify-between items-center py-3  text-red-600 ">
            <p
              className=" bg-black"
              onClick={() => {
                if (setShowHome) {
                  setBg("phone-deafult-screen");
                  setShowHome(false);
                }
              }}
            >
              Log Out
            </p>
          </li>
        </ul>
      </main>
      {/* ----------------------NAV----------------------------- */}
      <div className=" fixed bottom-[19%] md:bottom-[30%] lg:bottom-[19%]  ">
        <nav
          className="flex flex-col items-center text-[red] bg-white ml-[180px] border border-[red] sm:py-2 py-3 sm:px-3 px-4 rounded-full shadow-2xl"
          onClick={() => {
            if (setHideHome) {
              setHideHome(true);
            }
            setBg("dark-screen-mode");
            setDisplaysection((prev) => ({ ...prev, showMore: false }));
          }}
        >
          <i className="fa-solid fa-house cursor-pointer text-xl sm:text-sm"></i>
          <p className="sm:text-[10px]">Home</p>
        </nav>
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
      {showContact && <Contact />}
      {showInbox && (
        <EmptyPage
          pageName="Inbox"
          article="No Message Found"
          onClick={() => {
            if (setShowInbox !== undefined) {
              setShowInbox(false);
            }
          }}
        />
      )}
      {showFaq && <Faq />}
      {showAbout && <About />}
      {show.services && (
        <BankServices setShow={setShow} setDisplaysection={setDisplaysection} />
      )}
      {show.settings && (
        <Settings setShow={setShow} setDisplaysection={setDisplaysection} />
      )}
    </div>
  );
};
