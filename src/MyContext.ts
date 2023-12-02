import { Dispatch, SetStateAction, createContext } from "react";

interface bgType {
    bg?: string
    setBg: Dispatch<SetStateAction<string>>
    
};
interface morePageType {
    showMorePage? : boolean
    setShowMorePage? : Dispatch<SetStateAction<boolean>>
    showContact?: boolean;
    setShowContact?: Dispatch<SetStateAction<boolean>>;
    showNews?: boolean;
    setShowNews?: Dispatch<SetStateAction<boolean>>;
    showInbox?: boolean;
    setShowInbox?: Dispatch<SetStateAction<boolean>>;
    showFaq?: boolean;
    setShowFaq?: Dispatch<SetStateAction<boolean>>;
    showAbout?: boolean;
    setShowAbout?: Dispatch<SetStateAction<boolean>>;
    showNoti? : boolean;
    setShowNoti? : Dispatch<SetStateAction<boolean>>;
}




export const BgContext = createContext<bgType>({} as bgType);
export const MorePageContext = createContext<morePageType>({})