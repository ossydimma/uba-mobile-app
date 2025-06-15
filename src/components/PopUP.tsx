
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
    <div className={`${className} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-60 sm:w-52 h-auto pt-4 pb-10 bg-white rounded-2xl mx-auto px-4 drop-shadow-xl`}>
        <i className="fa-solid fa-xmark cursor-pointer flex justify-end  pb-6 text-xl sm:text-lg" onClick={onClick}></i>
        <main className="flex flex-col gap-5 justify-center items-center">
            <div>{icon}</div>
            <p className=" text-xl sm:text-lg font-bold">{title}</p>
            <p className=" text-sm sm:text-xs">{msg}.</p>
            <button 
              className="bg-red-600 py-2 text-lg sm:text-sm text-white  w-44 rounded-[4px]"
              onClick={onClick}
              >OK</button>
        </main>
    </div>
  )
}
