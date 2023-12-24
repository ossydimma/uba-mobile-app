import React, { useContext, useState } from "react";
import { Loading } from "../components/Loading";
import { PopUP } from "../components/PopUP";
import { displaySectionType } from "./Home";
import { BgContext, MorePageContext } from "../MyContext";

interface setDsplaySectionType {
    setDisplaysection :  React.Dispatch<React.SetStateAction<displaySectionType>>;
}

export const QickLoan = ({setDisplaysection} : setDsplaySectionType ) => {
// states
  const [checked, setChecked] = useState<boolean>(false);
  const [display, setDisplay] = useState({
    divs: true,
    loader: false,
    feedBack: false,
  });

//   contexts
  const { setBg } = useContext(BgContext);
  const {setHideHome} = useContext(MorePageContext)

// function 
function handleExitLoan() {
    if (setHideHome !== undefined) {
        setDisplay((prev) => ({ ...prev, feedBack: false }));
        setDisplay((prev) => ({ ...prev, divs: true }));
        setDisplaysection((prev)=> ({...prev, showQickLoan : false}));
        setBg("dark-screen-mode");
        setHideHome(true)
    }
}

  return (
    <>
      <section className="  text-black  opacity-1 w-full h-auto absolute top-0  left-0 showMorePage bg-white">
        <h2 className="ml-3 border-red-500 border-b w-[89px] mb-2">
          Quick Loans
        </h2>
        <main className=" ml-4">
          <p className=" text-[10px] mr-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
            velit quis sapien bibendum aliquam. Donec euismod, velit vel
            tincidunt bibendum, quam sapien bibendum nunc, vel bibendum sapien
            sapien vel dolor. Nulla facilisi. Sed euismod, sapien vel bibendum
            bibendum, sapien sapien bibendum sapien, vel bibendum sapien sapien
            vel dolor.
          </p>
          <h4 className=" text-[12px] mt-2 mb-3 font-[600]">Content:</h4>
          <p className=" text-[11px] ml-2">*Kwikcash</p>
          <p className=" text-[11px] ml-2">*Ferratum</p>
          <p className=" text-[11px] ml-2">*PayLater</p>
          <p className=" text-[11px] ml-2">*Fairmoney</p>
          <div>
            <h4 className=" text-[12px] mt-3  font-[600]">Kwikcash</h4>
            <p className=" text-[10px] mr-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. velit vel
              tincidunt bibendum, quam sapien bibendum nunc, vel bibendum sapien
              sapien vel dolor. Nulla facilisi. Sed euismod.
            </p>
          </div>
          <div>
            <h4 className=" text-[12px] mt-3  font-[600]">Ferratum</h4>
            <p className=" text-[10px] mr-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. velit vel
              tincidunt bibendum, quam sapien bibendum nunc, vel bibendum sapien
              sapien vel dolor. Nulla facilisi. Sed euismod.
            </p>
          </div>
          <div>
            <h4 className=" text-[12px] mt-3  font-[600]">PayLater</h4>
            <p className=" text-[10px] mr-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. velit vel
              tincidunt bibendum, quam sapien bibendum nunc, vel bibendum sapien
              sapien vel dolor. Nulla facilisi. Sed euismod.
            </p>
          </div>
          <div>
            <h4 className=" text-[12px] mt-3  font-[600]">Fairmoney</h4>
            <p className=" text-[10px] mr-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. velit vel
              tincidunt bibendum, quam sapien bibendum nunc, vel bibendum sapien
              sapien vel dolor. Nulla facilisi. Sed euismod.
            </p>
          </div>
          {display.divs && (
            <div>
              <div className=" flex  gap-4 items-center my-4 ml-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onClick={() => {
                    checked === false ? setChecked(true) : setChecked(false);
                  }}
                />
                <p className=" text-sm">Accept</p>
              </div>

              <div className=" flex flex-col gap-2 mb-8">
                <button
                  className=" border w-[210px] py-2 rounded-lg border-red-500 text-sm text-red-600 hover:bg-gray-200"
                  onClick={() => {
                    if (checked === true) {
                      setDisplay((prev) => ({ ...prev, divs: false }));
                      setDisplay((prev) => ({ ...prev, loader: true }));
                      setTimeout(() => {
                        setDisplay((prev) => ({ ...prev, loader: false }));
                        setDisplay((prev) => ({ ...prev, feedBack: true }));
                      }, 4000);
                    }
                  }}
                >
                  OK
                </button>
                <button 
                    className=" border w-[210px] py-2 rounded-lg border-red-500 text-sm text-red-600 hover:bg-gray-200"
                    onClick={handleExitLoan}
                    >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </main>
        {display.feedBack && (
          <PopUP
            icon={
              <i className="fa-solid fa-xmark bg-red-600 py-3 px-5 rounded-full text-white text-2xl"></i>
            }
            onClick={handleExitLoan}
            className="absolute top-[290px] left-4"
            title="Failed"
            msg="You are not eligible for loans, please contact costumer service for more info"
          />
        )}
        {display.loader && <Loading className="absolute top-[450px] left-4" />}
      </section>
    </>
  );
};
