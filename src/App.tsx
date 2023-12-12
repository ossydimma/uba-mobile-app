import { Route, Routes } from "react-router-dom";
import { PhoneDisplay } from "./components/phoneDisplay";
import { More } from "./pages/More";
import { useState } from "react";
import { BgContext, UserInfo } from "./MyContext";

function App() {
  const [bg, setBg] = useState<string>("phone-deafult-screen");
  const user = {
    fullName : '',
    contact : '',
    password : '',
    pin : ''
  }
  // console.log(user.fullName)
  return (
    <>
    <UserInfo.Provider value={user}>
      <BgContext.Provider value={{bg, setBg}}>
        <PhoneDisplay />
      </BgContext.Provider>
    </UserInfo.Provider>
    </>
  );
}

export default App;
