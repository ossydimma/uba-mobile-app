import { useContext } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { BgContext, MorePageContext } from "../MyContext";
import { Contact } from "./Contact";
import { EmptyPage } from "./EmptyPage";
import { About } from "./About";
import { Faq } from "./Faq";



export const More = () => {
  const { setBg } = useContext(BgContext);
  const {
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
  } = useContext(MorePageContext);

  return (
    <div>
      <section className=" text-black w-full h-screen top-0 absolute left-0 showMorePage bg-white">
        <MoreHeader
          name="more"
          onClick={() => {
            if (setShowMorePage !== undefined) {
              setShowMorePage(false);
              setBg("phone-deafult-screen");
            }
          }}
        />
        <ul className="text-xl sm:text-sm flex flex-col gap-3 mx-4 mt-6 Sm:mt-2">
          <li>
            <article
              onClick={()=> {
                if (setShowContact !== undefined) {
                setShowContact(true);
              }}}
              className="more-items cursor-pointer flex items-center justify-between pb-2 border-b-2 "
            >
              <p>Contact Us</p>
              <i className="fa-solid fa-angle-right"></i>
            </article>
          </li>
          <li>
            <article
              onClick={()=> {
                if (setShowInbox !== undefined) {
                  setShowInbox(true);
                }
              }}
              className="more-items cursor-pointer flex items-center justify-between pb-2 border-b-2"
            >
              <p>Inbox</p>
              <i className="fa-solid fa-angle-right"></i>
            </article>
          </li>
          <li>
            <article
              onClick={()=> {
                if (setShowFaq !== undefined) {
                  setShowFaq(true);
                }
              }}
              className="more-items cursor-pointer flex items-center justify-between pb-2 border-b-2"
            >
              <p>FAQ</p>
              <i className="fa-solid fa-angle-right"></i>
            </article>
          </li>
          <li>
            <article
              onClick={()=> {
                if (setShowAbout !== undefined) {
                  setShowAbout(true);
                }
              }}
              className="more-items cursor-pointer flex items-center justify-between pb-2 "
            >
              <p>About</p>
              <i className="fa-solid fa-angle-right"></i>
            </article>
          </li>
        </ul>
        <div className="medias flex gap-3 text-xl sm:text-sm justify-center mt-28 text-white ">
          <i className="fa-brands fa-twitter bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
          <i className="fa-brands fa-instagram bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
          <i className="fa-brands fa-square-youtube bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
          <i className="fa-brands fa-facebook bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
        </div>
        <p className="text-center text-xl sm:text-sm mt-3 font-black">Ubagroup</p>
      </section>
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
    </div>
  );
};
