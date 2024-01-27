import { useContext, useState } from "react";
import { Loading } from "../components/Loading";
import { PopUP } from "../components/PopUP";
import type {transferType} from './Transfer'
import { BeneficiariesContext } from "../MyContext";

interface displayType {
  addNew: boolean;
  loader : boolean;
  popUp : boolean
}
export interface dataType {
  name: string;
  number: string;
}
interface parentType {
    setDisplay : React.Dispatch<React.SetStateAction<transferType>>
}
export const Beneficiary = ({setDisplay}: parentType) => {

  // states
  const [displayer, setDisplayer] = useState<displayType>({
    addNew: false,
    loader : false,
    popUp : false,
  });
  const [data, setData] = useState<dataType>({
    name: "",
    number: "",
  });
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredObj, setFilteredObj] = useState<dataType[]>([]);
  

  // context
  const {beneficiaries, setBeneficiaries} = useContext(BeneficiariesContext)

  function handleInputChange(e : React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value)

    const filtered = beneficiaries.filter(obj => obj.name.includes(value))
    setFilteredObj(filtered)
  }
  
  return (
    <div>
      <div className=" text-black w-full h-screen  top-0 absolute left-0 showMorePage bg-white ">
        <h4 className="ml-3 border-red-500 border-b-[3px] pb-1 w-[130px] mb-2 font-semibold">
          Select beneficiary
        </h4>
        <button
          className="bg-red-600 py-2 mt-3  text-white ml-6 w-[200px] text-sm rounded-[4px]"
          onClick={() => {
            setDisplayer((prev) => ({ ...prev, addNew: true }));
          }}
        >
          Add beneficiary
        </button>
        {beneficiaries.length !== 0 
        ? ( <input
        type="text"
        placeholder="search beneficiary list"
        className="ml-6 w-[200px] border outline-none text-sm p-2 mt-2"
        value={inputValue}
        onChange={handleInputChange}
        />)
        : ''}
       
        <section>
            <ul className=" flex flex-col gap-3 mt-5">
                { inputValue === '' ? 
                 beneficiaries.map((obj, index) => (
                    <li key={index} className="border w-[232px] h-[65px] ml-1 flex gap-4 items-center py-4 pl-4 pr-10">
                        <i className="fa-regular fa-user  text-xl"></i>
                        <p className=" uppercase text-sm">{obj.name}</p>
                    </li>
                )) 
                : filteredObj.map((obj, index) => (
                  <li key={index} className="border w-[232px] h-[65px] ml-1 flex gap-4 items-center py-4 pl-4 pr-10">
                      <i className="fa-regular fa-user  text-xl"></i>
                      <p className=" uppercase text-sm">{obj.name}</p>
                  </li>
              )) 

                }
            </ul>
        </section>
        <button 
            className="bg-red-600 py-2 mt-5 text-sm text-white ml-1.5 w-[230px] rounded-[4px]"
            onClick={(e)=> {
              e.preventDefault()
              setDisplay((prev)=> ({...prev, addNew : false}))
            
            }}
        >
          Cancel
        </button>
      </div>


      {displayer.addNew && (
        <section className="absolute top-0 h-full w-full bg-white">
          <div className=" absolute top-[100px] left-6 w-[200px] bg-[#f1f1f1] py-4 shadow-lg rounded-xl">
            <i
              className="fa-solid fa-xmark flex justify-end mr-5 mb-6 cursor-pointer"
              onClick={() => {
                setDisplayer((prev) => ({ ...prev, addNew: false }));
              }}
            ></i>
            <h4 className=" text-center font-semibold text-sm">
              Add beneficiary
            </h4>
            <p className=" text-center  text-sm">Account</p>
            <input
              type="text"
              value={data.name}
              placeholder="Beneficiary account name "
              className="ml-2.5 w-[180px] border outline-none text-xs rounded p-2 mt-2"
              onChange={(e)=> {
                setData((prev)=> ({...prev, name : e.target.value}))
                
              }}
            />
            {data.name === '' ? <p className=" text-[10px] ml-4 text-red-600">please enter beneficiary name</p> : data.name.length < 3 ? <p className=" text-[10px] ml-4 text-red-600"> name must be more than 4 words</p> : !/^[a-zA-Z]+$/.test(data.name) ? <p className=" text-[10px] ml-4 text-red-600">must contain only letters</p> : '' }
            
            <input
              type="text"
              value={data.number}
              placeholder="Beneficiary account number "
              className="ml-2.5 w-[180px] border outline-none text-xs rounded p-2 mt-2"
              onChange={(e)=> {
                setData((prev)=> ({...prev, number : e.target.value}))
              }}
            />
            {! /^[0-9]+$/.test(data.number) || data.number.length !== 10  ? <p className=" text-[10px] ml-4 text-red-600">please enter valid account</p> :  '' }

            <button
              className="bg-red-600 py-2 mt-3 text-sm text-white ml-2.5 w-[180px] rounded-[4px]"
              onClick={(e) => {
                e.preventDefault()
                if (
                    /^[0-9]+$/.test(data.number) &&
                    data.number.length === 10 &&
                    /^[a-zA-Z]+$/.test(data.name) &&
                    data.name !== "" &&
                    data.name.length > 3
                  ) {
                    if (setBeneficiaries !== undefined) {
                      setBeneficiaries((prev)=>[...prev, data])
                      setDisplayer((prev) => ({ ...prev, loader: true }));
                      setTimeout(()=>{
                          setDisplayer((prev) => ({ ...prev, loader: false }));
                          setDisplayer((prev) => ({ ...prev, popUp: true }));
                      },2000)

                    }
                    
                  }
              }}
            >
              Add beneficiary
            </button>
          </div>
          {displayer.loader && (
              <Loading className="absolute top-[180px] left-4" />
            )}
            {displayer.popUp && (
              <PopUP
                icon={
                  <i className="fa-solid fa-check bg-green-600 py-3 px-4 rounded-full text-white text-2xl"></i>
                }
                onClick={()=> {
                    setData({name : "", number : ''})
                    setDisplayer((prev) => ({ ...prev, popUp: false }));
                    setDisplayer((prev) => ({ ...prev, loader: true}));
                    setTimeout(()=> {

                      setDisplayer((prev)=> ({...prev,loader : false, addNew : false}))
                    }, 1000)
                }}
                className="absolute top-[90px] left-4"
                title="Success"
                msg="Beneficiary has been added successfully"
              />
            )}
        </section>
      )}
    </div>
  );
};
