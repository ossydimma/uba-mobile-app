import React, {  useRef } from 'react';
import SwiperCore from 'swiper';
import { Swiper,useSwiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';



interface sliderType {
    children : React.ReactNode;
}

export const Slider = ({children}: sliderType) => {
    
    const navPrevRef = useRef<HTMLDivElement | null>(null);
    const navNextRef = useRef<HTMLDivElement | null>(null);

    
  

    
  return (
    <div className=" w-44 relative mt-5 text-xs cursor-pointer">
        <Swiper 
            className=' text-center  ' 
            loop = {true}
            modules={[Navigation]}
            navigation={{
                prevEl: navPrevRef.current,
                nextEl: navNextRef.current,
              }}
        >
            {children}

            <div className="swiper-button-prev   " ref={navPrevRef} />
        
            <div className="swiper-button-next pl-10" ref={navNextRef} />
            
           
                
            
        </Swiper>
    </div>
  )
}
