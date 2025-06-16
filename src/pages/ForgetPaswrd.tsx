import { useContext, useEffect, useState } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { BgContext, MorePageContext } from "../MyContext";
import { AuthPin } from "../components/AuthPin";
import { Loading } from "../components/Loading";
import { jwtDecode } from "jwt-decode";
import {api} from "../axios";

interface forgottenType {
  setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface resType {
  Contact: string;
  NewPassword: string;
  Pin: string;
}

export const ForgetPaswrd = ({ setShowSignIn }: forgottenType) => {
  // contexts
  const { setBg } = useContext(BgContext);
  const { setShowForgottenPage } = useContext(MorePageContext);

  // states
  const [message, setMessage] = useState<string>("");
  const [enteredPin, setEnteredPin] = useState<string>("");
  const [changeType, setChangeType] = useState<string>("password");

  const [inputValue1, setInputValue1] = useState<string>("");
  const [inputValue2, setInputValue2] = useState<string>("");
  const [inputValue3, setInputValue3] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [display, setDisplay] = useState({
    auth: false,
    icon: true,
    div: false,
    loader: false,
    btnText: "SUBMIT",
    feedback1: "",
    feedback2: "",
    feedback3: "",
  });

  // function
  function handleChangeType(): void {
    if (display.icon === true) {
      setDisplay((prev) => ({ ...prev, icon: false }));
      setChangeType("text");
    } else {
      setDisplay((prev) => ({ ...prev, icon: true }));
      setChangeType("password");
    }
  }

  async function handleSubmitBtn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const isNumber = (value: string) => {
      return !isNaN(Number(value));
    };
    setDisplay((prev) => ({
      ...prev,
      feedback1: "",
      feedback2: "",
      feedback3: "",
      btnText: "Checking...",
    }));

    inputValue1 === ""
      ? setDisplay((prev) => ({ ...prev, feedback1: "Field must be filled" }))
      : setDisplay((prev) => ({ ...prev, feedback1: "" }));

    inputValue2 === ""
      ? setDisplay((prev) => ({ ...prev, feedback2: "Field must be filled" }))
      : !/(?=.*[A-Z])/.test(inputValue2)
      ? setDisplay((prev) => ({
          ...prev,
          feedback2: "password must be contain at least one Captial letter",
        }))
      : !/(?=.*[0-9])/.test(inputValue2)
      ? setDisplay((prev) => ({
          ...prev,
          feedback2: "password must be contain a number",
        }))
      : !/(?=.*[!@#$%^&*])/.test(inputValue2)
      ? setDisplay((prev) => ({
          ...prev,
          feedback2: "password must be contain a special symbol _,@,- ",
        }))
      : !/(?=.{8,})/.test(inputValue2)
      ? setDisplay((prev) => ({
          ...prev,
          feedback2: "password must be more than 8 characters",
        }))
      : setDisplay((prev) => ({ ...prev, feedback2: "" }));

    inputValue3 === ""
      ? setDisplay((prev) => ({ ...prev, feedback3: "Field must be filled" }))
      : inputValue3 !== inputValue2
      ? setDisplay((prev) => ({
          ...prev,
          feedback3: "Both passwords did not match",
        }))
      : setDisplay((prev) => ({ ...prev, feedback3: "" }));

    setDisplay((prev) => ({ ...prev, btnText: "SUBMIT" }));
    if (
      inputValue1 !== "" &&
      isNumber(inputValue1) &&
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
      setDisplay((prev) => ({ ...prev, btnText: "checking..." }));
      setTimeout(() => {
        setDisplay((prev) => ({ ...prev, auth: true }));
        setDisplay((prev) => ({ ...prev, btnText: "SUBMIT" }));
      }, 2000);
    }
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
  const handleCancel = (): void => {
    if (setShowForgottenPage) {
      setShowForgottenPage(false);
      setBg("phone-deafult-screen");
    }
  };
  return (
    <div className=" text-black w-full h-screen top-0 absolute left-0 showMorePage bg-white ">
      <main className="relative">
        <MoreHeader name="Login Assistance" onClick={handleCancel} />
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
                value={inputValue1}
                onChange={handleChangeInput1}
              />
              <i className="fa-solid fa-user  absolute top-2.5 text-sm left-2 text-red-600 border-r-2 border-black px-2"></i>
              <p className="text-red-500 text-xs -mt-2 ">{display.feedback1}</p>

              <input
                type={changeType}
                className=" border-2 border-gray-400  rounded pl-6 pr-12 py-3 text-xs  bg-slate-100 outline-none"
                placeholder="New Password"
                value={inputValue2}
                onChange={handleChangeInput2}
              />
              {/* <i className="fa-solid fa-lock fa-xs absolute top-20 left-2 text-red-600"></i> */}
              <div
                onClick={handleChangeType}
                className="cursor-pointer relative"
              >
                {display.icon && (
                  <i className="fa-solid fa-eye fa-xs absolute bottom-7 text-sm right-2 text-red-600 border-l-2 border-black px-2"></i>
                )}
                {!display.icon && (
                  <i className="fa-solid fa-eye-slash fa-xs absolute bottom-7 right-2 text-sm text-red-600 border-l-2 border-black px-2"></i>
                )}
              </div>
              <p className="text-red-500 text-xs -mt-4 ">{display.feedback2}</p>

              <input
                type={changeType}
                className=" border-2 border-gray-400  rounded pl-6 pr-12 py-3 text-xs  bg-slate-100 outline-none"
                placeholder="Comfirm Password"
                value={inputValue3}
                onChange={handleChangeInput3}
              />

              <div
                onClick={handleChangeType}
                className="cursor-pointer relative"
              >
                {display.icon && (
                  <i className="fa-solid fa-eye fa-xs absolute bottom-7 right-2 border-black px-2 border-l-2 text-red-600 text-sm"></i>
                )}
                {!display.icon && (
                  <i className="fa-solid fa-eye-slash fa-xs absolute bottom-7 right-2 border-black px-2 border-l-2 text-red-600 text-sm"></i>
                )}
              </div>
              <p className="text-red-500 text-xs -mt-4 ">{display.feedback3}</p>
            </div>
            <button
              className=" rounded-md py-3 bg-red-600 px-10 text-black ml-10 mt-6 border-white border-2 hover:bg-red-500 hover:scale-90 hover:border-black hover:border-2 hover:text-slate-100"
              onClick={handleSubmitBtn}
            >
              {display.btnText}
            </button>
          </form>
        </section>
        {display.div && (
          <div className="bg-white z-30 h-screen w-full absolute top-0 ">
            <section className=" bg-white flex flex-col gap-5  justify-center z-40 absolute  top-16 right-8 left-6 px-1 py-4 shadow-md shadow-gray-600">
              <i
                className="fa-solid fa-xmark cursor-pointer flex justify-end pr-5  "
                onClick={handleCancel}
              ></i>
              <div className=" flex justify-center mb-1">
                {!isSuccess ? (
                  <i className="fa-solid fa-xmark bg-red-600 py-3 px-5 rounded-full text-white text-2xl"></i>
                ) : (
                  ""
                )}
              </div>
              <p className="sm:text-xs text-center">{message}</p>
              <div className="mx-auto">
                <button
                  className="bg-red-600 py-2 sm:text-sm text-white ml-1  w-44 rounded-[4px]"
                  onClick={() => {
                    setEnteredPin("");
                    setDisplay((prev) => ({
                      ...prev,
                      loader: false,
                      div: false,
                      auth: false,
                    }));
                    if (isSuccess) {
                      if (setShowForgottenPage) {
                        setShowForgottenPage(false);
                        setBg("phone-deafult-screen");
                        setShowSignIn(true);
                      }
                    }
                    // else {
                    //   handleCancel();
                    // }
                  }}
                >
                  {isSuccess ? "Log in" : `Try Again`}
                </button>
              </div>
            </section>
          </div>
        )}
        {display.auth && (
          <div className="bg-white z-30 h-screen w-full absolute top-0 ">
            <AuthPin
              enteredPin={enteredPin}
              setEnteredPin={setEnteredPin}
              className=" top-[75px] left-[6rem] sm:left-[16.4px] w-[215px]"
              descrip=""
              handleCancel={() =>
                setDisplay((prev) => ({ ...prev, auth: false }))
              }
              handleNext={async () => {
                const data: resType = {
                  Contact: inputValue1,
                  NewPassword: inputValue2,
                  Pin: enteredPin,
                };
                setDisplay((prev) => ({ ...prev, loader: true, auth: false }));

                try {
                  const res = await api.put("/Forgotten-Password", data);
                  setMessage(res.data);
                  setIsSuccess(true);
                  setEnteredPin("");
                  setInputValue1("");
                  setInputValue2("");
                  setInputValue3("");
                } catch (err: any) {
                  setIsSuccess(false);
                  if (err.status === 400 || 401 || 404) {
                    setMessage(err.response.data);
                  } else {
                    setMessage("Server error contact costumer service");
                  }
                  console.log(err.response.data);
                  setEnteredPin("");
                }

                setDisplay((prev) => ({
                  ...prev,
                  auth: false,
                  loader: false,
                  div: true,
                }));
                // setTimeout(()=> {
                //    setDisplay((prev) => ({ ...prev, auth: false, div: false,}));
                // }, 3000)
              }}
            />
          </div>
        )}
        {display.loader && (
          <div className="bg-white z-30 h-screen w-full absolute top-0 ">
            <Loading className=" absolute top-[220px] left-[6rem] sm:left-4  " />
          </div>
        )}
      </main>
    </div>
  );
};
