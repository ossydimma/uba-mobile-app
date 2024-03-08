import { PhoneDisplay } from "./components/phoneDisplay";
import {  useState } from "react";
import { BeneficiariesContext, BgContext} from "./MyContext";
import { dataType } from "./pages/Beneficiary";

function App() {
  const [bg, setBg] = useState<string>("phone-deafult-screen");

  const [beneficiaries, setBeneficiaries] = useState<dataType[]>(
    [] as dataType[]
  );


  return (
    <>
        <BgContext.Provider value={{ bg, setBg }}>
          <BeneficiariesContext.Provider
            value={{ beneficiaries, setBeneficiaries }}
          >
            <PhoneDisplay />
          </BeneficiariesContext.Provider>
        </BgContext.Provider>
    </>
  );
}

export default App;
