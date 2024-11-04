import { useState } from "react";
import { Loading } from "../components/Loading";
import { PopUP } from "../components/PopUP";
import type { transferType, detailsType, BeneficiaryType } from "./Transfer";
import axios from "axios";

interface displayType {
  addNew: boolean;
  loader: boolean;
  popUp: boolean;
  div: boolean;
}
export interface dataType {
  name: string;
  number: string;
  btnText: string;
}
interface parentType {
  setDisplay: React.Dispatch<React.SetStateAction<transferType>>;
  setDetails: React.Dispatch<React.SetStateAction<detailsType>>;
}
export const Beneficiary = ({ setDisplay, setDetails }: parentType) => {
  let userBeneficiaries: BeneficiaryType[] = JSON.parse(
    localStorage.getItem("Beneficiaries") || "[]"
  );

  // states
  const [displayer, setDisplayer] = useState<displayType>({
    addNew: false,
    loader: false,
    popUp: false,
    div: false,
  });
  const [data, setData] = useState<dataType>({
    name: "",
    number: "",
    btnText: "Verify Account",
  });
  const [inputValue, setInputValue] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [filteredObj, setFilteredObj] = useState<BeneficiaryType[]>([]);
  const [isValid, SetIsValid] = useState<boolean>(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.toUpperCase();
    setInputValue(value);

    const filtered = userBeneficiaries.filter((obj) =>
      obj.name.includes(value)
    );
    setFilteredObj(filtered);
  }

  return (
    <div>
      <div className=" text-black w-full h-screen  top-0 absolute left-0 showMorePage bg-white ">
        <h4 className="ml-6 sm:ml-3 mt-7 sm:mt-0 border-red-500 border-b-[3px] pb-1 w-fit mb-2 font-semibold text-xl sm:text-lg ">
          Select beneficiary
        </h4>
        <button
          className="bg-red-600 py-3 sm:py-2 my-3  text-white ml-6 w-[90%] sm:w-[200px] text-lg sm:text-sm rounded-[4px]"
          onClick={() => {
            setDisplayer((prev) => ({ ...prev, addNew: true }));
          }}
        >
          Add beneficiary
        </button>
        {userBeneficiaries.length !== 0 ? (
          <input
            type="text"
            placeholder="search beneficiary list"
            className="ml-6 w-[90%] sm:w-[200px] border outline-none text-lg sm:text-sm p-3 sm:p-2 mt-2"
            value={inputValue}
            onChange={handleInputChange}
          />
        ) : (
          ""
        )}

        <section>
          <ul className=" flex flex-col gap-4 sm:gap-3 mt-5 pl-5 sm:pl-0">
            {inputValue === ""
              ? userBeneficiaries.map((obj, index) => (
                  <li
                    key={index}
                    className="border w-[95%] sm:w-[232px] h-[65px] ml-1 flex gap-4 items-center py-4 pl-4 pr-10 hover:bg-gray-300"
                    onClick={() => {
                      setDetails((prev) => ({
                        ...prev,
                        name: obj.name,
                        number: obj.number,
                      }));
                      setDisplay((prev) => ({
                        ...prev,
                        addNew: false,
                        transferDiv: true,
                        btnText: "Transfer",
                      }));
                    }}
                  >
                    <i className="fa-regular fa-user  text-2xl sm:text-xl"></i>
                    <p className=" uppercase text-lg sm:text-sm">{obj.name}</p>
                  </li>
                ))
              : filteredObj.map((obj, index) => (
                  <li
                    key={index}
                    className="border w-[95%] sm:w-[232px] h-[65px] ml-1 flex gap-4 items-center py-4 pl-4 pr-10"
                    onClick={() => {
                      setDetails((prev) => ({
                        ...prev,
                        name: obj.name,
                        number: obj.number,
                      }));
                      setDisplay((prev) => ({ ...prev, addNew: false }));
                    }}
                  >
                    <i className="fa-regular fa-user  text-2xl sm:text-xl"></i>
                    <p className=" uppercase text-lg sm:text-sm">{obj.name}</p>
                  </li>
                ))}
          </ul>
        </section>
        <button
          className="bg-red-600 py-4 sm:py-2 mt-5 text-xl sm:text-sm text-white ml-6 sm:ml-1.5 w-[90%] sm:w-[230px] rounded-[4px]"
          onClick={(e) => {
            e.preventDefault();
            setDisplay((prev) => ({ ...prev, addNew: false }));
          }}
        >
          Cancel
        </button>
      </div>

      {displayer.addNew && (
        <section className="absolute top-0 h-full w-full bg-white">
          <div className=" absolute top-[100px] left-6 w-[88%] sm:w-[200px] bg-[#f1f1f1] py-4 shadow-lg rounded-xl">
            <i
              className="fa-solid fa-xmark flex justify-end mr-5 mb-6 cursor-pointer text-lg sm:text-[1rem]"
              onClick={() => {
                setDisplayer((prev) => ({ ...prev, addNew: false }));
              }}
            ></i>
            <h4 className=" text-center font-semibold text-xl sm:text-sm">
              Add beneficiary
            </h4>
            <p className=" text-center  text-xl sm:text-sm">Account</p>
            {displayer.div && (
              <section>
                <input
                  type="text"
                  readOnly
                  value={data.name}
                  placeholder="Beneficiary account name "
                  className="ml-2.5 w-[95%] sm:w-[180px] border outline-none text-lg sm:text-xs rounded p-3 sm:p-2 mt-2"
                  onChange={(e) => {
                    setData((prev) => ({ ...prev, name: e.target.value }));
                  }}
                />
              </section>
            )}

            <input
              type="text"
              value={data.number}
              placeholder="Beneficiary account number "
              className="ml-2.5 w-[95%] sm:w-[180px] border outline-none text-lg sm:text-xs rounded p-3 sm:p-2 mt-2"
              onChange={(e) => {
                setData((prev) => ({ ...prev, number: e.target.value }));
              }}
            />

            <button
              className="bg-red-600 py-3 sm:py-2 mt-3 text-lg sm:text-sm text-white ml-2.5 w-[95%] sm:w-[180px] rounded-[4px]"
              onClick={async (e) => {
                e.preventDefault();
                if (data.btnText === "Verify Account") {
                  setDisplayer((prev) => ({ ...prev, loader: true }));
                  try {
                    const res = await axios.get(
                      `https://ubaclonewebapi20241103124646.azurewebsites.net/api/UbaClone/${data.number}`
                    );
                    setData((prev) => ({ ...prev, name: res.data }));
                    SetIsValid(true);
                    setData((prev) => ({
                      ...prev,
                      btnText: "Add Beneficiary",
                    }));
                    setDisplayer((prev) => ({
                      ...prev,
                      loader: false,
                      div: true,
                    }));
                  } catch (err: any) {
                    if (err.status === 400 || 401 || 404) {
                      setMessage(err.response.data);
                    } else {
                      setMessage("Server error contact costumer service");
                    }
                    SetIsValid(false);
                    setDisplayer((prev) => ({
                      ...prev,
                      loader: false,
                      popUp: true,
                    }));
                  }
                } else if (data.btnText === "Add Beneficiary") {
                  const detials = {
                    name: data.name,
                    number: data.number,
                  };

                  const containValue = userBeneficiaries.some(
                    (obj) => obj.number === detials.number
                  );

                  if (!containValue) {
                    userBeneficiaries = [...userBeneficiaries, detials];
                  }
                  localStorage.setItem(
                    "Beneficiaries",
                    JSON.stringify(userBeneficiaries)
                  );

                  setMessage("Beneficiary has been added successfully");
                  setDisplayer((prev) => ({ ...prev, popUp: true }));
                }
              }}
            >
              {data.btnText}
            </button>
          </div>
          {displayer.loader && (
            <Loading className="absolute top-[180px] left-[5rem] sm:left-4" />
          )}
          {displayer.popUp && (
            <div className="absolute top-0 h-full w-full bg-white">
              <PopUP
                icon={
                  isValid ? (
                    <i className="fa-solid fa-check bg-green-600 py-3 px-4 rounded-full text-white text-2xl"></i>
                  ) : (
                    <i className="fa-solid fa-xmark bg-red-600 py-3 px-5 rounded-full text-white text-2xl"></i>
                  )
                }
                onClick={() => {
                  if (isValid) {
                    setData({
                      name: "",
                      number: "",
                      btnText: "Verify Account",
                    });
                    setDisplayer((prev) => ({
                      ...prev,
                      addNew: false,
                      div: false,
                    }));
                  } else {
                    setDisplayer((prev) => ({ ...prev, popUp: false }));
                  }
                  setDisplayer((prev) => ({ ...prev, popUp: false }));
                }}
                className="absolute top-[90px] left-[6rem] sm:left-4"
                title={isValid ? "sucess" : "Failed"}
                msg={message}
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
};
