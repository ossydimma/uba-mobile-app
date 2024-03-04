import {useRef} from "react";
import { transferType} from "../pages/Transfer";

interface AuthPinType {
  setDisplay: React.Dispatch<React.SetStateAction<transferType>>;
  enteredPin : string;
  setEnteredPin : React.Dispatch<React.SetStateAction<string>>;
  handleCancel : () => void;
}

export const AuthPin = ({ setDisplay,  enteredPin, setEnteredPin, handleCancel }: AuthPinType) => {
  const userData = JSON.parse(localStorage.getItem("userInfo") || "{}");

  //  ref
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);
  const input4Ref = useRef<HTMLInputElement>(null);

  // states


  // functions
  function handleInputs(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target;

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
          setEnteredPin(enteredPin + input3Ref.current?.value);
          input4Ref.current?.focus();

          break;
        case input4Ref.current:
          setEnteredPin(enteredPin + input4Ref.current?.value);
          break;
        default:
          break;
      }
    }
    if (input.value === "") {
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

  return (
    <div>
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
    </div>
  );
};
