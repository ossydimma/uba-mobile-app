import { useContext, useEffect, useState } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { BgContext, MorePageContext} from "../MyContext";
import type { homeDisplaytype } from "./LifeStyle";
import { EmptyPage } from "./EmptyPage";
import { detailsType } from "./Transfer";

export const History = ({ setDisplaysection }: homeDisplaytype) => {
  const [selectedObj, setSelectedObj] = useState<detailsType | undefined>(
    undefined
  );
  const [isShow, setIsShow] = useState<string>('home-wrapper');

  let storedData: detailsType[] = JSON.parse(
    localStorage.getItem("history") || "[]"
  );
  storedData = storedData.reverse()

  const now = new Date();

  // contexts
  const { setBg } = useContext(BgContext);
  const { setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);
 

  const handleCancel = () => {
    setSelectedObj(undefined);
    setIsShow('home-wrapper')
  };

  return (
    <div className={`text-black w-full h-screen top-0 absolute left-0 showMorePage pb-5 bg-white ${isShow}`} >
      <div>
        <div className="fixed w-60 z-10 bg-white -mt-[40px] mb-7">
            <MoreHeader
              name="Transaction History"
              onClick={() => {
                if (setHideHome !== undefined) {
                  setDisplaysection((prev) => ({
                    ...prev,
                    showHistoryPage: false,
                  }));
                  setHideHome(true);
                  setBg("dark-screen-mode");
                }
              }}
            />
        </div>

          <section className=" mt-10">
            <ul className="pt-3">
              {storedData.length === 0 ? (
                <div className=" mt-32">
                  <p className=" text-center text-sm">No recent Transaction</p>
                </div>
              ) : (
                storedData.map((item, index) => (
                  <li
                    key={index}
                    className=" mt-[5px] border-b border-red-600  "
                    onClick={() => {
                      setIsShow("")
                      setSelectedObj(item);
                    }}
                  >
                    <div className="px-[4%] text-xs">
                      <div className=" flex justify-between items-center">
                        <span>
                          {item.date} {item.time}
                        </span>
                        <span className=" text-red-600">
                          {" "}
                          NGN({item.amount})
                        </span>
                      </div>
                      <p className="text-sm py-0.5">
                        TNF-
                        <span className=" uppercase">
                          {item.name ? item.name : item.number}
                        </span>
                        /tranfer from{" "}
                        <span className=" uppercase">{item.narrator}</span>
                      </p>
                      <p className=" pb-[5px]">Tap to display receipt</p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </section>
          {selectedObj && (
            <div className={` absolute top-0 bg-white h-full w-full z-20 `}>
              <MoreHeader name="Transaction Reciept" onClick={handleCancel} />
              <section className=" mx-[4%]">
                <h2 className="mt-4 font-semibold border-b border-gray-800 text-[15px] pb-1 mb-3 ">
                  Transaction Details:-
                </h2>
                <ul className="text-sm flex flex-col gap-1">
                  <li className=" font-semibold">
                    Date:{" "}
                    <span className=" font-normal ">
                      {selectedObj ? selectedObj.date : undefined}
                    </span>
                  </li>
                  <li className=" font-semibold">
                    Time:{" "}
                    <span className=" font-normal">
                      {selectedObj ? selectedObj.time : undefined}
                    </span>
                  </li>
                  <li className=" font-semibold">
                    Amount:{" "}
                    <span className=" font-normal">
                      {selectedObj ? selectedObj.amount : undefined}.00 NGN
                    </span>
                  </li>
                  <li className=" font-semibold">
                    Status: <span className=" font-normal">Successful</span>
                  </li>
                  <li className=" font-semibold">
                    Type: <span className=" font-normal">Debit</span>
                  </li>
                </ul>
                <button
                  className=" uppercase   mt-32 text-center w-full border py-2 text-red-600 border-red-600 rounded-lg  hover:bg-gray-200"
                  onClick={handleCancel}
                >
                  {" "}
                  close
              </button>
              </section>
            </div>
          )}
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
