import { Route, Routes } from "react-router-dom";
import { PhoneDisplay } from "./components/phoneDisplay";
import { More } from "./pages/More";
import { useState } from "react";
import { BeneficiariesContext, BgContext, UserInfo } from "./MyContext";
import { dataType } from "./pages/Beneficiary";

function App() {
  const [bg, setBg] = useState<string>("phone-deafult-screen");
  const user = {
    fullName : 'Ositadimma Chris Jerry',
    contact : '',
    password : '',
    balance : '2000.00',
    accountNo : '2763732737',
    accountType : 'Current Account',
    pin : '0000'
  }
  const [beneficiaries, setBeneficiaries] = useState<dataType[] >( [] as dataType[])

  
  return (
    <>
    <UserInfo.Provider value={user}>
      <BgContext.Provider value={{bg, setBg}}>
        <BeneficiariesContext.Provider value={{beneficiaries, setBeneficiaries}}>
          <PhoneDisplay />
        </BeneficiariesContext.Provider>
      </BgContext.Provider>
    </UserInfo.Provider>
    </>
  );
}

export default App;
