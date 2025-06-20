import { useContext, useEffect, useState } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { BgContext, MorePageContext } from "../MyContext";
import type { homeDisplaytype } from "./LifeStyle";
import { EmptyPage } from "./EmptyPage";
import { api } from "../axios";
import { UserType } from "./Home";
import { jwtDecode } from "jwt-decode";
// import { detailsType } from "./Transfer";
export interface detailsType {
  name: string;
  number: string;
  amount: string;
  narrator: string;
  date: string;
  time: string;
  typeOfTranscation: string;
}

export interface DecodedToken {
  AllTransactions: string;
}

export const History = ({ setDisplaysection }: homeDisplaytype) => {
  const [histories, setHistories] = useState<detailsType[]>([]);
  const [selectedObj, setSelectedObj] = useState<detailsType | undefined>(
    undefined
  );
  const [isShow, setIsShow] = useState<string>("home-wrapper");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false); // even if no token
      return;
    }

    try {
      const decodeToken: UserType = jwtDecode(token);
      api
        .post(
          `/Transaction-history?contact=${encodeURIComponent(
            decodeToken.Contact
          )}`
        )
        .then((res: any) => {
          setHistories(res.data); // or transform if needed
        })
        .catch((err: any) => {
          console.error("API Error:", err);
        })
        .finally(() => {
          setLoading(false); // ✅ turn off loading
        });
    } catch (err) {
      console.error("Decode Error:", err);
      setLoading(false); // also handle failure
    }
  }, []);

  // const now = new Date();

  // contexts
  const { setBg } = useContext(BgContext);
  const { setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);

  const handleCancel = () => {
    setSelectedObj(undefined);
    setIsShow("home-wrapper");
  };

  return (
    <div
      className={`text-black w-full h-screen top-0 absolute left-0 showMorePage pb-5 bg-white ${isShow}`}
    >
      <div>
        <div className="fixed mr-[20px] w-full sm:w-60 z-10 bg-white -mt-[40px] mb-7">
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
          <ul className="pt-5 sm:pt-2">
            {loading ? (
              <div className={` mt-32`}>
                <div className="flex flex-row gap-2 justify-center">
                  <div className="w-4 sm:w-2 h-4 sm:h-2 rounded-full bg-red-600 animate-bounce [animation-delay:.3s]"></div>
                  <div className="w-4 sm:w-2 h-4 sm:h-2 rounded-full bg-red-600 animate-bounce [animation-delay:.1s]"></div>
                  <div className="w-4 sm:w-2 h-4 sm:h-2 rounded-full bg-red-600 animate-bounce [animation-delay:.3s]"></div>
                </div>
              </div>
            ) : histories.length === 0 ? (
              <div className=" mt-32">
                <p className=" text-center text-sm">No recent Transaction</p>
              </div>
            ) : (
              histories.map((item, index) => (
                <li
                  key={index}
                  className=" mt-[5px] border-b border-red-600  "
                  onClick={() => {
                    setIsShow("");
                    setSelectedObj(item);
                  }}
                >
                  <div className="px-[4%] text-xs">
                    <div className=" flex justify-between items-center">
                      <span>
                        {item.date} {item.time}
                      </span>

                      <span
                        className={
                          item.typeOfTranscation === "Debit"
                            ? " text-red-600"
                            : "text-green-600"
                        }
                      >
                        NGN({item.amount})
                      </span>
                    </div>
                    <p className="text-sm py-0.5">
                      TNF-
                      <span className=" uppercase">
                        {item.name ? item.name : item.number}
                      </span>
                      /tranfer for/{" "}
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
                  Type:{" "}
                  <span className=" font-normal">
                    {selectedObj.typeOfTranscation}
                  </span>
                </li>
                <li className=" font-semibold">
                  Narrator:{" "}
                  <span className=" font-normal ">
                    {selectedObj ? selectedObj.narrator : undefined}
                  </span>
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
