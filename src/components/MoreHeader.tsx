import { useContext} from "react";
import { MorePageContext } from "../MyContext";
interface ProductProps {
  name: string;
  onClick: () => void;
}

export const MoreHeader = ({ name, onClick }: ProductProps) => {
  const { showNoti, setShowNoti } = useContext(MorePageContext);

  function handleNotiPage(): void {
    if (setShowNoti !== undefined) {
      setShowNoti(true);
    }
  }

  return (
    <div>
      <div className=" flex justify-between items-center py-3 sm:pb-2 sm:pt-0 px-3  shadow-md shadow-gray-400 ">
        <div className="flex gap-7 items-center">
          <i
            className="fa-solid fa-arrow-left cursor-pointer"
            onClick={onClick}
          ></i>
          <h2 className="font-semibold  sm:text-sm text-xl">{name}</h2>
        </div>
        {!showNoti && (
          <div>
            <i
              className="fa-regular fa-bell text-gray-400 text-2xl sm:text-xl cursor-pointer"
              onClick={handleNotiPage}
            ></i>
          </div>
        )}
      </div>
    </div>
  );
};
