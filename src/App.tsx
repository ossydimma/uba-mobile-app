import { PhoneDisplay } from "./components/phoneDisplay";
import { useEffect, useState } from "react";
import { BeneficiariesContext, BgContext, UserInfo } from "./MyContext";
import { dataType } from "./pages/Beneficiary";
import { detailsType } from "./pages/Transfer";
import { userInfo } from "os";

function App() {
  const [bg, setBg] = useState<string>("phone-deafult-screen");
  const user = {
    fullName: undefined,
    contact: undefined,
    password: undefined,
    balance: "2000.00",
    accountNo: "2763732737",
    accountType: "Current Account",
    pin: undefined,
    history: [] as detailsType[],
  };
  const [beneficiaries, setBeneficiaries] = useState<dataType[]>(
    [] as dataType[]
  );
  localStorage.setItem("userInfo", JSON.stringify(user));
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const [data, setData] = useState(userInfo);

  window.addEventListener("storage", (e: StorageEvent) => {
    const userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
    setData(userData);
  });

  return (
    <>
      <UserInfo.Provider value={data}>
        <BgContext.Provider value={{ bg, setBg }}>
          <BeneficiariesContext.Provider
            value={{ beneficiaries, setBeneficiaries }}
          >
            <PhoneDisplay />
          </BeneficiariesContext.Provider>
        </BgContext.Provider>
      </UserInfo.Provider>
    </>
  );
}

export default App;
