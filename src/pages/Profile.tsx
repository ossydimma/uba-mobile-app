import { useContext, useEffect, useState } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { BgContext, MorePageContext } from "../MyContext";
import { homeDisplaytype } from "./LifeStyle";
import { EmptyPage } from "./EmptyPage";
import { jwtDecode } from "jwt-decode";
import { UserType } from "./Home";

export const Profile = ({ setDisplaysection }: homeDisplaytype) => {
  //useEffect
  useEffect(()=> {
    const token =  localStorage.getItem("authToken") || "{}";
    if (token) {
     const decodeToken : UserType = jwtDecode(token);
     console.log(decodeToken.Contact);
    
     setUserData(decodeToken)
    }
   
 }, [])

  // states
  const [userData, setUserData] = useState<UserType>({} as UserType )
  // contexts
  const { setBg } = useContext(BgContext);
  const { setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);
  return (
    <div
      className={`text-black w-full h-screen top-0 absolute left-0 showMorePage pb-5 bg-white`}
    >
      <div>
        <MoreHeader
          name="Profile"
          onClick={() => {
            if (setHideHome !== undefined) {
              setDisplaysection((prev) => ({
                ...prev,
                showProfile: false,
              }));
              setHideHome(true);
              setBg("dark-screen-mode");
            }
          }}
        />
        <main className=" mt-8 mx-2">
          <div className=" flex gap-7">
            <div className=" border border-gray-900 h-[75px] w-[80px] rounded-full flex justify-center items-center">
              <i className="fa-regular fa-user text-xl  "></i>
            </div>
            <div className=" sm:text-xs">
              <p>Full Name</p>
              <p className=" mb-2"> {userData.FullName}</p>
              <p>Mobile Number</p>
              <p>+234 {userData.Contact}</p>
            </div>
          </div>
          <section className=" mt-4">
            <p className="w-full bg-gray-400 py-1.5 pl-2 text-lg sm:text-sm">
              Basic Information
            </p>
            <article className=" sm:text-xs pt-2 pl-2">
              <p>Account Name</p>
              <p className=" mb-2"> {userData.FullName}</p>
              <p>Account Number</p>
              <p>{userData.AccountNumber}</p>
            </article>
          </section>
          <section className=" mt-4">
            <p className="w-full bg-gray-400 py-1.5 pl-2 text-lg sm:text-sm">
              Contact Information
            </p>
            <article className=" sm:text-xs pt-2 pl-2">
              <p>Mobile Number</p>
              <p className=" mb-"> +234 {userData.Contact}</p>
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
  );
};
