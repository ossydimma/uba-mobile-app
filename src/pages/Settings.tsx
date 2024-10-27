import { useState } from "react";
import { ForgottenPin } from "./ForgottenPin";
import { MoreHeader } from "../components/MoreHeader";
import type { displaySectionType } from "./Home";
import type {showType} from "./MoreFeatures"
import { ChangePin } from "./ChangePin";
import { ChangePwrd } from "./ChangePwrd";



interface settingsType {
    setShow: React.Dispatch<React.SetStateAction<showType>>;
    setDisplaysection : React.Dispatch<React.SetStateAction<displaySectionType>>;
}
export interface displayType {
    forgotPin : boolean;
    changePwrd : boolean;
    changePin : boolean;
}




export const Settings = ({ setShow, setDisplaysection }: settingsType) => {
    const [display, setDisplay] = useState<displayType>({
        forgotPin : false,
        changePwrd : false,
        changePin : false,
    })
  return (
    <div className=" absolute top-0 w-full bg-white h-full">
        <section>
            <MoreHeader
                name="Settings"
                onClick={() => {
                    setShow((prev)=> ({...prev, settings : false}));
                }}
            />
            <ul className="text-lg sm:text-sm flex flex-col  mx-2 mt-2">
                <li
                    className=" flex justify-between items-center py-4 border-b  "
                    onClick={() => {
                        setDisplay((prev)=> ({...prev, changePwrd : true}))
                    }}
                >
                   Change password
                </li>
                <li
                    className=" flex justify-between items-center py-4 border-b  "
                    onClick={() => {
                        setDisplay((prev)=> ({...prev, forgotPin : true}))
                    }}
                >
                   Forgot PIN
                </li>
                <li
                    className=" flex justify-between items-center py-4 border-b  "
                    onClick={() => {
                       setDisplay((prev)=> ({...prev, changePin : true}))
                    }}
                >
                   Change PIN 
                </li>
            </ul>
        </section>
        {display.changePwrd && <ChangePwrd setDisplay={setDisplay}/>}
        {display.forgotPin && <ForgottenPin setDisplay={setDisplay}/>}
        {display.changePin && <ChangePin setDisplay={setDisplay} />}
    </div>
  )
}
