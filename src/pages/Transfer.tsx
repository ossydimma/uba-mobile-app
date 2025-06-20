import { useContext, useEffect, useState } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { BgContext, MorePageContext } from "../MyContext";
import type { homeDisplaytype } from "./LifeStyle";
import { EmptyPage } from "./EmptyPage";
import { Beneficiary } from "./Beneficiary";
import { PopUP } from "../components/PopUP";
import { Loading } from "../components/Loading";
import successImg from "../assests/leo_uba_thubs_up.png";
import { AuthPin } from "../components/AuthPin";
import { UserType } from "./Home";
import { jwtDecode } from "jwt-decode";
import { api } from "../axios";

export interface detailsType {
  name: string;
  number: string;
  amount: string;
  narrator: string;
  date: string;
  time: string;
}

export interface BeneficiaryType {
  name: string;
  number: string;
}

export interface VerifyType {
  Sender: number;
  Receiver: number;
}

export interface modelType {
  amount: string;
  senderPin: string;
  receiversAccountNumber: string;
  receiverFullName: string;
  senderAccountNumber: string;
  narrator: string;
  date: string;
  time: string;
}
export interface transferType {
  addNew: boolean;
  check: boolean;
  transferDiv: boolean;
  btnText: string;
  loader: boolean;
  popUp: boolean;
  popUp1: boolean;
  popUp2: boolean;
  opacity: string;
  style: string;
}

