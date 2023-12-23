
import type {displaySectionType, stylesType} from "../pages/Home"

export interface childPropType {
    icon : React.ReactNode;
    title : string;
    msg : String | React.ReactNode;
    setDisplaysection : React.Dispatch<React.SetStateAction<displaySectionType>>;
    setStyles : React.Dispatch<React.SetStateAction<stylesType>>;
  }

export const PopUP = ( {msg, icon, title, setStyles, setDisplaysection}:childPropType ) => {
    function handleExit( ) {
        setDisplaysection((prev) => ({...prev, showError: false, showSucess : false}))
        setStyles((prev) =>({...prev, addHeight :'h-auto'}))
        setStyles((prev) =>({...prev, addOpacity :''}))
      }
  return (
    <div className=" z-10 absolute top-[330px] left-4 w-52 h-auto pt-4 pb-10 bg-white rounded-2xl mx-auto px-4 drop-shadow-xl">
        <i className="fa-solid fa-xmark cursor-pointer flex justify-end  pb-6" onClick={handleExit}></i>
        <main className="flex flex-col gap-5 justify-center items-center">
            <div>{icon}</div>
            <p>{title}</p>
            <p className=" text-xs">{msg}.</p>
            <button 
              className="bg-red-600 py-2 text-sm text-white  w-44 rounded-[4px]"
              onClick={handleExit}
              >OK</button>
        </main>
    </div>
  )
}
