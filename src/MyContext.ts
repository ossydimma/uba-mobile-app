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
    showSignUp?: boolean;
    setShowSignUp? : Dispatch<SetStateAction<boolean>>;
    showSignUpHomePage? : boolean;
    setShowSignUpHomePage?: Dispatch<SetStateAction<boolean>>;
    showForgottenPage? : boolean;
    setShowForgottenPage?: Dispatch<SetStateAction<boolean>>;
    showHome? : boolean;
    setShowHome? :  Dispatch<SetStateAction<boolean>>;
    hideHome? : boolean;
    setHideHome? : Dispatch<SetStateAction<boolean>>;
    showNairaSec?: boolean;
    setShowNairaSec? : Dispatch<SetStateAction<boolean>>;
}
interface userInfoType {
    fullName : string | undefined;
    contact : string | undefined;
    balance : string;
    password : string;
    accountNo : string;
    accountType : string;
    pin :  String
}
interface homeType {
    
}



export const BgContext = createContext<bgType>({} as bgType);
export const MorePageContext = createContext<morePageType>({});
export const UserInfo = createContext<userInfoType>( {} as userInfoType);
export const HomeContext = createContext