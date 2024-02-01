import { useContext, useEffect, useState } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { BgContext, MorePageContext, UserInfo } from "../MyContext";
import type { homeDisplaytype } from "./LifeStyle";
import { EmptyPage } from "./EmptyPage";
import { detailsType } from "./Transfer";

export const History = ({ setDisplaysection }: homeDisplaytype) => {
  const [selectedObj, setSelectedObj] = useState<detailsType | null>(null)

  const storedData: detailsType[] = JSON.parse(
    localStorage.getItem("history") || "[]"
  );

  const now = new Date();

   // contexts
  const { setBg } = useContext(BgContext);
  const user = useContext(UserInfo);
  const { setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);
  console.log(user.history);

  const handleCancel  = () : void => {
    setSelectedObj(null)
  }

  return (
    <div className=" text-black w-full h-screen top-0 absolute left-0 showMorePage pb-5 bg-white home-wrapper ">
      <div>
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

        <section className=" mt-6">
          <ul className="">
            {storedData.length === 0 ? (
              <div className=" mt-32">
                <p className=" text-center text-sm">No recent Transaction</p>
              </div>
            ) : (
              storedData.map((item, index) => (
                <li
                  key={index}
                  className=" mt-[5px] border-b border-red-600  "
                  onClick={()=> setSelectedObj(item)}
                >
                  <div className="px-[4%] text-xs">
                    <div className=" flex justify-between items-center">
                      <span>
                        {item.date} {item.time}
                      </span>
                      <span className=" text-red-600"> NGN({item.amount})</span>
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

                  {selectedObj && <div className=" absolute top-0 bg-white h-full w-full" >
                    <MoreHeader
                      name="Transaction Reciept"
                      onClick={handleCancel}
                    />
                    <section className=" mx-[4%]">

                      <h2 className="mt-4 font-semibold border-b border-gray-800 text-[15px] pb-1 mb-3 ">
                        Transaction Details:-
                      </h2>
                      <ul className="text-sm flex flex-col gap-1">
                        <li className=" font-semibold">
                          Date: <span className=" font-normal ">{selectedObj.date}</span>
                        </li>
                        <li className=" font-semibold">
                          Time: <span className=" font-normal">{selectedObj.time}</span>
                        </li>
                        <li className=" font-semibold">
                          Amount: <span className=" font-normal">{selectedObj.amount}.00 NGN</span>
                          
                        </li>
                        <li className=" font-semibold">
                          Status: <span className=" font-normal">Successful</span>
                          
                        </li>
                        <li className=" font-semibold">
                          Type: <span className=" font-normal">Debit</span>
                        </li>
                      </ul>
                    </section>
                      <button 
                        className=" uppercase mx-[4%] absolute bottom-10 text-center w-[220px] border py-2 text-red-600 border-red-600 rounded-lg  hover:bg-gray-200"
                        onClick={handleCancel}
                      > close</button>
                  </div>}
                </li>
              ))
            )}
          </ul>
        </section>
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
