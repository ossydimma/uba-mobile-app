
import type {displaySectionType, stylesType} from "../pages/Home"

export interface childPropType {
    icon : React.ReactNode;
    title : string;
    className : string;
    msg : String | React.ReactNode;
    onClick : () => void;
    
  }

export const PopUP = ( {msg, icon, title, onClick, className}:childPropType ) => {
    
  return (
    <div className={`${className} z-10  w-52 h-auto pt-4 pb-10 bg-white rounded-2xl mx-auto px-4 drop-shadow-xl`}>
        <i className="fa-solid fa-xmark cursor-pointer flex justify-end  pb-6" onClick={onClick}></i>
        <main className="flex flex-col gap-5 justify-center items-center">
            <div>{icon}</div>
            <p>{title}</p>
            <p className=" text-xs">{msg}.</p>
            <button 
              className="bg-red-600 py-2 text-sm text-white  w-44 rounded-[4px]"
              onClick={onClick}
              >OK</button>
        </main>
    </div>
  )
}
