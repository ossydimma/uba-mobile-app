import { useContext } from "react";
import { homeDisplaytype } from "./LifeStyle";
import { BgContext, MorePageContext } from "../MyContext";


export const MoreFeatures = ({ setDisplaysection }: homeDisplaytype) => {
    const { setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);
    const { setBg } = useContext(BgContext);
  return (
    <div className=" bg-white h-screen w-full absolute top-0 text-black home-wrapper">
        <nav className="more-menu flex justify-between items-center pb-2 pl-8 pr-3 shadow-md shadow-gray-400">
            <h2 className="font-semibold">More</h2>
            <i
              className="fa-regular fa-bell text-gray-400 text-xl cursor-pointer"
            //   onClick={handleNotiPage}
            ></i>
        </nav>
        <main>
            <ul className="text-sm flex flex-col  mx-2 mt-2">
                <li className=" flex justify-between items-center py-3 border-b  ">
                    <span>Bank Services</span>
                    <i className="fa-solid fa-angle-right"></i>
                </li>
                <li className=" flex justify-between items-center py-3 border-b  ">
                    <span>Settings</span>
                    <i className="fa-solid fa-angle-right"></i>
                </li>
                <li className=" flex justify-between items-center py-3 border-b  ">
                    <span>My Inbox</span>
                    <i className="fa-solid fa-angle-right"></i>
                </li>
                <li className=" flex justify-between items-center py-3 border-b  ">
                    <span>Notification Center</span>
                    <i className="fa-solid fa-angle-right"></i>
                </li>
                <li className=" flex justify-between items-center py-3 border-b  ">
                    <span>FAQ</span>
                    <i className="fa-solid fa-angle-right"></i>
                </li>
                <li className=" flex justify-between items-center py-3 border-b  ">
                    <span>About</span>
                    <i className="fa-solid fa-angle-right"></i>
                </li>
                <li className=" flex justify-between items-center py-3 border-b  ">
                    <span>Contact us</span>
                    <i className="fa-solid fa-angle-right"></i>
                </li>
                <li className=" flex justify-between items-center py-3 border-b  ">
                    <span>Log Out</span>
                    <i className="fa-solid fa-angle-right"></i>
                </li>
                
            </ul>
        </main>
         {/* ------------------footer----------------------------- */}
         <div className=" relative ">
                  <nav className=" fixed w-[232px] h-10    bottom-[70px]  -ml-[115px] left-[50%] ">
                    <ul className="flex justify-around items-center gap-4 mt-1">
                      <li 
                        className="flex flex-col items-center"
                        onClick={()=> {
                          if (setHideHome !== undefined) {
                            setHideHome(true);
                          }
                          setBg("dark-screen-mode");
                          setDisplaysection((prev)=> ({...prev, showMore : false}))
                        }}
                        >
                        <i className="fa-solid fa-house cursor-pointer"></i>
                        <p className="text-xs">Home</p>
                      </li>
                      <li 
                        className="flex flex-col items-center text-red-600"
                        
                        >
                        <i className="fa-solid fa-bars cursor-pointer"></i>
                        <p className="text-xs">More</p>
                      </li>
                    </ul>
                  </nav>
                </div>

    </div>
  )
}
