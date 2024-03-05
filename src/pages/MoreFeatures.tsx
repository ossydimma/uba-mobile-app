import { useContext, useState } from "react";
import { homeDisplaytype } from "./LifeStyle";
import { BgContext, MorePageContext } from "../MyContext";
import { EmptyPage } from "./EmptyPage";
import { Contact } from "./Contact";
import { Faq } from "./Faq";
import { About } from "./About";
import { BankServices } from "./BankServices";

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

  const [showServices, setShowServices] = useState<boolean>(false)

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
        <ul className="text-sm flex flex-col  mx-2 mt-2">
          <li 
            className=" flex justify-between items-center py-3 border-b  "
            onClick={()=> setShowServices(true)}
            >
            <span>Bank Services</span>
            <i className="fa-solid fa-angle-right"></i>
          </li>
    
          <li 
            className=" flex justify-between items-center py-3 border-b"
            onClick={()=> {
                if (setShowInbox !== undefined) {
                setShowInbox(true);
              }}}
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
            onClick={()=> {
                if (setShowFaq !== undefined) {
                setShowFaq(true);
              }}}
            >
            <span>FAQ</span>
            <i className="fa-solid fa-angle-right"></i>
          </li>
          <li 
            className=" flex justify-between items-center py-3 border-b"
            onClick={()=> {
                if (setShowAbout !== undefined) {
                setShowAbout(true);
              }}}
            >
            <span>About</span>
            <i className="fa-solid fa-angle-right"></i>
          </li>
          <li 
            className=" flex justify-between items-center py-3 border-b"
            onClick={()=> {
                if (setShowContact !== undefined) {
                setShowContact(true);
              }}}
            >
            <span>Contact us</span>
            <i className="fa-solid fa-angle-right"></i>
          </li>
          <li 
            className=" flex justify-between items-center py-3  text-red-600 "
            onClick={()=> {
              
              if(setShowHome) {
                setBg("phone-deafult-screen");
                setShowHome(false)
                }

            }}
            >
            <span>Log Out</span>
          </li>
        </ul>
      </main>
      {/* ------------------footer----------------------------- */}
      <div className=" relative ">
        <nav className=" fixed w-[232px] h-10    bottom-[70px]  -ml-[115px] left-[50%] ">
          <ul className="flex justify-around items-center gap-4 mt-1">
            <li
              className="flex flex-col items-center"
              onClick={() => {
                if (setHideHome) {
                  setHideHome(true);
                }
                setBg("dark-screen-mode");
                setDisplaysection((prev) => ({ ...prev, showMore: false }));
              }}
            >
              <i className="fa-solid fa-house cursor-pointer"></i>
              <p className="text-xs">Home</p>
            </li>
            <li className="flex flex-col items-center text-red-600">
              <i className="fa-solid fa-bars cursor-pointer"></i>
              <p className="text-xs">More</p>
            </li>
          </ul>
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
      {showServices && <BankServices setShowServices={setShowServices} setDisplaysection={setDisplaysection}/>}
    </div>
  );
};
