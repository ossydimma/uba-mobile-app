import { useContext, useState } from 'react'
import { MoreHeader } from '../components/MoreHeader';
import { BgContext, MorePageContext, UserInfo } from '../MyContext';
import type { homeDisplaytype } from './LifeStyle';
import { EmptyPage } from './EmptyPage';
import { Beneficiary } from './Beneficiary';

interface addActiveType {
    item1 : string
    item1Sub : string
    item2 : string
    item2Sub : string
}
export interface transferType {
  addNew : boolean;
}


export const Transfer = ({ setDisplaysection }: homeDisplaytype) => {
    // contexts
  const { setBg } = useContext(BgContext);
  const user = useContext(UserInfo);
  const { setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);

//   States 

    const [addActive, setAddActive] = useState<addActiveType>({
        item1 : 'bg-red-100',
        item1Sub : 'bg-white',
        item2 : 'bg-white',
        item2Sub : 'bg-red-100',

    })
    const [display, setDisplay] = useState<transferType>({
      addNew : false,
  })
    function handleActive(item : string) {
        switch (item) {
            case "uba":
                setAddActive({item1 : "bg-red-100", item1Sub : 'bg-white', item2 : "", item2Sub : "bg-red-100"})
                break;
            case "other":
                setAddActive({item1 : "", item1Sub : 'bg-red-100', item2 : "bg-red-100", item2Sub : "bg-white"})
                break;
        
            default:
                break;
        }
    }
  return (
    <div  className=" text-black w-full h-screen top-0 absolute left-0 showMorePage bg-white">
        <div>
        <MoreHeader
          name="Send Money"
          onClick={() => {
            if (setHideHome !== undefined) {
              setDisplaysection((prev) => ({
                ...prev,
                showTransferPage: false,
              }));
              setHideHome(true);
              setBg("dark-screen-mode");
            }
          }}
        />
        <p className='  py-2.5 text-sm text-center shadow-md shadow-gray-400'>Select Tranfer Option</p>
        <section className=' mx-4 mt-3 flex justify-between'>
            <div 
                className={` w-[102px] h-[85px] ${addActive.item1} rounded-lg border border-red-600 cursor-pointer`}
                onClick={()=>handleActive('uba')}
                > 
                <div className={`ml-2 mr-[70px] mt-2 ${addActive.item1Sub}  py-1 px-1.5 rounded-full`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 40 48" fill="none">
                        <path d="M0 47.8813L8.14387 8.97778C8.14387 8.97778 22.8028 33.6666 21.717 40.7739C20.6311 47.8813 7.05802 48.3177 0 47.8813Z" fill="red"/>
                        <path d="M39.1481 0.118729L31.0042 39.0223C31.0042 39.0223 16.3452 14.3335 17.4311 7.22611C18.5169 0.118731 32.09 -0.317687 39.1481 0.118729Z" fill="red"/>
                    </svg>
                </div>
                <p className=' text-[11px] text-center mt-4'>UBA Accounts</p>
            </div>
            <div 
                className={`w-[102px] h-[85px]  rounded-lg border ${addActive.item2} border-red-600 cursor-pointer`}
                onClick={()=>handleActive('other')}
                > 
                <i className={`fa-solid fa-house cursor-pointer text-red-600 text-[10px] ml-2 mt-2 ${addActive.item2Sub}  py-1.5 px-1.5 rounded-full`}></i>
                <p className=' text-[11px] text-center mt-5 '>Other Banks</p>
            </div>
        </section>
        <section className=" w-[93%] h-auto mt-3 mx-2 pb-1 border border-gray-300 rounded-2xl overflow-hidden">
            <p className="text-sm pl-3 font-semibold  bg-gray-100 py-2 ">
              Transfer From:
            </p>
            <div className=" py-2">
              <p className="text-xs text-center font-semibold ">{user.fullName}</p>
              <p className="text-[10px] text-center ">
                {user.accountType}: <span className="">{user.accountNo}</span>
              </p>

            </div>
        </section>
        <section className=" w-[93%] h-auto mt-3 mx-2  border border-gray-300 rounded-2xl overflow-hidden">
            <p className="text-sm pl-3 font-semibold  bg-gray-100 py-2 ">
              Transfer To:
            </p>
            <div className=" py-2">
              <input type="text" 
                className=' border border-gray-300 outline-none w-52 ml-3 rounded px-2 mb-1 text-[12px] py-1' 
                placeholder='Account Number'
                />
              <p 
                className=' text-right text-[10px] text-red-600 mr-2 cursor-pointer'
                onClick={()=> {
                  setDisplay((prev)=> ({...prev, addNew : true}))
                }}
                >Choose Beneficiary</p>
            </div>
        </section>
        <button
                className="bg-red-600 py-2 mt-3 text-sm text-white ml-4 w-[220px] rounded-[4px]"
                // onClick={}
              >
                Confirm Receiver
              </button>
        </div>

        {showNoti && (
        <EmptyPage
          pageName="Notification"
          article="There Are No Notification"
          onClick={() => {
            if (setShowNoti !== undefined) {
              setShowNoti(false);
            }
          }}
        />
      )}
      {display.addNew && <Beneficiary setDisplay={setDisplay} />}
    </div>
  )
}
