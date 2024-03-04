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
import { Beneficiary } from "./Beneficiary";
import { PopUP } from "../components/PopUP";
import { Loading } from "../components/Loading";
import successImg from "../assests/leo_uba_thubs_up.png";


export interface detailsType {
  name: string;
  number: string;
  amount : string;
  narrator : string;
  date : string;
  time : string;
}

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
  opacity: string;
  style: string;
}

export const Transfer = ({ setDisplaysection }: homeDisplaytype) => {

  const storedData = JSON.parse(localStorage.getItem('history') || "[]")

  // contexts
  const { setBg } = useContext(BgContext);
  const userData = useContext(UserInfo)
  const { setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);
  const {beneficiaries, setBeneficiaries } = useContext(BeneficiariesContext);

  //  ref
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);
  const input4Ref = useRef<HTMLInputElement>(null);

  
  const now = new Date()


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
    opacity: "",
    style: "home-wrapper h-screen",
  });

  const [details, setDetails] = useState<detailsType>({
    name: "",
    number: "",
    amount: "",
    narrator: "",
    date : now.toDateString(),
    time : now.toLocaleTimeString([], {  hour: "numeric", minute: "2-digit",  hour12: true } )
  });

  // functions
  function handleInputs(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target;
   
    if (input.value.length === input.maxLength) {
      switch (input) {
        case input1Ref.current:
          setEnteredPin(enteredPin + input1Ref.current?.value)
          input2Ref.current?.focus();
          break;
        case input2Ref.current:
          setEnteredPin(enteredPin + input2Ref.current?.value)
          input3Ref.current?.focus();

          break;
        case input3Ref.current:
          setEnteredPin(enteredPin + input3Ref.current?.value)
          input4Ref.current?.focus();
        
          break;
        case input4Ref.current:
          setEnteredPin(enteredPin + input4Ref.current?.value)
          break;
        default:
          break;
      }
    }
    if (input.value ===  '') {
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
  }


  function handleBtn() {
    if (display.btnText === "Confirm Reciever") {
      setDisplay((prev) => ({ ...prev, opacity: "opacity-5", loader: true }));
      setTimeout(() => {
        if (
          /^[0-9]+$/.test(details.number) &&
          details.number.length === 10 &&
          /^[a-zA-Z\s]+$/.test(details.name) &&
          details.name.length > 1 
        ) {
          setDisplay((prev) => ({
            ...prev,
            opacity: "",
            loader: false,
            transferDiv: true,
            btnText: "Transfer",
          }));
        } else {
          setDisplay((prev) => ({ ...prev, popUp: true,
          style: " h-screen " }));
        }
      }, 2000);
    }
    if (display.btnText === "Transfer") {
      setDisplay((prev) => ({ ...prev, check: false }))
      if (
        /^[0-9]+$/.test(details.number) &&
        details.number.length === 10 &&
        /^[a-zA-Z\s]+$/.test(details.name) &&
        details.name.length > 1 &&
        /^[0-9]+$/.test(details.amount) &&
        details.narrator !== ""
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
      } else if (+details.amount < 5 ) {
        setDisplay((prev) => ({
          ...prev,
          opacity: "opacity-5",
          loader: true,
          style: " h-screen",
        }));
        setTimeout(() => {
          setDisplay((prev) => ({ ...prev, loader: false, popUp: true }));
        }, 2000);
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
      transferDiv: false,
      amount: "",
      narrator: "",
      btnText: "Confirm Reciever",
    }));
    
    setDetails((prev)=> ({...prev, name : '', number : "", amount : "", narrator : ""}))
    
    setEnteredPin('')
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
        

        <section className=" w-[93%] h-auto mt-3 mx-2 pb-1 border border-gray-300 rounded-2xl overflow-hidden">
          <p className="text-sm pl-3 font-semibold  bg-gray-100 py-2 ">
            Transfer From:
          </p>
          <div className=" py-2">
            <p className="text-xs text-center font-semibold ">
              {userData.fullName}
            </p>
            <p className="text-[10px] text-center ">
              {userData.accountType}: <span className="">{userData.accountNo}</span>
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
              value={details.number}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDetails((prev) => ({ ...prev, number: e.target.value }))
              }
            />
            <input
              type="text"
              className=" border border-gray-300 outline-none w-52 ml-1.5 mt-1 rounded px-2 mb-1 text-[12px] py-1"
              placeholder="Account Name"
              value={details.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDetails((prev) => ({ ...prev, name: e.target.value }))
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

                    if (setBeneficiaries !== undefined) {
                      if (display.check === false) {
                        setDisplay((prev) => ({ ...prev, check: true }))
                        const isDuplicate =  beneficiaries.some((item)=> item.name === details.name && item.number === details.number )
                          if (!isDuplicate) {
                            setBeneficiaries((prev)=> [...prev, details]) 
                          }
                        
                      } else {
                        setDisplay((prev) => ({ ...prev, check: false }))
                        const updatedArray = beneficiaries.filter((item )=> item.number !== details.number)
                        setBeneficiaries(updatedArray)
                      }
                    }
                }}
              />
            </div>

            <div>
              <input
                type="text"
                className=" border border-gray-300 bg-[#f8f8ff] outline-none w-56 ml-2 mt-1 rounded px-2 mb-3 text-[12px] py-1.5"
                placeholder="Amount"
                value={details.amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDetails((prev) => ({ ...prev, amount: e.target.value }))
                }
              />
              <input
                type="text"
                maxLength={14}
                className=" border border-gray-300 bg-[#f8f8ff] outline-none w-56 ml-2 mt-1 rounded px-2 mb-1 text-[12px] py-1.5"
                placeholder="Narration"
                value={details.narrator}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDetails((prev) => ({ ...prev, narrator: e.target.value }))
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
      {display.addNew && <Beneficiary setDisplay={setDisplay}  setDetails={setDetails} />}

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
            details.number.length !== 10 || details.name.length < 1 ? (
              <i className="fa-solid fa-xmark bg-red-600 py-3 px-5 rounded-full text-white text-2xl"></i>
            ) :  enteredPin !== userData.pin ? (<i className="fa-solid fa-xmark bg-red-600 py-3 px-5 rounded-full text-white text-2xl"></i>) : +details.amount < 5 ? (<i className="fa-solid fa-xmark bg-red-600 py-3 px-5 rounded-full text-white text-2xl"></i>) : (
              <div className="successImg">
                <img src={successImg} alt="thumb up" />
              </div>
            )
          }
          onClick={handleCancel}
          className="absolute top-[60px] left-4"
          title={
            details.number.length !== 10 || details.name.length < 1
              ?  "Failed" : +details.amount < 5 ? 'Failed' : enteredPin !== userData.pin ? "Failed"
              :"Success"
          }
          msg={
            details.number.length !== 10 || details.name.length < 1
              ? "Your entered inputs are either invalid or empty, please check and enter a valid detail and retry" 
              : enteredPin !== userData.pin ? 'Invalid PIN' : +details.amount < 5 ? `you can't tranfer below 5NGN`
              : `You have successfully transferred NGN${details.amount} to ${details.name} Account Number: ${details.number} `
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
                if (enteredPin !== userData.pin) {
                  
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
                      popUp2: true,
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
        <div className=" z-10  w-52 h-auto pt-6 pb-10 bg-white rounded-2xl mx-auto px-4 drop-shadow-xl absolute top-[120px] left-4 ">
          <i
            className="fa-solid fa-xmark cursor-pointer flex justify-end  pb-4 "
            onClick={handleCancel}
          ></i>
          <div className=" flex  flex-col justify-center items-center gap-2">
            <h3 className=" font-semibold">Are you sure</h3>
            <article className=" text-xs ">
              <p>Transaction Amount : {details.amount}</p>
              <p>Total Fee : 00.00</p>
              <p>Total Amount : {details.amount}</p>
            </article>
            <button
              className="bg-red-600 py-2 text-sm text-white  w-44 rounded-[4px]"
              onClick={() => {
                setDetails((prev)=> ({...prev, date :now.toDateString(), time : now.toLocaleTimeString([],  { hour: "numeric", minute: "2-digit",  hour12: true })  }))
                localStorage.setItem('history', JSON.stringify([...storedData, details]))
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
                console.log(userData.history)

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
