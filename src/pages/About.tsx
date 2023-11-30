import React from 'react'
import { MoreHeader } from '../components/MoreHeader'
import logo from "../assests/UBA-logo.webp"

export const About = () => {
  return (
    <>
        <div className="bg-white text-black w-full h-screen top-0 absolute left-0 showMorePage">
            <MoreHeader name="About"/>
            <main className='flex flex-col gap-24 items-center '>
                <div className='text-center'>
                    <img src={logo} alt="logo svg" className=' h-32 ml-7'/>
                    <h2 className='text-2xl'>Mobile Banking</h2>
                    <p className='text-sm'>version 8.0.39</p>
                </div>
                <div>
                    <h4 className='font-semibold'>United Bank For Africa Plc</h4>
                    <div className='text-center text-xs'>
                        <p>2023</p>
                        <p>@ All right reserved</p>
                        <p>www.ubagroup.com</p>
                    </div>
                </div>
            </main>
        </div>
    </>
  )
}
