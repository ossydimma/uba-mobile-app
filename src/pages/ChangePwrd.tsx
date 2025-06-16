import React, { useEffect, useState } from "react";
import { AuthPin } from "../components/AuthPin";
import { Loading } from "../components/Loading";
import { MoreHeader } from "../components/MoreHeader";
import type { forgotType } from "./ForgottenPin";
import { jwtDecode } from "jwt-decode";
import {api} from "../axios";

interface resType {
  Contact: string;
  OldPassword: string;
  NewPassword: string;
  Pin: string;
}

export const ChangePwrd = ({ setDisplay }: forgotType) => {
  useEffect(() => {
    const token = localStorage.getItem("authToken") || "{}";
    if (token) {
      setDecodeToken(jwtDecode(token));
    }
  }, []);

  // states
  const [enteredPin, setEnteredPin] = useState<string>("");
  const [message, setMessage] = useState<string>();

  const [input, setInput] = useState({
    Value1: "",
    Value2: "",
    Value3: "",
    Type1: "password",
    Type2: "password",
    Type3: "password",
  });
  const [decodeToken, setDecodeToken] = useState<resType>({} as resType);

  const [Show, setShow] = useState({
    auth: false,
    div: false,
    loader: false,
    btnText: "SUBMIT",
    feedback1: "",
    feedback2: "",
    feedback3: "",
    icon1: true,
    icon2: true,
    icon3: true,
  });

  // functions
  async function handleSubmitBtn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setShow((prev) => ({
      ...prev,
      feedback1: "",
      feedback2: "",
      feedback3: "",
      btnText: "Checking...",
    }));

    input.Value1 === ""
      ? setShow((prev) => ({ ...prev, feedback1: "Field must be filled" }))
      : setShow((prev) => ({ ...prev, feedback1: "" }));

    input.Value2 === ""
      ? setShow((prev) => ({ ...prev, feedback2: "Field must be filled" }))
      : !/(?=.*[A-Z])/.test(input.Value2)
      ? setShow((prev) => ({
          ...prev,
          feedback2: "password must be contain at least one Captial letter",
        }))
      : !/(?=.*[0-9])/.test(input.Value2)
      ? setShow((prev) => ({
          ...prev,
          feedback2: "password must be contain a number",
        }))
      : !/(?=.*[!@#$%^&*])/.test(input.Value2)
      ? setShow((prev) => ({
          ...prev,
          feedback2: "password must be contain a special symbol _,@,- ",
        }))
      : !/(?=.{8,})/.test(input.Value2)
      ? setShow((prev) => ({
          ...prev,
          feedback2: "password must be more than 8 characters",
        }))
      : setShow((prev) => ({ ...prev, feedback2: "" }));

    input.Value3 === ""
      ? setShow((prev) => ({ ...prev, feedback3: "Field must be filled" }))
      : input.Value3 !== input.Value2
      ? setShow((prev) => ({
          ...prev,
          feedback3: "Both passwords did not match",
        }))
      : setShow((prev) => ({ ...prev, feedback3: "" }));

    setShow((prev) => ({ ...prev, btnText: "SUBMIT" }));
    if (
      input.Value1 !== "" &&
      input.Value2 !== "" &&
      /(?=.*[A-Z])/.test(input.Value2) &&
      /(?=.*[!@#$%^&*])/.test(input.Value2) &&
      /(?=.{8,})/.test(input.Value2) &&
      /(?=.*[0-9])/.test(input.Value2) &&
      /(?=.*[A-Z])/.test(input.Value3) &&
      /(?=.*[!@#$%^&*])/.test(input.Value3) &&
      /(?=.{8,})/.test(input.Value3) &&
      /(?=.*[0-9])/.test(input.Value3) &&
      input.Value3 === input.Value2
    ) {
      setShow((prev) => ({ ...prev, auth: true, btnText: "SUBMIT" }));
    }
  }

  const handleCancel = () => {
    setDisplay((prev) => ({ ...prev, changePwrd: false }));
  };

  return (
    <div className=" text-black w-full h-screen top-0 absolute left-0 showMorePage bg-white ">
      <main className="relative">
        <MoreHeader name="Change password" onClick={handleCancel} />
        <section className="mx-4 mt-3">
          <p className="text-lg sm:text-sm">Please enter old and new password</p>

          <form>
            <div className="flex flex-col gap-4 relative ">
              <input
                type={input.Type1}
                value={input.Value1}
                className=" border-2 border-gray-400  rounded pl-6 pr-12 py-3 text-lg sm:text-xs  bg-slate-100 outline-none"
                placeholder="Old Password"
                onChange={(e) => {
                  setInput((prev) => ({ ...prev, Value1: e.target.value }));
                }}
              />
              {/* <i className="fa-solid fa-lock fa-xs absolute top-20 left-2 text-red-600"></i> */}
              <div
                onClick={() => {
                  if (Show.icon1) {
                    setShow((prev) => ({ ...prev, icon1: false }));
                    setInput((prev) => ({ ...prev, Type1: "text" }));
                  } else {
                    setShow((prev) => ({ ...prev, icon1: true }));
                    setInput((prev) => ({ ...prev, Type1: "password" }));
                  }
                }}
                className="cursor-pointer relative"
              >
                {Show.icon1 && (
                  <i className="fa-solid fa-eye fa-xs absolute bottom-7 text-lg sm:text-sm right-2 text-red-600 border-l-2 border-black px-2"></i>
                )}
                {!Show.icon1 && (
                  <i className="fa-solid fa-eye-slash fa-xs absolute bottom-7 right-2 text-lg sm:text-sm text-red-600 border-l-2 border-black px-2"></i>
                )}
              </div>
              <p className="text-red-500 text-lg sm:text-xs -mt-6 ">{Show.feedback1}</p>

              <input
                type={input.Type2}
                value={input.Value2}
                className=" border-2 border-gray-400  rounded pl-6 pr-12 py-3 text-lg sm:text-xs  bg-slate-100 outline-none"
                placeholder="New Password"
                onChange={(e) => {
                  setInput((prev) => ({ ...prev, Value2: e.target.value }));
                }}
              />
              {/* <i className="fa-solid fa-lock fa-xs absolute top-20 left-2 text-red-600"></i> */}
              <div
                onClick={() => {
                  if (Show.icon2) {
                    setShow((prev) => ({ ...prev, icon2: false }));
                    setInput((prev) => ({ ...prev, Type2: "text" }));
                  } else {
                    setShow((prev) => ({ ...prev, icon2: true }));
                    setInput((prev) => ({ ...prev, Type2: "password" }));
                  }
                }}
                className="cursor-pointer relative"
              >
                {Show.icon2 && (
                  <i className="fa-solid fa-eye fa-xs absolute bottom-7 text-lg sm:text-sm right-2 text-red-600 border-l-2 border-black px-2"></i>
                )}
                {!Show.icon2 && (
                  <i className="fa-solid fa-eye-slash fa-xs absolute bottom-7 right-2 text-lg sm:text-sm text-red-600 border-l-2 border-black px-2"></i>
                )}
              </div>
              <p className="text-red-500 text-lg sm:text-xs -mt-6 ">{Show.feedback2}</p>

              <input
                type={input.Type3}
                value={input.Value3}
                className=" border-2 border-gray-400  rounded pl-6 pr-12 py-3 text-lg sm:text-xs  bg-slate-100 outline-none"
                placeholder="Comfirm Password"
                onChange={(e) => {
                  setInput((prev) => ({ ...prev, Value3: e.target.value }));
                }}
              />

              <div
                onClick={() => {
                  if (Show.icon3) {
                    setShow((prev) => ({ ...prev, icon3: false }));
                    setInput((prev) => ({ ...prev, Type3: "text" }));
                  } else {
                    setShow((prev) => ({ ...prev, icon3: true }));
                    setInput((prev) => ({ ...prev, Type3: "password" }));
                  }
                }}
                className="cursor-pointer relative"
              >
                {Show.icon3 && (
                  <i className="fa-solid fa-eye fa-xs absolute bottom-7 right-2 border-black px-2 border-l-2 text-red-600 text-lg sm:text-sm"></i>
                )}
                {!Show.icon3 && (
                  <i className="fa-solid fa-eye-slash fa-xs absolute bottom-7 right-2 border-black px-2 border-l-2 text-red-600 text-lg sm:text-sm"></i>
                )}
              </div>
              <p className="text-red-500 text-lg sm:text-xs -mt-6 ">{Show.feedback3}</p>
            </div>
            <button
              className=" rounded-md text-lg sm:text-sm py-3 bg-red-600 px-10 text-black ml-10 mt-6 border-white border-2 hover:bg-red-500 hover:scale-90 hover:border-black hover:border-2 hover:text-slate-100"
              onClick={handleSubmitBtn}
            >
              {Show.btnText}
            </button>
          </form>
        </section>
        {Show.div && (
          <section className=" bg-white flex flex-col gap-5  justify-center z-40 absolute  top-16 right-8 left-6 px-4 py-10 sm:py-4 shadow-md shadow-gray-600">
            <i
              className="fa-solid fa-xmark cursor-pointer flex justify-end pr-5 text-xl sm:text-lg "
              onClick={() =>
                setShow((prev) => ({
                  ...prev,
                  div: false,
                  loader: false,
                  auth: false,
                }))
              }
            ></i>
            <div className=" flex justify-center mb-1">
              {message?.includes("invalid") ||
              message?.includes("incorrect") ||
              message?.includes("same") ? (
                <i className="fa-solid fa-xmark bg-red-600 py-6 sm:py-3 px-9 sm:px-5 rounded-full text-white text-5xl sm:text-2xl"></i>
              ) : (
                ""
              )}
            </div>
            <p className="text-lg sm:text-xs text-center">{message}</p>

            <button
              className="bg-red-600 mx-auto sm:mx-0 py-2 sm:text-sm text-white w-36 rounded-[4px] text-lg"
              onClick={() => {
                setEnteredPin("");
                setShow((prev) => ({
                  ...prev,
                  loader: false,
                  auth: false,
                  div: false,
                }));
              }}
            >
              ok
            </button>
          </section>
        )}
        {Show.auth && (
          <AuthPin
            enteredPin={enteredPin}
            setEnteredPin={setEnteredPin}
            className=" top-[39.5px] left-[6rem] sm:left-[16.4px] w-[215px]"
            descrip=""
            handleCancel={() => setShow((prev) => ({ ...prev, auth: false }))}
            handleNext={async () => {
              if (enteredPin !== "") {
                setShow((prev) => ({ ...prev, loader: true, auth: false }));
                const data: resType = {
                  Contact: decodeToken.Contact,
                  OldPassword: input.Value1,
                  NewPassword: input.Value2,
                  Pin: enteredPin,
                };
                try {
                  const res = await api.put(
                    "/change-password",
                    data
                  );
                  setMessage(res.data);
                  setShow((prev) => ({ ...prev, auth: false, div: true }));
                  setInput((prev) => ({
                    ...prev,
                    Value1: "",
                    Value2: "",
                    Value3: "",
                  }));
                  setEnteredPin("");
                } catch (err: any) {
                  if (err.status === 400 || 401 || 404 ) {
                    setMessage(err.response.data)
                  }else {
                    setMessage("Server error contact costumer service");
                  };
                  setShow((prev) => ({ ...prev, div: true }));
                  setEnteredPin("");
                }
              }
            }}
          />
        )}
        {Show.loader && (
          <div className="bg-white z-30 h-screen w-full absolute top-0 ">
            <Loading className=" absolute top-[220px] left-[6rem] sm:left-4  " />
          </div>
        )}
      </main>
    </div>
  );
};
