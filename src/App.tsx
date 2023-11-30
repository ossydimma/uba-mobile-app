import { Route, Routes } from "react-router-dom";
import { PhoneDisplay } from "./components/phoneDisplay";
import { More } from "./pages/More";
import { useState } from "react";
import { BgContext } from "./MyContext";

function App() {
  const [bg, setBg] = useState<string>("phone-deafult-screen");
  return (
    <>
    <BgContext.Provider value={{bg, setBg}}>
      <PhoneDisplay />
    </BgContext.Provider>
    </>
  );
}

export default App;
