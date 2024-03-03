import React, {  useRef } from 'react';
import { Swiper} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';



interface sliderType {
    children : React.ReactNode;
    className : string
}

export const Slider = ({children, className}: sliderType) => {
    
    const navPrevRef = useRef<HTMLDivElement | null>(null);
    const navNextRef = useRef<HTMLDivElement | null>(null);

    
  

    
  return (
    <div className= {`${className} relative  text-xs cursor-pointer`}>
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
