import React, { useContext } from 'react'
import { MoreHeader } from '../components/MoreHeader';
import { BgContext, MorePageContext } from '../MyContext';
import type { homeDisplaytype } from './LifeStyle';
import { EmptyPage } from './EmptyPage';

export const History = ({ setDisplaysection }: homeDisplaytype) => {
     // contexts
  const { setBg } = useContext(BgContext);
  const { setHideHome, showNoti, setShowNoti } = useContext(MorePageContext);

  return (
    <div className=" text-black w-full h-screen top-0 absolute left-0 showMorePage bg-white">
        <div>
        <MoreHeader
          name="Transaction History"
          onClick={() => {
            if (setHideHome !== undefined) {
              setDisplaysection((prev) => ({
                ...prev,
                showHistoryPage: false,
              }));
              setHideHome(true);
              setBg("dark-screen-mode");
            }
          }}
        />
        <div className=' mt-32'>
            <p className=' text-center text-sm'>No recent Transaction</p>
        </div>
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
    </div>
  )
}
