import React, { useState } from "react";
import { MoreHeader } from "../components/MoreHeader";

export const ForgetPaswrd = () => {
  // states
  const [changeType, setChangeType] = useState<string>("password");
  const [showIcon, setShowIcon] = useState<boolean>(true);

  const [showFeedBack1, setshowFeedBack1] = useState<string>("");
  const [showFeedBack2, setshowFeedBack2] = useState<string>("");
  const [showFeedBack3, setshowFeedBack3] = useState<string>("");

  const [inputValue1, setInputValue1] = useState<string>("");
  const [inputValue2, setInputValue2] = useState<string>("");
  const [inputValue3, setInputValue3] = useState<string>("");

  const [showDiv, setShowDiv] = useState<boolean>(false);
  const [btnText, setBtnText] = useState<string>("SUBMIT");

  // function
  function handleChangeType(): void {
    if (showIcon === true) {
      setShowIcon(false);
      setChangeType("text");
    } else {
      setShowIcon(true);
      setChangeType("password");
    }
  }

  function handleSubmitBtn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const isNumber = (value: string) => {
      return !isNaN(Number(value));
    };
    setshowFeedBack1("");
    setshowFeedBack2("");
    setshowFeedBack3("");
    setBtnText("Checking...");

    setTimeout(() => {
      inputValue1 === ""
        ? setshowFeedBack1("Field must be filled")
        : inputValue1.length < 11
        ? setshowFeedBack1("Enter a valid Number")
        : !isNumber(inputValue1)
        ? setshowFeedBack1("Field must be a Number")
        : setshowFeedBack1("");

      inputValue2 === ""
        ? setshowFeedBack2("Field must be filled")
        : !/(?=.*[A-Z])/.test(inputValue2)
        ? setshowFeedBack2(
            "password must be contain at least one Captial letter"
          )
        : !/(?=.*[0-9])/.test(inputValue2)
        ? setshowFeedBack2("password must be contain a number")
        : !/(?=.*[!@#$%^&*])/.test(inputValue2)
        ? setshowFeedBack2("password must be contain a special symbol _,@,- ")
        : !/(?=.{8,})/.test(inputValue2)
        ? setshowFeedBack2("password must be more than 8 characters")
        : setshowFeedBack2("");

      inputValue3 === ""
        ? setshowFeedBack3("Field must be filled")
        : inputValue3 !== inputValue2
        ? setshowFeedBack3("Both passwords did not match")
        : setshowFeedBack3("");

      setBtnText("SUBMIT");
      if (
        inputValue1 !== "" &&
        isNumber(inputValue1) &&
        inputValue1.length >= 11 &&
        inputValue2 !== "" &&
        /(?=.*[A-Z])/.test(inputValue2) &&
        /(?=.*[!@#$%^&*])/.test(inputValue2) &&
        /(?=.{8,})/.test(inputValue2) &&
        /(?=.*[0-9])/.test(inputValue2) &&
        inputValue3 !== "" &&
        /(?=.*[A-Z])/.test(inputValue3) &&
        /(?=.*[!@#$%^&*])/.test(inputValue3) &&
        /(?=.{8,})/.test(inputValue3) &&
        /(?=.*[0-9])/.test(inputValue3)
      ) {
        setTimeout(() => {
          setShowDiv(true);
          setBtnText("SUBMIT");
        }, 2000);
      }
    }, 2000);
  }

  function handleChangeInput1(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue1(e.target.value);
  }
  function handleChangeInput2(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue2(e.target.value);
  }
  function handleChangeInput3(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue3(e.target.value);
  }
  return (
    <div className=" text-black w-full h-screen top-0 absolute left-0 showMorePage bg-white ">
      <main className="relative">
        <MoreHeader name="Login Assistance" />
        <section className="mx-4 mt-2">
          <p className="text-sm">
            if you forgot your password, please fill in the details below:
          </p>

          <form>
            <div className="flex flex-col gap-4 relative mt-5 ">
              <input
                type="text"
                className=" border-2 border-gray-400 rounded py-3 pl-12 pr-3 text-xs  bg-slate-100 outline-none"
                placeholder="Mobile Number"
                onChange={handleChangeInput1}
              />
              <i className="fa-solid fa-user  absolute top-2.5 text-sm left-2 text-red-600 border-r-2 border-black px-2"></i>
              <p className="text-red-500 text-xs -mt-2 ">{showFeedBack1}</p>

              <input
                type={changeType}
                className=" border-2 border-gray-400  rounded pl-6 pr-12 py-3 text-xs  bg-slate-100 outline-none"
                placeholder="New Password"
                onChange={handleChangeInput2}
              />
              {/* <i className="fa-solid fa-lock fa-xs absolute top-20 left-2 text-red-600"></i> */}
              <div
                onClick={handleChangeType}
                className="cursor-pointer relative"
              >
                {showIcon && (
                  <i className="fa-solid fa-eye fa-xs absolute bottom-7 text-sm right-2 text-red-600 border-l-2 border-black px-2"></i>
                )}
                {!showIcon && (
                  <i className="fa-solid fa-eye-slash fa-xs absolute bottom-7 right-2 text-sm text-red-600 border-l-2 border-black px-2"></i>
                )}
              </div>
              <p className="text-red-500 text-xs -mt-4 ">{showFeedBack2}</p>

              <input
                type={changeType}
                className=" border-2 border-gray-400  rounded pl-6 pr-12 py-3 text-xs  bg-slate-100 outline-none"
                placeholder="Comfirm Password"
                onChange={handleChangeInput3}
              />
              {/* <i className="fa-solid fa-lock fa-xs absolute bottom-6 left-2 text-red-600"></i> */}
              <div
                onClick={handleChangeType}
                className="cursor-pointer relative"
              >
                {showIcon && (
                  <i className="fa-solid fa-eye fa-xs absolute bottom-7 right-2 border-black px-2 border-l-2 text-red-600 text-sm"></i>
                )}
                {!showIcon && (
                  <i className="fa-solid fa-eye-slash fa-xs absolute bottom-7 right-2 border-black px-2 border-l-2 text-red-600 text-sm"></i>
                )}
              </div>
              <p className="text-red-500 text-xs -mt-4 ">{showFeedBack3}</p>
            </div>
            <button
              className=" rounded-md py-3 bg-red-600 px-10 text-black ml-10 mt-6 border-white border-2 hover:bg-red-500 hover:scale-90 hover:border-black hover:border-2 hover:text-slate-100"
              onClick={handleSubmitBtn}
            >
              {btnText}
            </button>
          </form>
        </section>
        {showDiv && (
          <section className=" bg-white flex justify-center absolute  top-3 right-8 left-6 px-1 py-4 shadow-md shadow-gray-600">
            <p className="text-xs text-center">
              password has been changed Successfuly
            </p>
          </section>
        )}
      </main>
    </div>
  );
};
