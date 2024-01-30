import { useContext, useEffect } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { BgContext, MorePageContext, UserInfo } from "../MyContext";
import type { homeDisplaytype } from "./LifeStyle";
import { EmptyPage } from "./EmptyPage";
import { detailsType } from "./Transfer";

export const History = ({ setDisplaysection }: homeDisplaytype) => {
  const storedData: detailsType[] = JSON.parse(
    localStorage.getItem("history") || "[]"
  );

  // const stored = localStorage.getItem('history')
  // const storedData : detailsType[] = stored ? JSON.parse(stored) : []
  // contexts
  const now = new Date();

  // useEffect(() => {
  //   const storedData : detailsType[] = JSON.parse(localStorage.getItem('history') || "[]")

  // }, [])

  // localStorage.clear()
  const { setBg } = useContext(BgContext);
  const user = useContext(UserInfo);
  const { setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);
  console.log(user.history);
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
        :{" "}
        <section className=" mt-5">
          <ul className="px-[2%]">
            {storedData.length === 0 ? (
              <div className=" mt-32">
                <p className=" text-center text-sm">No recent Transaction</p>
              </div>
            ) : (
              storedData.map((item, index) => (
                <li
                  key={index}
                  className=" mt-[5px] border-b border-red-600  "
                >
                  <div className="px-[2%] text-xs">
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

                  <div className=" absolute top-0">
                    <MoreHeader
                      name="Transaction Reciept"
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
                    <h2 className=" font-semibold border-b border-gray-800 text-sm ">
                      Transaction Details:-
                    </h2>
                    <ul>
                      <li className=" font-semibold">
                        Date: <span className=" font-normal">{item.date}</span>
                      </li>
                      <li className=" font-semibold">
                        Time: <span className=" font-normal">{item.time}</span>
                      </li>
                      <li className=" font-semibold">
                        Amount:{" "}
                        <span className=" font-normal">{item.amount} NGN</span>
                      </li>
                      <li className=" font-semibold">
                        Status :{" "}
                        <span className=" font-normal">Successful</span>
                      </li>
                      <li className=" font-semibold">
                        Type: <span className=" font-normal">Debit</span>
                      </li>
                    </ul>
                  </div>
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
