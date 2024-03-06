import { useState } from "react";
import { ForgottenPin } from "../components/ForgottenPin";
import { MoreHeader } from "../components/MoreHeader";
import type { displaySectionType } from "./Home";
import type {showType} from "./MoreFeatures"



interface settingsType {
    setShow: React.Dispatch<React.SetStateAction<showType>>;
    setDisplaysection : React.Dispatch<React.SetStateAction<displaySectionType>>;
}
export interface displayType {
    forgotPin : boolean;
    forgotPwrd : boolean;
    changePin : boolean;
}




export const Settings = ({ setShow, setDisplaysection }: settingsType) => {
    const [display, setDisplay] = useState<displayType>({
        forgotPin : false,
        forgotPwrd : false,
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
            <ul className="text-sm flex flex-col  mx-2 mt-2">
                <li
                    className=" flex justify-between items-center py-4 border-b  "
                    onClick={() => {
                        setShow((prev) => ({ ...prev, services: false }));
                        setDisplaysection((prev) => ({ ...prev, showMore: false }));
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
                       setDisplay((prev)=> ({...prev, forgotPin : true}))
                    }}
                >
                   Change PIN 
                </li>
            </ul>
        </section>
        {display.forgotPin && <ForgottenPin setDisplay={setDisplay}/>}
    </div>
  )
}
