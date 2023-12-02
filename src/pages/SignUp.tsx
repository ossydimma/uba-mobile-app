import { log } from "console"
import { useState } from "react"


export const SignUp = () => {
    const [showSignUp, setshowSignUp] = useState(true)
    const [emailValue, setEmailValue] = useState<string | undefined>(undefined)
    const [numberValue, setNumberValue] = useState<string | undefined>(undefined)
    const [passwordValue, setPasswordValue] = useState<string | undefined>(undefined)
    const [comfirmValue, setComfirmValue] = useState<string | undefined>(undefined)
    function handleNextBtn() {
        // if (emailValue === undefined || " ") {
        //     alert("input must be filled")
        // if (numberValue === undefined || " ") {
        //     alert("both input must be filled")
        // }
        // }else {
        //     setshowSignUp(false)
        // }

        if (numberValue !== undefined) {
            setshowSignUp(false)
        }else {
            alert("input must be filled")
        }
    }
    function handleActivationBtn() {
        if ((passwordValue === undefined || "") && (comfirmValue === undefined || "")) {
            alert("input must be filled")
        }else {
            alert('DOne')
        }
    }
  return (
    <>
        <section className=" text-white w-full h-screen top-0 absolute left-0 showMorePage bg-red-700 flex  flex-col pt-16 px-6 ">
            <div className="flex justify-between mb-6">
                <h1 className="font-bold text-black">Sign Up</h1>
                <i
                    className="fa-solid fa-xmark cursor-pointer text-black"
                    // onClick={handleHideCountries}
                  ></i>
            </div>
        {showSignUp && <form className="flex flex-col gap-5" >
            <label htmlFor="email">Email
                <input type="email" name="email" id="email" placeholder="Enter Your Email" value={emailValue} className="bg-transparent border-2 border-white rounded py-2 px-6 text-xs  outline-none focus-within:bg-white focus-within:text-black" />
            </label>
            <label htmlFor="number">Number
                <input type="text" name="number" id="number" placeholder="Enter Your Number" value={numberValue}  className="bg-transparent border-2 border-white rounded py-2 px-6 text-xs outline-none focus-within:bg-white focus-within:text-black"/>
            </label>
            <button onClick={handleNextBtn} className=" rounded-md py-3 bg-white text-black mt-6 border-white border-2 hover:bg-gray-200 hover:scale-90 hover:border-black hover:border-2">NEXT</button>
        </form>}

           { !showSignUp && <form className="flex flex-col gap-5" >
                <label htmlFor="text">Password
                    <input type="text" name="text" id="text" placeholder="Enter Your Password"  className="bg-transparent border-2 border-white rounded py-2 px-6 text-xs  outline-none focus-within:bg-white focus-within:text-black"/>
                </label>
                <label htmlFor="number">Confirm Password
                    <input type="text" name="number" id="number" placeholder="Confirm Password"  className="bg-transparent border-2 border-white rounded py-2 px-6 text-xs outline-none focus-within:bg-white focus-within:text-black"/>
                </label>
                <button onClick={handleActivationBtn} className=" rounded-md py-3 bg-white text-black mt-6 border-white border-2 hover:bg-gray-200 hover:scale-90 hover:border-black hover:border-2">ACTIVATE</button>
            </form>}
        </section>
    </>
  )
}
