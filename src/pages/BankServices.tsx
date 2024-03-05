import { useContext } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { EmptyPage } from "./EmptyPage";
import { BgContext, MorePageContext } from "../MyContext";
import type { displaySectionType } from "./Home";



interface servicesType {
    setShowServices: React.Dispatch<React.SetStateAction<boolean>>;
    setDisplaysection : React.Dispatch<React.SetStateAction<displaySectionType>>;
}

export const BankServices = ({ setShowServices, setDisplaysection }: servicesType) => {
    const { showNoti, setShowNoti, setHideHome, } = useContext(MorePageContext);
    const { setBg } = useContext(BgContext);

    return (
        <div className=" absolute top-0 w-full bg-white h-full">
            <section>
                <MoreHeader
                    name="Bank Services"
                    onClick={() => {
                        setShowServices(false);
                    }}
                />

                <ul className="text-sm flex flex-col  mx-2 mt-2">
                    <li
                        className=" flex justify-between items-center py-4 border-b  "
                        onClick={()=> {
                          setShowServices(false);
                          if  (setHideHome) setHideHome(true) 
                          setDisplaysection((prev) => ({ ...prev, showMore: false }));
                          setBg('dark-screen-mode')
                        }}
                    >
                        Home
                    </li>
                    <li 
                        className=" flex justify-between items-center py-4 border-b  "
                        onClick={() => {
                            setShowServices(false);
                            if (setHideHome) setHideHome(false);
                            setBg("light-screen-mode");
                            setDisplaysection((prev) => ({
                              ...prev,
                              showTransferPage: true, showMore: false
                            }));
                          }}
                    >
                        Send Money
                    </li>
                    <li 
                        className=" flex justify-between items-center py-4 border-b  "
                        onClick={()=> {
                            setShowServices(false);
                            if (setHideHome) setHideHome(false);
                            setBg("light-screen-mode");
                            setDisplaysection((prev) => ({
                                ...prev,
                                showMobilePage: true, showMore: false
                            }));
                        }}
                    >
                        Mobile Top-up
                    </li>
                    
                    <li 
                        className=" flex justify-between items-center py-4 border-b  "
                        onClick={() => {
                            setShowServices(false);
                            if (setHideHome) {
                              setHideHome(false);
                            }
                            setBg("light-screen-mode");
                            setDisplaysection((prev) => ({
                              ...prev,
                              showHistoryPage: true, showMore: false
                            }));
                          }}    
                    >
                        Transaction History
                    </li>
                </ul>
            </section>

            {showNoti && (
                <EmptyPage
                    pageName="Notification"
                    article="There Are No Notification"
                    onClick={() => {
                        if (setShowNoti) {
                            setShowNoti(false);
                        }
                    }}
                />
            )}
        </div>
    );
};
