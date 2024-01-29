import { useContext } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { BgContext, MorePageContext, UserInfo } from "../MyContext";
import type { homeDisplaytype } from "./LifeStyle";
import { EmptyPage } from "./EmptyPage";
import { time } from "console";

export const History = ({ setDisplaysection }: homeDisplaytype) => {
  // contexts
  const now = new Date();

  const { setBg } = useContext(BgContext);
  const user = useContext(UserInfo);
  const { setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);

  return (
    <div className=" text-black w-full h-screen top-0 absolute left-0 showMorePage bg-white">
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
        <section>
          <ul>
            {user.history.length === 0 ?
            (
              <div className=" mt-32">
                <p className=" text-center text-sm">
                  No recent Transaction {now.toDateString()}{" "}
                  {now.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            )
            :  (
              user.history.map((item, index) => (
                <li key={index}>
                  <div className=" flex justify-between items-center">
                    <span>
                      {item.date} {item.time}
                    </span>
                    <span> NGN({item.amount})</span>
                  </div>
                  <p>
                    TNF-{item.name}/tranfer from {item.narrator}
                  </p>
                </li>
              ))
            ) 
            }
          </ul>
          {/* {user.history.length !== 0 
          ? (<ul>
              
            </ul>) 
          : (<div className=' mt-32'>
              <p className=' text-center text-sm'>No recent Transaction</p>
            </div>)} */}
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
