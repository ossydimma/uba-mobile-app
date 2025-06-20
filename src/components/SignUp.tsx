import { useContext, useState } from "react";
import { BgContext, MorePageContext } from "../MyContext";
import { PopUP } from "./PopUP";
import successImg from "../assests/leo_uba_thubs_up.png";
import { api } from "../axios"
interface MyComponentProps {
  setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

// interface userData{
//   fullname : string,
//   password : string,
//   pin : string,
//   contact : string
// }



export  const SignUp = ({ setShowSignIn }: MyComponentProps) => {
  const userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  
  // Contexts
  const { setBg } = useContext(BgContext);
  const { setShowSignUp } = useContext(MorePageContext);

  // states
  const [showName, setshowName] = useState<boolean>(true);
  const [showPassPage, setshowPassPage] = useState<boolean>(false);
  const [showPinPage, setshowPinPage] = useState<boolean>(false);

  const [showFeedBack1, setshowFeedBack1] = useState<string>("");
  const [showFeedBack2, setshowFeedBack2] = useState<string>("");

  const [inputValue1, setInputValue1] = useState<string>("");
  const [inputValue2, setInputValue2] = useState<string>("");

  const [showPopUP, setShowPopUP] = useState<boolean>(false);

  // const [data, setData] = useState<userData>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const [msg, setMsg] = useState<string>("");



  // local functions
  function handleNextBtn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const isNumber = (value: string) => {
      return !isNaN(Number(value));
    };

    inputValue1 === ""
      ? setshowFeedBack1("Field must be filled")
      : inputValue1.length < 5
      ? setshowFeedBack1("Field must be more than 5 characters ")
      : setshowFeedBack1("");

    !isNumber(inputValue2)
      ? setshowFeedBack2("Field must be a Number")
      : inputValue2.length < 11
      ? setshowFeedBack2("Enter a valid Number")
      : setshowFeedBack2("");

    if (
      (inputValue1 !== "" || inputValue1.length > 5) &&
      isNumber(inputValue2) &&
      inputValue2.length >= 11
    ) {
      setshowName(false);
      setshowPassPage(true);
      userData.fullName = inputValue1;
      userData.contact = inputValue2;
      localStorage.setItem("userInfo", JSON.stringify(userData));
    }
  }
  function  handleNext2Btn  (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setshowFeedBack1("");
    setshowFeedBack2("");

    const validatePassword = (password: string) => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
        password
      );
    };

    inputValue1 === ""
      ? setshowFeedBack1("Field must be filled")
      : !/(?=.*[A-Z])/.test(inputValue1)
      ? setshowFeedBack1("password must be contain at least one Captial letter")
      : !/(?=.*[0-9])/.test(inputValue1)
      ? setshowFeedBack1("password must be contain a number")
      : !/(?=.*[!@#$%^&*])/.test(inputValue1)
      ? setshowFeedBack1("password must be contain a special symbol _,@,- ")
      : !/(?=.{8,})/.test(inputValue1)
      ? setshowFeedBack1("password must be more than 8 characters")
      : setshowFeedBack1("");

    inputValue2 === ""
      ? setshowFeedBack2("Field must be filled")
      : inputValue2 !== inputValue1
      ? setshowFeedBack2("Both passwords did not match")
      : setshowFeedBack2("");

    if (
      inputValue1 !== "" &&
      validatePassword(inputValue1) &&
      inputValue1 === inputValue2 &&
      validatePassword(inputValue2)
    ) {
      setshowPassPage(false);
      setshowPinPage(true);
      userData.password = inputValue1;
      localStorage.setItem("userInfo", JSON.stringify(userData));
    }
  }

  async function handleActivationBtn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setshowFeedBack1("");
    setshowFeedBack2("");

    inputValue1 === ""
      ? setshowFeedBack1("Field must be filled")
      : !/^[0-9]+$/.test(inputValue1)
      ? setshowFeedBack1("PIN should contain only numbers")
      : inputValue1.length !== 4
      ? setshowFeedBack1("PIN shouldn't be less or greater than 4")
      : setshowFeedBack1("");

    inputValue2 === ""
      ? setshowFeedBack2("Field must be filled")
      : inputValue1 !== inputValue2
      ? setshowFeedBack2("Both PIN did not match")
      : setshowFeedBack2("");

    if (
      inputValue1 !== "" &&
      /^[0-9]+$/.test(inputValue1) &&
      inputValue1.length === 4 &&
      inputValue1 === inputValue2 &&
      /^[0-9]+$/.test(inputValue2) &&
      inputValue1.length === 4
    ) {
      userData.pin = inputValue1;

      try {
        await api.post("/Sign-in", userData)
        localStorage.setItem("userInfo", JSON.stringify(userData));
        setIsSuccess(true);
      } catch (error : any) {
        setIsSuccess(false);
        error.response.data ? setMsg(error.response.data) : setMsg("Failed to Sign up, try again");
        console.error('Error:', error)
      } finally {  
        setShowPopUP(true);
      }
      
    }
  }

  function handleChangeInput1(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue1(e.target.value);
  }
  function handleChangeInput2(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue2(e.target.value);
  }

  return (
    <>
      <section className=" text-white w-full h-screen top-0 absolute left-0 showMorePage bg-red-700 flex  flex-col pt-2 px-6 ">
        <div className=" mb-6">
          {showName ? (
            <i
              className="fa-solid fa-xmark cursor-pointer text-2xl flex justify-end mb-8 text-black"
              onClick={() => {
                if (setShowSignUp !== undefined) {
                  setBg("phone-deafult-screen");
                  setShowSignUp(false);
                }
              }}
            ></i>
          ) : showPassPage ? (
            <i
              className="fa-solid fa-arrow-left cursor-pointer  text-xl mb-8 "
              onClick={() => {
                setshowPassPage(false);
                setshowName(true);
              }}
            ></i>
          ) : (
            <i
              className="fa-solid fa-arrow-left cursor-pointer pt-3  text-xl mb-8 "
              onClick={() => {
                setshowPinPage(false);
                setshowPassPage(true);
              }}
            ></i>
          )}
          <h1 className="font-bold text-black text-center  text-4xl sm:text-2xl mb-2">Sign Up</h1>
        </div>
        {showName && (
          <form className="flex flex-col mt-5 sm:mt-0 ml-4 sm:ml-0 gap-5 text-xl">
            <label htmlFor="name">
              Full Name
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Full Name"
                onChange={handleChangeInput1}
                value={inputValue1}
                className="bg-transparent border-2 border-white rounded py-6 sm:py-2 px-12 sm:px-6 text-lg sm:text-xs  outline-none focus-within:bg-white focus-within:text-black"
              />
              <p className="text-red-500 text-lg sm:text-xs mt-1 ">{showFeedBack1}</p>
            </label>
            <label htmlFor="number">
              Number
              <input
                type="text"
                name="number"
                id="number"
                placeholder="Enter Your Number"
                onChange={handleChangeInput2}
                value={inputValue2}
                className="bg-transparent border-2 border-white rounded py-6 sm:py-2 px-12 sm:px-6 text-lg sm:text-xs outline-none focus-within:bg-white focus-within:text-black"
              />
              <p className="text-red-500 text-lg sm:text-xs mt-1 ">{showFeedBack2}</p>
            </label>
            <button
              onClick={handleNextBtn}
              className="mx-auto rounded-md text-2xl sm:text-xl py-5 sm:py-3 bg-white text-black mt-4 border-white border-2 hover:bg-gray-200 hover:scale-90 hover:border-black hover:border-2 w-44 sm:w-32"
            >
              NEXT
            </button>
          </form>
        )}

        {showPassPage && (
          <form className="flex flex-col mt-5 sm:mt-0 ml-4 sm:ml-0 gap-5 text-xl">
            <label htmlFor="text">
              Password
              <input
                type="text"
                name="text"
                id="text"
                placeholder="Enter Your Password"
                onChange={handleChangeInput1}
                className="bg-transparent border-2 border-white rounded py-6 sm:py-2 px-12 sm:px-6 text-lg sm:text-xs outline-none focus-within:bg-white focus-within:text-black"
              />
              <p className="text-red-500 text-lg sm:text-xs mt-1 ">{showFeedBack1}</p>
            </label>
            <label htmlFor="number">
              Confirm Password
              <input
                type="text"
                name="number"
                id="number"
                placeholder="Confirm Password"
                onChange={handleChangeInput2}
                className="bg-transparent border-2 border-white rounded py-6 sm:py-2 px-12 sm:px-6 text-lg sm:text-xs outline-none focus-within:bg-white focus-within:text-black"
              />
              <p className="text-red-500 text-lg sm:text-xs mt-1 ">{showFeedBack2}</p>
            </label>
            <button
              onClick={handleNext2Btn}
              className="mx-auto rounded-md text-2xl sm:text-xl py-5 sm:py-3 bg-white text-black mt-4 border-white border-2 hover:bg-gray-200 hover:scale-90 hover:border-black hover:border-2 w-44 sm:w-32"
            >
              NEXT
            </button>
          </form>
        )}
        {showPinPage && (
          <form className="flex flex-col mt-5 sm:mt-0 ml-4 sm:ml-0 gap-5 text-xl">
            <label htmlFor="text">
              PIN
              <input
                type="text"
                name="text"
                id="text"
                placeholder="Enter PIN"
                onChange={handleChangeInput1}
                className="bg-transparent border-2 border-white rounded py-6 sm:py-2 px-12 sm:px-6 text-lg sm:text-xs outline-none focus-within:bg-white focus-within:text-black"
              />
              <p className="text-red-500 ttext-lg sm:text-xs mt-1 ">{showFeedBack1}</p>
            </label>
            <label htmlFor="number">
              Confirm PIN
              <input
                type="text"
                name="number"
                id="number"
                placeholder="Re-Type PIN"
                onChange={handleChangeInput2}
                className="bg-transparent border-2 border-white rounded py-6 sm:py-2 px-12 sm:px-6 text-lg sm:text-xs outline-none focus-within:bg-white focus-within:text-black"
              />
              <p className="text-red-500 ttext-lg sm:text-xs mt-1 ">{showFeedBack2}</p>
            </label>
            <button
              onClick={handleActivationBtn}
              className=" rounded-md py-5 sm:py-3 text-2xl sm:text-xl bg-white text-black mt-6 border-white border-2 hover:bg-gray-200 hover:scale-90 hover:border-black hover:border-2"
            >
              ACTIVATE
            </button>
          </form>
        )}
      </section>
      {showPopUP && (
        <PopUP
          msg={isSuccess ?  "You have successfully signed up with us. Click OK to log in" : msg}
          onClick={() => { 
            if (isSuccess) {
              if (setShowSignUp) {
                setShowSignUp(false);
                setBg("phone-deafult-screen");
                setShowSignIn(true);
              }
            } else {
              setShowPopUP(false);
            }
            
            
          }}
          icon={
            isSuccess ?
            (<div className="successImg">
              <img src={successImg} alt="thumb up" />
            </div>) : 
             <i className="fa-solid fa-xmark bg-red-600 py-3 px-5 rounded-full text-white text-2xl"></i>
          }
          className=" text-sm pb-[85px] text-black"
          title={isSuccess ? "Success" : "Failed"}
        />
      )}
    </>
  );
};
