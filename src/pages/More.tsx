import { useContext } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { BgContext, MorePageContext} from "../MyContext";
import { Contact } from "./Contact";
import { EmptyPage } from "./EmptyPage";
import { About } from "./About";
import { Faq } from "./Faq";
// import { backGroundType } from "../components/ScreenContent";

interface showMorePageType {
  setShowMorePage: React.Dispatch<React.SetStateAction<boolean>>
}

export const More = ( ) => {
  const {bg, setBg} = useContext(BgContext)
  const {showContact, setShowContact, showInbox, setShowInbox, showAbout, setShowAbout, showFaq, setShowFaq, showNoti } = useContext(MorePageContext)
  function handleContactPage() : void {
    if (setShowContact !== undefined) {
      setShowContact(true);
    }
  }
  function handleInboxPage() : void {
    if (setShowInbox !== undefined) {
      setShowInbox(true);
    }
  }
  function handleAboutPage() : void {
    if (setShowAbout !== undefined) {
      setShowAbout(true);
    }
  }
  function handleFaqPage() : void {
    if (setShowFaq !== undefined) {
      setShowFaq(true);
    }
  }
  return (
    <div>
      <section className="bg-white text-black w-full h-screen top-0 absolute left-0 showMorePage">
        <MoreHeader name="more"/>
          <ul className="text-sm flex flex-col gap-3 mx-2 mt-1">
            <li >
              <article onClick={handleContactPage} className="more-items cursor-pointer flex items-center justify-between pb-2 border-b-2 ">
                <p>Contact Us</p>
                <i className="fa-solid fa-angle-right"></i>
              </article>
            </li>
            <li>
              <article onClick={handleInboxPage} className="more-items cursor-pointer flex items-center justify-between pb-2 border-b-2">
                <p>Inbox</p>
                <i className="fa-solid fa-angle-right"></i>
              </article>
            </li>
            <li>
              <article onClick={handleFaqPage} className="more-items cursor-pointer flex items-center justify-between pb-2 border-b-2">
                <p>FAQ</p>
                <i className="fa-solid fa-angle-right"></i>
              </article>
            </li>
            <li>
              <article className="more-items cursor-pointer flex items-center justify-between pb-2 border-b-2">
                <p>Tour</p>
                <i className="fa-solid fa-angle-right"></i>
              </article>
            </li>
            <li>
              <article onClick={handleAboutPage} className="more-items cursor-pointer flex items-center justify-between pb-2 border-b-2">
                <p>About</p>
                <i className="fa-solid fa-angle-right"></i>
              </article>
            </li>
          </ul>
          <div className="medias flex gap-3 text-sm justify-center mt-16 text-white ">
            <i className="fa-brands fa-twitter bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
            <i className="fa-brands fa-instagram bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
            <i className="fa-brands fa-square-youtube bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
            <i className="fa-brands fa-facebook bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
          </div>
          <p className="text-center text-sm mt-3 font-black">Ubagroup</p>
      </section>
      { showNoti &&<EmptyPage pageName="Notification" article="There Are No Notification" />}
      {showContact && <Contact />}
     {showInbox && <EmptyPage pageName='Inbox' article='No Message Found'/>}
      {showFaq && <Faq />}
     {showAbout && <About />}
    </div>
  );
};
