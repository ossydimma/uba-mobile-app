import React from "react";

export const More = () => {
  return (
    <div>
      <section className="bg-white text-black w-full h-full top-0 absolute left-0">
        <div className="more-menu flex justify-between items-center pb-2 px-3 border-b-4 border-gray-400">
          <div className="flex gap-7 items-center">
            <i className="fa-solid fa-arrow-left cursor-pointer"></i>
            <h2 className="font-semibold">More</h2>
          </div>
          <div>
            <i className="fa-regular fa-bell text-gray-400 text-xl "></i>
          </div>
        </div>
          <ul className="text-sm flex flex-col gap-3 mx-2 mt-1">
            <li>
              <a href="/" className="more-items flex items-center justify-between pb-2 border-b-2 ">
                <p>Contact Us</p>
                <i className="fa-solid fa-angle-right"></i>
              </a>
            </li>
            <li>
              <a href="/" className="more-items flex items-center justify-between pb-2 border-b-2">
                <p>Inbox</p>
                <i className="fa-solid fa-angle-right"></i>
              </a>
            </li>
            <li>
              <a href="/" className="more-items flex items-center justify-between pb-2 border-b-2">
                <p>FAQ</p>
                <i className="fa-solid fa-angle-right"></i>
              </a>
            </li>
            <li>
              <a href="/" className="more-items flex items-center justify-between pb-2 border-b-2">
                <p>Tour</p>
                <i className="fa-solid fa-angle-right"></i>
              </a>
            </li>
            <li>
              <a href="/" className="more-items flex items-center justify-between pb-2 border-b-2">
                <p>About</p>
                <i className="fa-solid fa-angle-right"></i>
              </a>
            </li>
          </ul>
          <div className="medias flex gap-3 text-sm justify-center mt-16 text-white ">
            <i className="fa-brands fa-twitter bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
            <i className="fa-brands fa-instagram bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
            <i className="fa-brands fa-square-youtube bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
            <i className="fa-brands fa-facebook bg-red-600 p-1.5 rounded-full cursor-pointer"></i>
          </div>
          <p className="text-center text-sm mt-3 font-black">Ubagroup</p>
      </section>
    </div>
  );
};
