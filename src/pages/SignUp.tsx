import { log } from "console"
import { useState } from "react"

export const SignUp = () => {
    const [showSignUp, setshowSignUp] = useState(true)
    const [showFeedBack1, setshowFeedBack1] = useState('')
    const [showFeedBack2, setshowFeedBack2] = useState('')
    const [showFeedBack3, setshowFeedBack3] = useState('')
    const [showFeedBack4, setshowFeedBack4] = useState('')

    const [inputValue1, setInputValue1] = useState<string>('')
    const [inputValue2, setInputValue2] = useState<string>('')
    const [inputValue3, setInputValue3] = useState<string>('')
    const [inputValue4, setInputValue4] = useState<string>('')

    const isString = (value: string) => {
        return typeof value === "string";
      }
    const isNumber = (value: string) => {
        return !isNaN(Number(value));
    }
    function handleNextBtn(e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        inputValue1 === "" ? setshowFeedBack1("Field must be filled"):  inputValue1.length < 5 ?  setshowFeedBack1('Field must be more than 5 characters ') : setshowFeedBack1('')
        !isNumber(inputValue2) ? setshowFeedBack2("Field must be a Number"):  inputValue2.length < 11 ?  setshowFeedBack2('Enter a valid Number') : setshowFeedBack2('')

        
        if ((inputValue1 !== ''  || inputValue1.length > 5) && (isNumber(inputValue2) && inputValue2.length >= 11) ) setshowSignUp(false)   
       
    }
   
    function handleChangeInput1(e:React.ChangeEvent<HTMLInputElement>){
       setInputValue1( e.target.value) 
    }
    function handleChangeInput2(e:React.ChangeEvent<HTMLInputElement>){
       setInputValue2(e.target.value) 
    }
    function handleActivationBtn(e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        inputValue3 === "" ? setshowFeedBack3("Field must be filled"):  inputValue3.length < 8 ?  setshowFeedBack3('Enter a strong password '): !isNumber(inputValue3) ? setshowFeedBack3('Password must contain both letters and number'): !isString(inputValue3) ? setshowFeedBack3('Password must contain both letters and number'): setshowFeedBack3('')
        inputValue4 === "" ? setshowFeedBack4("Field must be filled"): inputValue4 !== inputValue3 ? setshowFeedBack4("Both passwords did not match"): setshowFeedBack4('')
    }

    function handleChangeInput3(e:React.ChangeEvent<HTMLInputElement>){
        setInputValue3( e.target.value) 
     }
     function handleChangeInput4(e:React.ChangeEvent<HTMLInputElement>){
        setInputValue4(e.target.value) 
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
            <label htmlFor="name">Full Name
                <input type="text" name="name" id="name" placeholder="Enter Your Full Name" onChange={handleChangeInput1} value={inputValue1} className="bg-transparent border-2 border-white rounded py-2 px-6 text-xs  outline-none focus-within:bg-white focus-within:text-black" />
                <p className="text-red-500 text-xs mt-1 ">{showFeedBack1}</p>
            </label>
            <label htmlFor="number">Number
                <input type="text" name="number" id="number" placeholder="Enter Your Number" onChange={handleChangeInput2} value={inputValue2}  className="bg-transparent border-2 border-white rounded py-2 px-6 text-xs outline-none focus-within:bg-white focus-within:text-black"/>
                <p className="text-red-500 text-xs mt-1 ">{showFeedBack2}</p>
            </label>
            <button onClick={handleNextBtn } className="mx-auto rounded-md py-3 bg-white text-black mt-4 border-white border-2 hover:bg-gray-200 hover:scale-90 hover:border-black hover:border-2 w-32">NEXT</button>
        </form>}

           { !showSignUp && <form className="flex flex-col gap-5" >
                <label htmlFor="text">Password
                    <input type="text" name="text" id="text" placeholder="Enter Your Password" onChange={handleChangeInput3} className="bg-transparent border-2 border-white rounded py-2 px-6 text-xs  outline-none focus-within:bg-white focus-within:text-black"/>
                    <p className="text-red-500 text-xs mt-1 ">{showFeedBack3}</p>
                </label>
                <label htmlFor="number">Confirm Password
                    <input type="text" name="number" id="number" placeholder="Confirm Password" onChange={handleChangeInput4} className="bg-transparent border-2 border-white rounded py-2 px-6 text-xs outline-none focus-within:bg-white focus-within:text-black"/>
                    <p className="text-red-500 text-xs mt-1 ">{showFeedBack4}</p>
                </label>
                <button onClick={handleActivationBtn} className=" rounded-md py-3 bg-white text-black mt-6 border-white border-2 hover:bg-gray-200 hover:scale-90 hover:border-black hover:border-2">ACTIVATE</button>
            </form>}
        </section>
    </>
  )
}
