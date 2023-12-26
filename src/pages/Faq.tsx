import { useContext, useState } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { EmptyPage } from "./EmptyPage";
import { MorePageContext } from "../MyContext";
// interface AnsType {
//   item1: string | boolean;
//   item2: string | boolean;
//   item3: string | boolean;
//   item4: string | boolean;
//   item5: string | boolean;
//   item6: string | boolean;
// }

export const Faq = () => {
    const {showNoti, setShowFaq, setShowNoti} = useContext(MorePageContext)

  const [rotate, setRotate] = useState({
    rotateItem1: "",
    rotateItem2: "",
    rotateItem3: "",
    rotateItem4: "",
    rotateItem5: "",
    rotateItem6: "",
  });
  const [showAns, setShowAns] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
  });

  function handleClick(itemName: string) {
    switch (itemName) {
      case "item1":
        setRotate({
          rotateItem1: "rotateUp",
          rotateItem2: "",
          rotateItem3: "",
          rotateItem4: "",
          rotateItem5: "",
          rotateItem6: "",
        });

        if (rotate.rotateItem1 === "rotateUp") {
          setRotate({
            rotateItem1: "rotateDown",
            rotateItem2: "",
            rotateItem3: "",
            rotateItem4: "",
            rotateItem5: "",
            rotateItem6: "",
          });
          setShowAns({
            item1: false,
            item2: false,
            item3: false,
            item4: false,
            item5: false,
            item6: false,
          });
        } else {
          setRotate({
            rotateItem1: "rotateUp",
            rotateItem2: "",
            rotateItem3: "",
            rotateItem4: "",
            rotateItem5: "",
            rotateItem6: "",
          });
          setShowAns({
            item1: true,
            item2: false,
            item3: false,
            item4: false,
            item5: false,
            item6: false,
          });
        }

       

        break;
      case "item2":
        setRotate({
          rotateItem1: "",
          rotateItem2: "rotateUp",
          rotateItem3: "",
          rotateItem4: "",
          rotateItem5: "",
          rotateItem6: "",
        });

        if (rotate.rotateItem2 === "rotateUp") {
          setRotate({
            rotateItem1: "",
            rotateItem2: "rotateDown",
            rotateItem3: "",
            rotateItem4: "",
            rotateItem5: "",
            rotateItem6: "",
          });
          setShowAns({
            item1: false,
            item2: false,
            item3: false,
            item4: false,
            item5: false,
            item6: false,
          });
        } else {
          setRotate({
            rotateItem1: "",
            rotateItem2: "rotateUp",
            rotateItem3: "",
            rotateItem4: "",
            rotateItem5: "",
            rotateItem6: "",
          });
          setShowAns({
            item1: false,
            item2: true,
            item3: false,
            item4: false,
            item5: false,
            item6: false,
          });
        }


        break;
      case "item3":
        setRotate({
          rotateItem1: "",
          rotateItem2: "",
          rotateItem3: "rotateUp",
          rotateItem4: "",
          rotateItem5: "",
          rotateItem6: "",
        });

        if (rotate.rotateItem3 === "rotateUp") {
          setRotate({
            rotateItem1: "",
            rotateItem2: "",
            rotateItem3: "rotateDown",
            rotateItem4: "",
            rotateItem5: "",
            rotateItem6: "",
          });
          setShowAns({
            item1: false,
            item2: false,
            item3: false,
            item4: false,
            item5: false,
            item6: false,
          });
        } else {
          setRotate({
            rotateItem1: "",
            rotateItem2: "",
            rotateItem3: "rotateUp",
            rotateItem4: "",
            rotateItem5: "",
            rotateItem6: "",
          });
          setShowAns({
            item1: false,
            item2: false,
            item3: true,
            item4: false,
            item5: false,
            item6: false,
          });
        }


        break;
      case "item4":
        setRotate({
          rotateItem1: "",
          rotateItem2: "",
          rotateItem3: "",
          rotateItem4: "rotateUp",
          rotateItem5: "",
          rotateItem6: "",
        });

        if (rotate.rotateItem4 === "rotateUp") {
          setRotate({
            rotateItem1: "",
            rotateItem2: "",
            rotateItem3: "",
            rotateItem4: "rotateDown",
            rotateItem5: "",
            rotateItem6: "",
          });
          setShowAns({
            item1: false,
            item2: false,
            item3: false,
            item4: false,
            item5: false,
            item6: false,
          });
        } else {
          setRotate({
            rotateItem1: "",
            rotateItem2: "",
            rotateItem3: "",
            rotateItem4: "rotateUp",
            rotateItem5: "",
            rotateItem6: "",
          });
          setShowAns({
            item1: false,
            item2: false,
            item3: false,
            item4: true,
            item5: false,
            item6: false,
          });
        }


        break;
      case "item5":
        setRotate({
          rotateItem1: "",
          rotateItem2: "",
          rotateItem3: "",
          rotateItem4: "",
          rotateItem5: "rotateUp",
          rotateItem6: "",
        });

        if (rotate.rotateItem5 === "rotateUp") {
          setRotate({
            rotateItem1: "",
            rotateItem2: "",
            rotateItem3: "",
            rotateItem4: "",
            rotateItem5: "rotateDown",
            rotateItem6: "",
          });
          setShowAns({
            item1: false,
            item2: false,
            item3: false,
            item4: false,
            item5: false,
            item6: false,
          });
        } else {
          setRotate({
            rotateItem1: "",
            rotateItem2: "",
            rotateItem3: "",
            rotateItem4: "",
            rotateItem5: "rotateUp",
            rotateItem6: "",
          });
          setShowAns({
            item1: false,
            item2: false,
            item3: false,
            item4: false,
            item5: true,
            item6: false,
          });
        }


        break;
      case "item6":
        setRotate({
          rotateItem1: "",
          rotateItem2: "",
          rotateItem3: "",
          rotateItem4: "",
          rotateItem5: "",
          rotateItem6: "rotateUp",
        });

        if (rotate.rotateItem6 === "rotateUp") {
          setRotate({
            rotateItem1: "",
            rotateItem2: "",
            rotateItem3: "",
            rotateItem4: "",
            rotateItem5: "",
            rotateItem6: "rotateDown",
          });
          setShowAns({
            item1: false,
            item2: false,
            item3: false,
            item4: false,
            item5: false,
            item6: false,
          });
        } else {
          setRotate({
            rotateItem1: "",
            rotateItem2: "",
            rotateItem3: "",
            rotateItem4: "",
            rotateItem5: "",
            rotateItem6: "rotateUp",
          });
          setShowAns({
            item1: false,
            item2: false,
            item3: false,
            item4: false,
            item5: false,
            item6: true,
          });
        }


        break;

      default:
        break;
    }
//     setRotate("rotateUp");
//     rotate === "rotateUp" ? setRotate("rotateDown") : setRotate("rotateUp");
//     showAns ? setShowAns(false) : setShowAns(true);
  }
  return (
    <div>
      <section className="bg-white text-black w-full h-screen top-0 absolute left-0 showMorePage">
        <MoreHeader name="FAQ" onClick={()=> {
          if (setShowFaq !== undefined) {
            setShowFaq(false);
          }
        }}/>
        <main className="questions-wrapper">
          <ul className=" mx-3  text-sm">
            <li className="mt-2  border-b-2 ">
              <div
                className="cursor-pointer flex justify-between items-center mb-2"
                onClick={()=>handleClick("item1")}
              >
                <article>
                  <span className="text-red-600">*</span> What happens if i
                  forget my password?
                </article>
                <i
                  className={`fa-solid fa-chevron-down fa-xs ${rotate.rotateItem1}`}
                ></i>
              </div>
              {showAns.item1 && (
                <ul className="ans ml-7 text-xs pb-3 h-24">
                  <li className="list-disc">
                    if you forget ypour passord, the app will prompt you to
                    reset your password. You can also use the{" "}
                    <span className="font-bold">Forgot Password?</span> tab on
                    the log-in screen
                  </li>
                </ul>
              )}
            </li>
            <li className="mt-2  border-b-2 ">
              <div
                className="cursor-pointer flex justify-between items-center mb-2"
                onClick={()=>handleClick("item2")}
              >
                <article>
                  <span className="text-red-600">*</span> How do I view my account statment?
                </article>
                <i className={`fa-solid fa-chevron-down fa-xs ${rotate.rotateItem2}`}></i>
              </div>
              {showAns.item2 && (
                <ul className="ans ml-7 text-xs pb-3 h-24">
                  <li className="list-disc">
                    if you forget ypour passord, the app will prompt you to
                    reset your password. You can also use the{" "}
                    <span className="font-bold">Forgot Password?</span> tab on
                    the log-in screen
                  </li>
                </ul>
              )}
            </li>
            <li className="mt-2  border-b-2 ">
              <div
                className="cursor-pointer flex justify-between items-center mb-2"
                onClick={()=>handleClick("item3")}
              >
                <article>
                  <span className="text-red-600">*</span> How do I register for UBA Mobile Banking?
                </article>
                <i className={`fa-solid fa-chevron-down fa-xs ${rotate.rotateItem3}`}></i>
              </div>
              {showAns.item3 && (
                <ul className="ans ml-7 text-xs pb-3 h-24">
                  <li className="list-disc">
                    if you forget ypour passord, the app will prompt you to
                    reset your password. You can also use the{" "}
                    <span className="font-bold">Forgot Password?</span> tab on
                    the log-in screen
                  </li>
                </ul>
              )}
            </li>
            <li className="mt-2  border-b-2 ">
              <div
                className="cursor-pointer flex justify-between items-center mb-2"
                onClick={()=>handleClick("item4")}
              >
                <article>
                  <span className="text-red-600">*</span> How do I view my transcation receipts?
                </article>
                <i className={`fa-solid fa-chevron-down fa-xs ${rotate.rotateItem4}`}></i>
              </div>
              {showAns.item4 && (
                <ul className="ans ml-7 text-xs pb-3 h-24">
                  <li className="list-disc">
                    if you forget ypour passord, the app will prompt you to
                    reset your password. You can also use the{" "}
                    <span className="font-bold">Forgot Password?</span> tab on
                    the log-in screen
                  </li>
                </ul>
              )}
            </li>
            <li className="mt-2  border-b-2 ">
              <div
                className="cursor-pointer flex justify-between items-center mb-2"
                onClick={()=>handleClick("item5")}
              >
                <article>
                  <span className="text-red-600">*</span> What else can i do with UBA Mobile Banking?
                </article>
                <i className={`fa-solid fa-chevron-down fa-xs ${rotate.rotateItem5}`}></i>
              </div>
              {showAns.item5 && (
                <ul className="ans ml-7 text-xs pb-3 h-24">
                  <li className="list-disc">
                    if you forget ypour passord, the app will prompt you to
                    reset your password. You can also use the{" "}
                    <span className="font-bold">Forgot Password?</span> tab on
                    the log-in screen
                  </li>
                </ul>
              )}
            </li>
            <li className="mt-2  border-b-2 ">
              <div
                className="cursor-pointer flex justify-between items-center mb-2"
                onClick={()=>handleClick("item6")}
              >
                <article>
                  <span className="text-red-600">*</span>  what happens if i
                  forget my PIN?
                </article>
                <i className={`fa-solid fa-chevron-down fa-xs ${rotate.rotateItem6}`}></i>
              </div>
              {showAns.item6 && (
                <ul className="ans ml-7 text-xs pb-3 h-24">
                  <li className="list-disc">
                    if you forget ypour passord, the app will prompt you to
                    reset your password. You can also use the{" "}
                    <span className="font-bold">Forgot Password?</span> tab on
                    the log-in screen
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </main>
      </section>
      { showNoti &&<EmptyPage pageName="Notification" article="There Are No Notification" onClick={()=> {
            if (setShowNoti !== undefined) {
                setShowNoti(false);
              }
        }}/>}
    </div>
  );
};
