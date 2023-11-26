import { useEffect, useState } from "react";
import "./App.css";
import { ScreenContent } from "./components/ScreenContent";

function App() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-screen w-100% flex justify-center items-center">
      <div className="phone w-64 border-black border-4 border-solid bg-white overflow-hidden">
        <div className="header flex my-3 items-center mx-5 gap-5">
          <div className="time text-xs">
            <h1>
              {time.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}{" "}
            </h1>
          </div>
          <div className="camera-container">
            <div className="camera-spot w-16 h-6 rounded-full bg-black py-2 ml-1">
              <div className="camera w-2 h-2 bg-gray-900 rounded-full ml-12"></div>
            </div>
          </div>
          <div className="icons flex gap-1 text-xs">
            <i className="icon fa-solid fa-signal"></i>
            <i className="icon fa-solid fa-wifi"></i>
            <i className="icon fa-solid fa-battery-half"></i>
          </div>
        </div>
        <ScreenContent />
      </div>
    </div>
  );
}

export default App;
