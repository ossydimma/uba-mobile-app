import { useContext } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { BgContext, MorePageContext } from "../MyContext";
import type { displaySectionType } from "./Home";
import type { showType } from "./MoreFeatures"



interface servicesType {
    setShow: React.Dispatch<React.SetStateAction<showType>>;
    setDisplaysection: React.Dispatch<React.SetStateAction<displaySectionType>>;
}

export const BankServices = ({ setShow, setDisplaysection }: servicesType) => {
    const { setHideHome } = useContext(MorePageContext);
    const { setBg } = useContext(BgContext);

    return (
        <div className=" absolute top-0 w-full bg-white h-full">
            <MoreHeader
                name="Bank Services"
                onClick={() => {
                    setShow((prev) => ({ ...prev, services: false }));
                }}
            />

            <ul className="text-lg sm:text-sm flex flex-col  mx-2 mt-2">
                <li
                    className=" flex justify-between items-center py-4 border-b  "
                    onClick={() => {
                        setShow((prev) => ({ ...prev, services: false }));
                        if (setHideHome) setHideHome(true)
                        setDisplaysection((prev) => ({ ...prev, showMore: false }));
                        setBg('dark-screen-mode')
                    }}
                >
                    Home
                </li>
                <li
                    className=" flex justify-between items-center py-4 border-b  "
                    onClick={() => {
                        setShow((prev) => ({ ...prev, services: false }));
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
                    onClick={() => {
                        setShow((prev) => ({ ...prev, services: false }));
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
                        setShow((prev) => ({ ...prev, services: false }));
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
        </div>
    );
};
