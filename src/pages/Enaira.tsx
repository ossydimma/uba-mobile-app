import { MoreHeader } from "../components/MoreHeader";
import eNairaLogo from "../assests/eNaira_logo.webp";
import { useContext, useState } from "react";
import { PopUP } from "../components/PopUP";
import type { displaySectionType, stylesType } from "../pages/Home";
import { Loading } from "../components/Loading";
import { BgContext, MorePageContext } from "../MyContext";
import { EmptyPage } from "./EmptyPage";

interface childPropType {
  setDisplaysection: React.Dispatch<React.SetStateAction<displaySectionType>>;
  setStyles: React.Dispatch<React.SetStateAction<stylesType>>;
}
interface inputValueType {
  username : string | undefined ;
  password : string | undefined;
}

export const Enaira = ({ setStyles, setDisplaysection }: childPropType) => {
  // contexts
  const {setShowNairaSec, setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);
  const {setBg} = useContext(BgContext)

  const [inputValue, setInputValue] = useState<inputValueType>({
    username : undefined,
    password : undefined
  });
  const [inputType, setInputType] = useState<"text" | "password">("password");
  const [displaysec, setDisplaySec] = useState({
    showIcon: true,
    showError: false,
    showLoader: false,
  });

  function handleTypeChange() {
    if (displaysec.showIcon === true) {
      setDisplaySec((prev) => ({ ...prev, showIcon: false }));
      setInputType("text");
    } else {
      setDisplaySec((prev) => ({ ...prev, showIcon: true }));
      setInputType("password");
    }
  }
  function handleExit() {
    setDisplaySec((prev) => ({ ...prev, showError: false }));
  }

  return (
    <div className="">
      <section
        className={`  text-black w-full h-screen top-0 absolute left-0 showMorePage bg-white`}
      >
        <MoreHeader name="eNaira" onClick={()=> {
          if (setHideHome && setShowNairaSec !== undefined) {
            setShowNairaSec(false)
            setHideHome(true)
            setBg('dark-screen-mode')
          }
        }} />
        <div className=" mt-3">
          <img
            src={eNairaLogo}
            alt="eNaira logo"
            className=" w-[110px] mt-2 mx-auto"
          />
          <h3 className=" text-center font-semibold text-lg sm:text-sm mt-2">
            Login to your eNaira wallet
          </h3>
          <p className=" mx-2 mt-2 text-sm sm:text-xs">
            Please enter your login details to link your wallet to UBA app
          </p>
        </div>
        <form className=" flex flex-col gap-8 items-center mt-6 relative">
          <input
            type="text"
            className=" border py-3 rounded-md bg-[#f1f3f3] px-2 w-[20rem] sm:w-[217px] text-sm sm:text-xs outline-none"
            placeholder="Username"
            defaultValue={inputValue.username}
            onChange={(e)=> {
              setInputValue((prev)=> ({...prev, username : e.target.value}))
            }}
          />
          <input
            type={inputType}
            className=" border py-4 sm:py-3 rounded-md bg-[#f1f3f3] px-2 w-[20rem] sm:w-[217px] text-sm sm:text-xs outline-none"
            placeholder="Password"
            defaultValue={inputValue.password}
            onChange={(e)=> {
              setInputValue((prev)=> ({...prev, password : e.target.value}))
            }}
          />
          <div onClick={handleTypeChange} className="cursor-pointer">
            {displaysec.showIcon && (
              <i className="fa-solid fa-eye fa-xs absolute top-[6.5rem] sm:top-[88px] right-6 text-gray-400"></i>
            )}
            {!displaysec.showIcon && (
              <i className="fa-solid fa-eye-slash fa-xs absolute top-[6.5rem] sm:top-[88px] right-6 text-gray-400"></i>
            )}
          </div>
          <button
            className="text-lg sm:text-sm bg-red-600 text-white p-3 sm:p-2.5 rounded-md -mt-8"
            onClick={(e) => {
              e.preventDefault();
              if (inputValue.username !== undefined && inputValue.password !== undefined) {
                setDisplaySec((prev) => ({ ...prev, showLoader: true }));
                setTimeout(() => {
                  setDisplaySec((prev) => ({ ...prev, showLoader: false }));
                  setDisplaySec((prev) => ({ ...prev, showError: true }));
                }, 3000);
              }
            }}
          >
            Login to Link eNaira Wallet
          </button>
        </form>
      </section>
      {displaysec.showLoader && <Loading className={'absolute top-[180px] left-4'} />}
      {displaysec.showError && (
        <PopUP
        icon={
          <i className="fa-solid fa-xmark bg-red-600 py-3 px-5 rounded-full text-white text-2xl"></i>
        }
        onClick={handleExit}
        className=' text-black'
        title="Failed"
        msg="can't access eNaira at the Moment, please contact customer service"
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
