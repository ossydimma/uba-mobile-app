import { useContext } from 'react'
import { MoreHeader } from '../components/MoreHeader'
import { EmptyPage } from './EmptyPage'
import { MorePageContext } from '../MyContext'

export const Contact = () => {
    const {showNews, setShowNews, showNoti, setShowContact,setShowNoti} = useContext(MorePageContext)
    function handleShowNews(): void {
        if (setShowNews !== undefined) {
            setShowNews(true)
            
        }
        }
  return (
    <>
        <section className="bg-white text-black w-full h-screen top-0 absolute left-0 showMorePage">
            <MoreHeader name="Contact Us"onClick={()=> {
                if (setShowContact !== undefined) {
                    setShowContact(false);
                 }
            }} />
            <ul className=' mx-3'>
                <li>
                    <a href='tel:+2347031690110' className='flex gap-5 border-b-2 border-gray-100 py-3 cursor-pointer'>
                        <i className="fa-solid fa-phone text-red-600 pt-3"></i>
                        <ul className='flex flex-col text-[1rem] sm:text-xs gap-1'>
                            <li>Call</li>
                            <li>+2344087777</li>
                            <li>+234408464748</li>
                            <li>+2344087777</li>
                        </ul>
                    </a>
                </li>
                <li>
                    <a href='mailto:chrisjerry070@gmail.com?subject=Subject Line' className='flex gap-5 border-b-2 border-gray-100 py-3 cursor-pointer'>
                        <i className="fa-regular fa-envelope text-red-600 pt-3"></i>
                        <ul className='flex flex-col text-[1rem] sm:text-xs '>
                            <li>Email</li>
                            <li>cfc@ubagroup.com</li>
      
                        </ul>
                    </a>
                </li>
                <li>
                    <article className='flex gap-5 py-4 cursor-pointer'>
                        <i className="fa-solid fa-newspaper text-red-600 "></i>
                        <p className='text-[1rem] sm:text-xs' onClick={handleShowNews}>Recent News</p>
                    </article>
                </li>
            </ul>
            <div className="medias flex gap-3 text-lg sm:text-sm justify-center mt-20 text-white ">
                <i className="fa-brands fa-twitter bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
                <i className="fa-brands fa-instagram bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
                <i className="fa-brands fa-square-youtube bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
                <i className="fa-brands fa-facebook bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
            </div>
            <p className="text-center text-lg sm:text-sm mt-3 font-black">Ubagroup</p>
        </section>
        { showNoti &&<EmptyPage pageName="Notification" article="There Are No Notification" onClick={()=> {
            if (setShowNoti !== undefined) {
                setShowNoti(false);
              }
        }}/>}
        {showNews && <EmptyPage pageName='News' article='no recent news' onClick={()=> {
            if (setShowNews !== undefined) {
                setShowNews(false);
              }
        }}/>}
    </>
  )
}
