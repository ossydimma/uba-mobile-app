import { useContext, useRef, useState } from "react";
import { MoreHeader } from "../components/MoreHeader";
import {
  BeneficiariesContext,
  BgContext,
  MorePageContext,
  UserInfo,
} from "../MyContext";
import type { homeDisplaytype } from "./LifeStyle";
import { EmptyPage } from "./EmptyPage";
import { Beneficiary, dataType } from "./Beneficiary";
import { PopUP } from "../components/PopUP";
import { Loading } from "../components/Loading";
import successImg from "../assests/leo_uba_thubs_up.png";

interface addActiveType {
  item1: string;
  item1Sub: string;
  item2: string;
  item2Sub: string;
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
  amount: string;
  narrator: string;
  opacity: string;
  style: string;
}

export const Transfer = ({ setDisplaysection }: homeDisplaytype) => {
  // contexts
  const { setBg } = useContext(BgContext);
  const user = useContext(UserInfo);
  const { setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);
  const { setBeneficiaries } = useContext(BeneficiariesContext);

  //  ref
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);
  const input4Ref = useRef<HTMLInputElement>(null);

  //   States
  const [enteredPin, setEnteredPin] = useState<string>("");
  const [addActive, setAddActive] = useState<addActiveType>({
    item1: "bg-red-100",
    item1Sub: "bg-white",
    item2: "bg-white",
    item2Sub: "bg-red-100",
  });
  const [display, setDisplay] = useState<transferType>({
    addNew: false,
    check: false,
    transferDiv: false,
    btnText: "Confirm Reciever",
    loader: false,
    popUp: false,
    popUp1: false,
    popUp2: false,
    amount: "",
    narrator: "",
    opacity: "",
    style: "home-wrapper h-screen",
  });
  const [data, setData] = useState<dataType>({
    name: "",
    number: "",
  });

  // functions
  function handleInputs(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    // setEnteredPin( input1Ref.current?.value + input2Ref.current?.value )
    if (input.value.length === input.maxLength) {
      switch (input) {
        case input1Ref.current:
          setEnteredPin(enteredPin + input1Ref.current?.value);
          input2Ref.current?.focus();
          break;
        case input2Ref.current:
          setEnteredPin(enteredPin + input2Ref.current?.value);
          input3Ref.current?.focus();

          break;
        case input3Ref.current:
          // setEnteredPin(enteredPin + input3Ref.current?.value)
          input4Ref.current?.focus();

          break;
        default:
          break;
      }
    }
    if (input.value.length === 0) {
      switch (input) {
        case input4Ref.current:
          input3Ref.current?.focus();
          break;
        case input3Ref.current:
          input2Ref.current?.focus();
          break;
        case input2Ref.current:
          input1Ref.current?.focus();
          break;
        default:
          break;
      }
    }
    // setEnteredPin(enteredPin + input1Ref.current?.value + input2Ref.current?.value + input3Ref.current?.value + input4Ref.current?.value)
    //   alert(enteredPin)
  }
  function handleActive(item: string) {
    switch (item) {
      case "uba":
        setAddActive({
          item1: "bg-red-100",
          item1Sub: "bg-white",
          item2: "",
          item2Sub: "bg-red-100",
        });
        break;
      case "other":
        setAddActive({
          item1: "",
          item1Sub: "bg-red-100",
          item2: "bg-red-100",
          item2Sub: "bg-white",
        });
        break;

      default:
        break;
    }
  }

  function handleBtn() {
    if (display.btnText === "Confirm Reciever") {
      setDisplay((prev) => ({ ...prev, opacity: "opacity-5", loader: true }));
      setTimeout(() => {
        if (
          /^[0-9]+$/.test(data.number) &&
          data.number.length === 10 &&
          /^[a-zA-Z]+$/.test(data.name) &&
          data.name !== "" &&
          data.name.length > 2
        ) {
          setDisplay((prev) => ({
            ...prev,
            opacity: "",
            loader: false,
            transferDiv: true,
            btnText: "Transfer",
          }));
        } else {
          setDisplay((prev) => ({ ...prev, popUp: true }));
        }
      }, 2000);
    }
    if (display.btnText === "Transfer") {
      if (
        /^[0-9]+$/.test(data.number) &&
        data.number.length === 10 &&
        /^[a-zA-Z]+$/.test(data.name) &&
        data.name !== "" &&
        data.name.length > 2 &&
        /^[0-9]+$/.test(display.amount) &&
        display.narrator !== ""
      ) {
        setDisplay((prev) => ({
          ...prev,
          opacity: "opacity-5",
          loader: true,
          style: "",
        }));
        setTimeout(() => {
          setDisplay((prev) => ({ ...prev, loader: false, popUp1: true }));
        }, 2000);
      }
    }
  }

  function handleCancel() {
    setDisplay((prev) => ({
      ...prev,
      opacity: "",
      loader: false,
      style: " h-screen home-wrapper",
      popUp: false,
      popUp1: false,
      popUp2: false,
      transferDiv: false,
      amount: "",
      narrator: "",
      btnText: "Confirm Reciever",
    }));
  }
  return (
    <div
      className={` ${display.style} text-black w-full  top-0 absolute left-0 showMorePage bg-white pb-10 `}
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
        <p className="  py-2.5 text-sm text-center shadow-md shadow-gray-400">
          Select Tranfer Option
        </p>
        <section className=" mx-4 mt-3 flex justify-between">
          <div
            className={` w-[102px] h-[85px] ${addActive.item1} rounded-lg border border-red-600 cursor-pointer`}
            onClick={() => handleActive("uba")}
          >
            <div
              className={`ml-2 mr-[70px] mt-2 ${addActive.item1Sub}  py-1 px-1.5 rounded-full`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="15"
                viewBox="0 0 40 48"
                fill="none"
              >
                <path
                  d="M0 47.8813L8.14387 8.97778C8.14387 8.97778 22.8028 33.6666 21.717 40.7739C20.6311 47.8813 7.05802 48.3177 0 47.8813Z"
                  fill="red"
                />
                <path
                  d="M39.1481 0.118729L31.0042 39.0223C31.0042 39.0223 16.3452 14.3335 17.4311 7.22611C18.5169 0.118731 32.09 -0.317687 39.1481 0.118729Z"
                  fill="red"
                />
              </svg>
            </div>
            <p className=" text-[11px] text-center mt-4">UBA Accounts</p>
          </div>
          <div
            className={`w-[102px] h-[85px]  rounded-lg border ${addActive.item2} border-red-600 cursor-pointer`}
            onClick={() => handleActive("other")}
          >
            <i
              className={`fa-solid fa-house cursor-pointer text-red-600 text-[10px] ml-2 mt-2 ${addActive.item2Sub}  py-1.5 px-1.5 rounded-full`}
            ></i>
            <p className=" text-[11px] text-center mt-5 ">Other Banks</p>
          </div>
        </section>
        <section className=" w-[93%] h-auto mt-3 mx-2 pb-1 border border-gray-300 rounded-2xl overflow-hidden">
          <p className="text-sm pl-3 font-semibold  bg-gray-100 py-2 ">
            Transfer From:
          </p>
          <div className=" py-2">
            <p className="text-xs text-center font-semibold ">
              {user.fullName}
            </p>
            <p className="text-[10px] text-center ">
              {user.accountType}: <span className="">{user.accountNo}</span>
            </p>
          </div>
        </section>
        <section className=" w-[93%] h-auto mt-3 mx-2  border border-gray-300 rounded-2xl overflow-hidden">
          <p className="text-sm pl-3 font-semibold  bg-gray-100 py-2 ">
            Transfer To:
          </p>
          <div className=" py-2">
            <input
              type="text"
              className=" border border-gray-300 outline-none w-52 ml-1.5 rounded px-2 mb-1 text-[12px] py-1"
              placeholder="Account Number"
              value={data.number}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData((prev) => ({ ...prev, number: e.target.value }))
              }
            />
            <input
              type="text"
              className=" border border-gray-300 outline-none w-52 ml-1.5 mt-1 rounded px-2 mb-1 text-[12px] py-1"
              placeholder="Account Name"
              value={data.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            {!display.transferDiv && (
              <p
                className=" text-right text-[10px] text-red-600 mr-2 cursor-pointer"
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
              <p className=" text-xs">Save as beneficiary</p>
              <input
                type="checkbox"
                checked={display.check}
                onChange={() => {
                  display.check === false
                    ? setDisplay((prev) => ({ ...prev, check: true }))
                    : setDisplay((prev) => ({ ...prev, check: false }));
                }}
              />
            </div>

            <div>
              <input
                type="text"
                className=" border border-gray-300 bg-[#f8f8ff] outline-none w-56 ml-2 mt-1 rounded px-2 mb-3 text-[12px] py-1.5"
                placeholder="Amount"
                value={display.amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDisplay((prev) => ({ ...prev, amount: e.target.value }))
                }
              />
              <input
                type="text"
                maxLength={14}
                className=" border border-gray-300 bg-[#f8f8ff] outline-none w-56 ml-2 mt-1 rounded px-2 mb-1 text-[12px] py-1.5"
                placeholder="Narration"
                value={display.narrator}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDisplay((prev) => ({ ...prev, narrator: e.target.value }))
                }
              />
            </div>
            <p className=" text-xs text-right mr-2 ">14 characters max</p>
          </section>
        )}

        <button
          className="bg-red-600 py-2 mt-3 text-sm text-white ml-1.5 w-[230px] rounded-[4px]"
          onClick={handleBtn}
        >
          {display.btnText}
        </button>
      </div>
      {display.addNew && <Beneficiary setDisplay={setDisplay} />}

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
      {display.loader && <Loading className="absolute top-[220px] left-4" />}
      {display.popUp && (
        <PopUP
          icon={
            data.number.length !== 10 || data.name.length < 2 ? (
              <i className="fa-solid fa-xmark bg-red-600 py-3 px-5 rounded-full text-white text-2xl"></i>
            ) :  enteredPin !== user.pin ? (<i className="fa-solid fa-xmark bg-red-600 py-3 px-5 rounded-full text-white text-2xl"></i>) : (
              <div className="successImg">
                <img src={successImg} alt="thumb up" />
              </div>
            )
          }
          onClick={handleCancel}
          className="absolute top-[60px] left-4"
          title={
            data.number.length !== 10 || data.name.length < 2
              ?  "Failed" : enteredPin !== user.pin ? "Failed"
              :"Success"
          }
          msg={
            data.number.length !== 10 || data.name.length < 2
              ? "You have entered an invalid account number or name, please enter the correct and retry" 
              : enteredPin !== user.pin ? 'Incorrect PIN'
              : `You have successfully transferred NGN${display.amount} to ${data.name} Account Number: ${data.number} `
          }
        />
      )}

      {display.popUp1 && (
        <div className=" z-10  w-52 h-auto pt-6 pb-10 bg-white rounded-2xl mx-auto px-4 drop-shadow-xl absolute top-[60px] left-4 ">
          <i
            className="fa-solid fa-xmark cursor-pointer flex justify-end  pb-4 "
            onClick={handleCancel}
          ></i>
          <div className="flex flex-col justify-center items-center gap-2">
            <i className="fa-solid fa-lock-open bg-yellow-400 py-3 px-4 rounded-full text-white text-lg"></i>

            <h3 className=" font-semibold">Authentication method</h3>
            <p>PIN</p>
            <p className="text-xs">
              Transaction limits for PIN is 200,000NGN per day
            </p>
            <div className=" flex gap-1 pb-2">
              <input
                type="text"
                onChange={handleInputs}
                ref={input1Ref}
                className=" w-[35px] h-[30px] outline-none border border-[#484848] text-center rounded-lg"
                maxLength={1}
              />
              <input
                type="text"
                onChange={handleInputs}
                ref={input2Ref}
                className=" w-[35px] h-[30px] outline-none border border-[#484848] text-center rounded-lg"
                maxLength={1}
              />
              <input
                type="text"
                onChange={handleInputs}
                ref={input3Ref}
                className=" w-[35px] h-[30px] outline-none border border-[#484848] text-center rounded-lg"
                maxLength={1}
              />
              <input
                type="text"
                onChange={handleInputs}
                ref={input4Ref}
                className=" w-[35px] h-[30px] outline-none border border-[#484848] text-center rounded-lg"
                maxLength={1}
              />
            </div>
            <button
              className="bg-red-600 py-2 text-sm text-white  w-44 rounded-[4px]"
              onClick={() => {
                if (
                  input1Ref.current?.value !== undefined &&
                  input2Ref.current?.value !== undefined &&
                  input3Ref.current?.value !== undefined &&
                  input4Ref.current?.value !== undefined
                ) {
                  setEnteredPin(
                    input1Ref.current?.value +
                      input2Ref.current.value +
                      input3Ref.current.value +
                      input4Ref.current.value
                  );
                }
                if (enteredPin === user.pin) {
                  setDisplay((prev) => ({
                    ...prev,
                    popUp1: false,
                    loader: true,
                  }));
                  setTimeout(() => {
                    setDisplay((prev) => ({
                      ...prev,
                      loader: false,
                      popUp2: true,
                    }));
                  }, 2000);
                } else {
                  setDisplay((prev) => ({
                    ...prev,
                    popUp1: false,
                    loader: true,
                  }));
                  setTimeout(() => {
                    setDisplay((prev) => ({
                      ...prev,
                      loader: false,
                      popUp: true,
                    }));
                  }, 2000);
                }
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {display.popUp2 && (
        <div className=" z-10  w-52 h-auto pt-6 pb-10 bg-white rounded-2xl mx-auto px-4 drop-shadow-xl absolute top-[70px] left-4 ">
          <i
            className="fa-solid fa-xmark cursor-pointer flex justify-end  pb-4 "
            onClick={handleCancel}
          ></i>
          <div className=" flex  flex-col justify-center items-center gap-2">
            <h3 className=" font-semibold">Are you sure</h3>
            <article className=" text-xs ">
              <p>Transaction Amount : {display.amount}</p>
              <p>Total Fee : 00.00</p>
              <p>Total Amount : {display.amount}</p>
            </article>
            <button
              className="bg-red-600 py-2 text-sm text-white  w-44 rounded-[4px]"
              onClick={() => {
                setDisplay((prev) => ({
                  ...prev,
                  popUp2: false,
                  loader: true,
                }));
                setTimeout(() => {
                  setDisplay((prev) => ({
                    ...prev,
                    loader: false,
                    popUp: true,
                  }));
                }, 2000);
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