export const Transfer = ({ setDisplaysection }: homeDisplaytype) => {
  useEffect(() => {
    const token = localStorage.getItem("authToken") || "{}";
    if (token) {
      const decodeToken: UserType = jwtDecode(token);
      setUserData(decodeToken);
    }
  }, []);

  // contexts
  const { setBg } = useContext(BgContext);
  const { setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);

  const now = new Date();

  //   States
  const [message, setMessage] = useState<string>("");
  const [Success, setSuccess] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserType>({} as UserType);
  const [enteredPin, setEnteredPin] = useState<string>("");
  const [display, setDisplay] = useState<transferType>({
    addNew: false,
    check: false,
    transferDiv: false,
    btnText: "Confirm Reciever",
    loader: false,
    popUp: false,
    popUp1: false,
    popUp2: false,
    opacity: "",
    style: "home-wrapper h-screen",
  });
  const [details, setDetails] = useState<detailsType>({
    name: "",
    number: "",
    amount: "",
    narrator: "",
    date: now.toDateString(),
    time: now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  });

  // functions

  async function handleBtn() {
    if (display.btnText === "Confirm Reciever") {
      setDisplay((prev) => ({ ...prev, opacity: "opacity-5", loader: true }));
      const data: VerifyType = {
          Sender: Number(userData.AccountNumber),
          Receiver: Number(details.number),
        };
      if (/^[0-9]+$/.test(details.number) && data.Receiver !== 0 ) {
        
        try {
          const res = await api.post("/Verify-Account", data);
          setDetails((prev) => ({ ...prev, name: res.data }));
          setSuccess(true);
          setDisplay((prev) => ({
            ...prev,
            opacity: "",
            loader: false,
            transferDiv: true,
            btnText: "Transfer",
          }));
        } catch (err: any) {
          setSuccess(false);
          if ((err.status === 400 || 401 || 404) && (err.response.data.length < 350)) {
            setMessage(JSON.stringify(err.response.data));
          } else {
            setMessage("Server error try again later,\n if it continues contact constumer service.");
          }
          setDisplay((prev) => ({ ...prev, popUp: true, style: " h-screen " }));
        }
      } else {
        setSuccess(false);
        setMessage("Enter a valid beneficiary account number and try again");
        setDisplay((prev) => ({ ...prev, popUp: true, style: " h-screen " }));
      }
    }
    if (display.btnText === "Transfer") {
      setDisplay((prev) => ({ ...prev, check: false }));
      if (details.narrator !== "") {
        setDisplay((prev) => ({
          ...prev,
          opacity: "opacity-5",
          style: "",
          loader: false,
          popUp1: true,
        }));
      }
    }
  }

  function handleCancel() {
    setDisplay((prev) => ({
      ...prev,
      loader: false,
      opacity: "",
      style: " h-screen home-wrapper",
      popUp: false,
      popUp1: false,
      popUp2: false,
      // transferDiv: false,
      amount: "",
      narrator: "",
      btnText: "Transfer",
    }));

    setEnteredPin("");
  }

  return (
    <div
      className={` ${display.style} sm:h-[465px] text-black w-full  top-0 absolute left-0 showMorePage bg-white pb-10 `}
    >
      <div className={`${display.opacity}`}>
        <MoreHeader
          name="Send Money"
          onClick={() => {
            if (setHideHome !== undefined) {
              setDisplaysection((prev) => ({
                ...prev,
                showTransferPage: false,
              }));
              setHideHome(true);
              setBg("dark-screen-mode");
            }
          }}
        />
        <p className="  py-2.5 text-lg sm:text-sm text-center shadow-md shadow-gray-400">
          Select Tranfer Option
        </p>

        <section className=" w-[93%] h-auto mt-3 mx-2 pb-1 border border-gray-300 rounded-2xl overflow-hidden">
          <p className="text-lg sm:text-sm pl-3 font-semibold  bg-gray-100 py-4 sm:py-2 ">
            Transfer From:
          </p>
          <div className=" py-4 sm:py-2">
            <p className="text-lg sm:text-xs text-center font-semibold ">
              {userData.FullName}
            </p>
            <p className="text-sm sm:text-[10px] text-center ">
              Current Account:{" "}
              <span className="">{userData.AccountNumber}</span>
            </p>
          </div>
        </section>
        <section className=" w-[93%] h-auto mt-3 mx-2  border border-gray-300 rounded-2xl overflow-hidden">
          <p className="text-lg sm:text-sm pl-3 font-semibold  bg-gray-100 py-4 sm:py-2 ">
            Transfer To:
          </p>
          <div className=" py-2 px-1.5">
            <input
              type="text"
              className=" border border-gray-300 outline-none w-[100%] sm:w-52  rounded px-2 mb-1 text-lg sm:text-xs py-2 sm:py-1"
              placeholder="Account Number"
              value={details.number}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDetails((prev) => ({ ...prev, number: e.target.value }));
                if (display.transferDiv) {
                  setDisplay((prev) => ({
                    ...prev,
                    transferDiv: false,
                    btnText: "Confirm Reciever",
                    check: false,
                  }));
                }
              }}
            />
            {display.transferDiv && (
              <input
                readOnly
                type="text"
                className=" border border-gray-300 outline-none w-[100%] sm:w-52  mt-1 rounded px-2 mb-1 text-lg sm:text-xs py-2 sm:py-1"
                placeholder="Account Name"
                value={details.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDetails((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            )}
            {!display.transferDiv && (
              <p
                className=" text-right text-lg sm:text-[10px] text-red-600 mr-2 cursor-pointer"
                onClick={() => {
                  setDisplay((prev) => ({ ...prev, addNew: true }));
                }}
              >
                Choose Beneficiary
              </p>
            )}
          </div>
        </section>
        {display.transferDiv && (
          <section>
            <div className=" my-5 flex mx-3 justify-between">
              <p className=" text-lg sm:text-xs">Save as beneficiary</p>
              <input
                type="checkbox"
                checked={display.check}
                onChange={() => {
                  const data: BeneficiaryType = {
                    name: details.name,
                    number: details.number,
                  };
                  let userBeneficiaries: BeneficiaryType[] = JSON.parse(
                    localStorage.getItem("Beneficiaries") || "[]"
                  );

                  if (!display.check) {
                    setDisplay((prev) => ({ ...prev, check: true }));
                    const containValue = userBeneficiaries.some(
                      (obj) => obj.number === data.number
                    );

                    if (!containValue) {
                      userBeneficiaries = [...userBeneficiaries, data];
                    }
                    localStorage.setItem(
                      "Beneficiaries",
                      JSON.stringify(userBeneficiaries)
                    );
                  } else {
                    setDisplay((prev) => ({ ...prev, check: false }));
                    userBeneficiaries = userBeneficiaries.filter(
                      (item) => item.number !== details.number
                    );
                    localStorage.setItem(
                      "Beneficiaries",
                      JSON.stringify(userBeneficiaries)
                    );
                  }
                }}
              />
            </div>

            <div className="mx-4 sm:mx-2">
              <input
                type="text"
                className=" border border-gray-300 bg-[#f8f8ff] outline-none w-[100%] sm:w-56  mt-1 rounded px-2 mb-3 text-lg sm:text-xs py-2 sm:py-1.5"
                placeholder="Amount"
                value={details.amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDetails((prev) => ({ ...prev, amount: e.target.value }))
                }
              />
              <input
                type="text"
                maxLength={14}
                className=" border border-gray-300 bg-[#f8f8ff] outline-none w-[100%] sm:w-56  mt-1 rounded px-2 mb-1 text-lg sm:text-xs py-2 sm:py-1.5"
                placeholder="Narration"
                value={details.narrator}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDetails((prev) => ({ ...prev, narrator: e.target.value }))
                }
              />
            </div>
            <p className=" text-lg sm:text-xs text-right mr-2 ">
              14 characters max
            </p>
          </section>
        )}

        <button
          className="bg-red-600 py-2 mt-3 text-xl sm:text-sm text-white mx-3 sm:ml-1.5 w-[90%] sm:w-[230px] rounded-[4px]"
          onClick={handleBtn}
        >
          {display.btnText}
        </button>
      </div>
      {display.addNew && (
        <Beneficiary setDisplay={setDisplay} setDetails={setDetails} />
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
      {display.loader && (
        <Loading className="absolute top-[220px] left-[6rem] sm:left-4" />
      )}
      {display.popUp && (
        <PopUP
          icon={
            details.name.length < 1 || !Success ? (
              <i className="fa-solid fa-xmark bg-red-600 py-3 px-5 rounded-full text-white text-2xl"></i>
            ) : (
              <div className="successImg">
                <img src={successImg} alt="thumb up" />
              </div>
            )
          }
          onClick={() => {
            setDisplay((prev) => ({
              ...prev,
              loader: false,
              opacity: "",
              style: " h-screen home-wrapper",
              popUp: false,
              popUp1: false,
              popUp2: false,
              transferDiv: false,
              amount: "",
              narrator: "",
              btnText: "Confirm Reciever",
            }));
            setDetails((prev) => ({
              ...prev,
              name: "",
              number: "",
              amount: "",
              narrator: "",
            }));
            setEnteredPin("");
          }}
          className=""
          title={details.name.length < 1 || !Success ? "Failed" : "Succes"}
          msg={message}
        />
      )}

      {display.popUp1 && (
        <AuthPin
          handleCancel={handleCancel}
          handleNext={() => {
            if (enteredPin.length >= 4 && setDisplay)
              setDisplay((prev) => ({
                ...prev,
                popUp1: false,
                loader: false,
                popUp2: true,
              }));
          }}
          enteredPin={enteredPin}
          setEnteredPin={setEnteredPin}
          descrip="Transaction limits for PIN is 200,000NGN per day"
          className="left-[6.5rem]"
        />
      )}

      {display.popUp2 && (
        <div className=" z-10 w-60 sm:w-52 h-auto pt-6 pb-10 bg-white rounded-2xl mx-auto px-4 drop-shadow-xl absolute top-[120px] left-[6.5rem] sm:left-4 ">
          <i
            className="fa-solid fa-xmark cursor-pointer flex justify-end  pb-4 "
            onClick={handleCancel}
          ></i>
          <div className=" flex  flex-col justify-center items-center gap-2">
            <h3 className="sm:text-[1rem] text-lg font-semibold">
              Are you sure
            </h3>
            <article className=" text-[1rem] sm:text-xs ">
              <p>Transaction Amount : {details.amount}</p>
              <p>Total Fee : 00.00</p>
              <p>Total Amount : {details.amount}</p>
            </article>
            <button
              className="bg-red-600 py-2 text-lg sm:text-sm text-white  w-44 rounded-[4px]"
              onClick={async () => {
                const data: modelType = {
                  amount: details.amount,
                  senderPin: enteredPin,
                  senderAccountNumber: userData.AccountNumber,
                  receiversAccountNumber: details.number,
                  receiverFullName: details.name,
                  narrator: details.narrator,
                  date: now.toDateString(),
                  time: now.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  }),
                };
                setDisplay((prev) => ({
                  ...prev,
                  popUp2: false,
                  loader: true,
                }));
                try {
                  const res = await api.post("/Transfer-Money", data);
                  setMessage(
                    `You have successfully transferred NGN${details.amount} to ${details.name} Account Number: ${details.number}`
                  );
                  setSuccess(true);
                  const token = res.data;
                  // const decodedToken: UserdetailsType = jwtDecode(token);
                  // localStorage.setItem("histories", decodedToken.History);
                  localStorage.setItem("authToken", token);
                } catch (err: any) {
                  setSuccess(false);
                  if (err.status === 400 || 401 || 404) {
                    setMessage(JSON.stringify(err.response.data));
                  } else {
                    setMessage("Server error contact costumer service");
                  }
                }
                setDisplay((prev) => ({ ...prev, loader: false, popUp: true }));
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
