import { useContext } from "react";
import { BgContext, MorePageContext } from "../MyContext";

interface ProductProps {

    name: string;
   
  }

export const MoreHeader = (name: ProductProps) => {
  // const {setShowMorePage} = useContext(MorePageContext);
  const {setShowMorePage, setShowContact, setShowNews, setShowInbox, setShowAbout} = useContext(MorePageContext)
  const {setBg} = useContext(BgContext)

  function changePage(name: ProductProps) {
    switch (name.name) {
      case "more":
        if (setShowMorePage!== undefined) {
          setShowMorePage(false)
          setBg('phone-deafult-screen')
        }
        break;
      case "Contact Us":
        if (setShowContact !== undefined) {
          setShowContact(false);
        }
        break;
      case "News":
        if (setShowNews !== undefined) {
          setShowNews(false);
        }
        break;
      case "Inbox":
        if (setShowInbox !== undefined) {
          setShowInbox(false);
        }
        break;
      case "About":
        if (setShowAbout  !== undefined && setShowMorePage !== undefined) {
          setShowAbout(false);
          setShowMorePage(true)
        }
        break;
    
      default:
        break;
    }
    // if (name.name === "more") {
    //   setShowMorePage(false)
    //   setBg('phone-deafult-screen')
    // } else {
    //   setShowMorePage(true)
    // }
  }
 
  return (
    <div>
        <div className="more-menu flex justify-between items-center pb-2 px-3 border-b-4 border-gray-400">
          <div className="flex gap-7 items-center">
            <i className="fa-solid fa-arrow-left cursor-pointer" onClick={()=> changePage(name)}></i>
            <h2 className="font-semibold">{name.name}</h2>
          </div>
          <div>
            <i className="fa-regular fa-bell text-gray-400 text-xl cursor-pointer"></i>
          </div>
        </div>
    </div>
  )
}