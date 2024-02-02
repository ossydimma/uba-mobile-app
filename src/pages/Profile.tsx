import { useContext } from "react";
import { MoreHeader } from "../components/MoreHeader"
import { BgContext, MorePageContext, UserInfo } from "../MyContext";
import { homeDisplaytype } from "./LifeStyle";
import { EmptyPage } from "./EmptyPage";


export const Profile = ({ setDisplaysection }: homeDisplaytype) => {
      // contexts
  const { setBg } = useContext(BgContext);
  const user = useContext(UserInfo);
  const { setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);
  return (
    <div className={`text-black w-full h-screen top-0 absolute left-0 showMorePage pb-5 bg-white`}>
        <div>
            <MoreHeader 
                name="Profile"
                onClick={()=>{
                    if (setHideHome !== undefined) {
                        setDisplaysection((prev) => ({
                        ...prev,
                        showProfile: false,
                        }));
                        setHideHome(true);
                        setBg("dark-screen-mode");
                    }

                } }
            />
            <main className=" mt-8 mx-2">
                <div className=" flex gap-7 items-center">
                    <div className=" border border-gray-900 py-4 px-5 rounded-full text-center">
                        <i className="fa-regular fa-user text-2xl  "></i>
                    </div>
                    <div className=" text-xs">
                        <p>Full Name</p>
                        <p className=" mb-2"> {user.fullName}</p>
                        <p>Mobile Number</p>
                        <p>{user.contact}</p>
                    </div>
                </div>
                <section className=" mt-4">
                    <p className="w-full bg-gray-400 py-1.5 pl-2 text-sm">Basic Information</p>
                    <article className=" text-xs pt-2 pl-2">
                        <p>Account Name</p>
                        <p className=" mb-2"> {user.fullName}</p>
                        <p>Account Number</p>
                        <p>{user.accountNo}</p>
                    </article>
                </section>
                <section className=" mt-4">
                    <p className="w-full bg-gray-400 py-1.5 pl-2 text-sm">Contact Information</p>
                    <article className=" text-xs pt-2 pl-2">
                        <p>Mobile Number</p>
                        <p className=" mb-"> {user.contact}</p>
                        
                    </article>
                </section>
            </main>
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
    </div>
  )
}
