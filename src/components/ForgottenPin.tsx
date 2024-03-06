import { MoreHeader } from "./MoreHeader";
import type { displayType } from "../pages/Settings";
import { useState } from "react";

interface forgotType {
  setDisplay: React.Dispatch<React.SetStateAction<displayType>>;
}

export const ForgottenPin = ({ setDisplay }: forgotType) => {
  const userData = JSON.parse(localStorage.getItem("userInfo") || "{}");

  // states
  const [show, setShow] = useState({
    icon1: true,
    icon2: true,
    icon3: true,
    feedback1: "",
    feedback2: "",
    feedback3: "",
    btnText: "SUBMIT",
    popUp: false,
  });
  const [input, setInput] = useState({
    Value1: "",
    Value2: "",
    Value3: "",
    Type1: "password",
    Type2: "password",
    Type3: "password",
  });

  // functions
  function handleSubmitBtn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setShow((prev) => ({
      ...prev,
      feedback1: "",
      feedback2: "",
      feedback3: "",
      btnText: "Checking...",
    }));

    setTimeout(() => {
      if (input.Value1 === "") {
        setShow((prev) => ({ ...prev, feedback1: "Field must be filled" }));
      } else if (input.Value1 !== userData.password) {
        setShow((prev) => ({
          ...prev,
          feedback1: "Enter a incorrect Password",
        }));
      } else {
        setShow((prev) => ({ ...prev, feedback1: "" }));
      }

      input.Value2 === ""
        ? setShow((prev) => ({ ...prev, feedback2: "Field must be filled" }))
        : !/^[0-9]+$/.test(input.Value2)
        ? setShow((prev) => ({
            ...prev,
            feedback2: "PIN should contain only numbers",
          }))
        : input.Value2.length !== 4
        ? setShow((prev) => ({
            ...prev,
            feedback2: "PIN shouldn't be less or greater than 4",
          }))
        : setShow((prev) => ({ ...prev, feedback2: "" }));

      input.Value3 === ""
        ? setShow((prev) => ({ ...prev, feedback3: "Field must be filled" }))
        : input.Value2 !== input.Value3
        ? setShow((prev) => ({ ...prev, feedback3: "Both PIN did not match" }))
        : setShow((prev) => ({ ...prev, feedback3: "" }));

      if (
        input.Value2 !== "" &&
        /^[0-9]+$/.test(input.Value2) &&
        input.Value2.length === 4 &&
        input.Value2 === input.Value3 &&
        /^[0-9]+$/.test(input.Value3) &&
        input.Value2.length === 4
      ) {
        userData.pin = input.Value2;
        localStorage.setItem("userInfo", JSON.stringify(userData));

        setShow((prev) => ({ ...prev, popUp: true }));

        setTimeout(() => {
          setShow((prev) => ({ ...prev, popUp: false }));
        }, 3000);

        setInput((prev) => ({ ...prev, Value1: "", Value2: "", Value3: "" }));
      }

      setShow((prev) => ({ ...prev, btnText: "SUBMIT" }));
    }, 2000);
  }

  return (
    <div className=" absolute top-0 w-full bg-white h-full">
      <main className=" ">
        <MoreHeader
          name="Forgot PIN"
          onClick={() => setDisplay((prev) => ({ ...prev, forgotPin: false }))}
        />
        <form className=" mx-3">
          <div className="flex flex-col gap-4 relative mt-5 ">
            <input
              type={input.Type1}
              value={input.Value1}
              className=" border-2 border-gray-400  rounded pl-6 pr-12 py-3 text-xs  bg-slate-100 outline-none"
              placeholder="Password"
              onChange={(e) =>
                setInput((prev) => ({ ...prev, Value1: e.target.value }))
              }
            />
            {/* <i className="fa-solid fa-lock fa-xs absolute top-20 left-2 text-red-600"></i> */}
            <div
              onClick={() => {
                if (show.icon1) {
                  setShow((prev) => ({ ...prev, icon1: false }));
                  setInput((prev) => ({ ...prev, Type1: "text" }));
                } else {
                  setShow((prev) => ({ ...prev, icon1: true }));
                  setInput((prev) => ({ ...prev, Type1: "password" }));
                }
              }}
              className="cursor-pointer relative"
            >
              {show.icon1 && (
                <i className="fa-solid fa-eye fa-xs absolute bottom-7 text-sm right-2 text-red-600 border-l-2 border-black px-2"></i>
              )}
              {!show.icon1 && (
                <i className="fa-solid fa-eye-slash fa-xs absolute bottom-7 right-2 text-sm text-red-600 border-l-2 border-black px-2"></i>
              )}
            </div>
            <p className="text-red-500 text-xs -mt-4 ">{show.feedback1}</p>

            <input
              type={input.Type2}
              value={input.Value2}
              className=" border-2 border-gray-400  rounded pl-6 pr-12 py-3 text-xs  bg-slate-100 outline-none"
              placeholder="PIN"
              onChange={(e) =>
                setInput((prev) => ({ ...prev, Value2: e.target.value }))
              }
            />
            {/* <i className="fa-solid fa-lock fa-xs absolute top-20 left-2 text-red-600"></i> */}
            <div
              onClick={() => {
                if (show.icon2) {
                  setShow((prev) => ({ ...prev, icon2: false }));
                  setInput((prev) => ({ ...prev, Type2: "text" }));
                } else {
                  setShow((prev) => ({ ...prev, icon2: true }));
                  setInput((prev) => ({ ...prev, Type2: "password" }));
                }
              }}
              className="cursor-pointer relative"
            >
              {show.icon2 && (
                <i className="fa-solid fa-eye fa-xs absolute bottom-7 text-sm right-2 text-red-600 border-l-2 border-black px-2"></i>
              )}
              {!show.icon2 && (
                <i className="fa-solid fa-eye-slash fa-xs absolute bottom-7 right-2 text-sm text-red-600 border-l-2 border-black px-2"></i>
              )}
            </div>
            <p className="text-red-500 text-xs -mt-4 ">{show.feedback2}</p>

            <input
              type={input.Type3}
              value={input.Value3}
              className=" border-2 border-gray-400  rounded pl-6 pr-12 py-3 text-xs  bg-slate-100 outline-none"
              placeholder="Comfirm PIN"
              onChange={(e) =>
                setInput((prev) => ({ ...prev, Value3: e.target.value }))
              }
            />

            <div
              onClick={() => {
                if (show.icon3) {
                  setShow((prev) => ({ ...prev, icon3: false }));
                  setInput((prev) => ({ ...prev, Type3: "text" }));
                } else {
                  setShow((prev) => ({ ...prev, icon3: true }));
                  setInput((prev) => ({ ...prev, Type3: "password" }));
                }
              }}
              className="cursor-pointer relative"
            >
              {show.icon3 && (
                <i className="fa-solid fa-eye fa-xs absolute bottom-7 right-2 border-black px-2 border-l-2 text-red-600 text-sm"></i>
              )}
              {!show.icon3 && (
                <i className="fa-solid fa-eye-slash fa-xs absolute bottom-7 right-2 border-black px-2 border-l-2 text-red-600 text-sm"></i>
              )}
            </div>
            <p className="text-red-500 text-xs -mt-4 ">{show.feedback3}</p>
          </div>
          <button
            className=" rounded-md py-3 bg-red-600 px-10 text-black ml-10 mt-6 border-white border-2 hover:bg-red-500 hover:scale-90 hover:border-black hover:border-2 hover:text-slate-100"
            onClick={handleSubmitBtn}
          >
            {show.btnText}
          </button>
        </form>
        {show.popUp && (
          <div className=" bg-white flex flex-col gap-5  justify-center z-40 absolute  top-8 right-8 left-6 px-1 py-4 shadow-md shadow-gray-600">
            <p className="text-xs text-center">
              PIN has been Successfuly changed
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
