import { useContext } from "react";
import { MoreHeader } from "../components/MoreHeader";
import { BgContext, MorePageContext } from "../MyContext";

export const SignUpHomePage = () => {
// contexts
  const { setBg } = useContext(BgContext);
  const { setShowSignUp, setShowSignUpHomePage} = useContext(MorePageContext);

//   functions
  function handleSignUpPage(): void {
    if (setShowSignUp !== undefined && setShowSignUpHomePage !== undefined) {
        setShowSignUpHomePage(false)
        setBg('dark-screen-mode')
        setShowSignUp(true);
    }
  }


  return (
    <div>
      <section className=" text-black w-full h-screen top-0 absolute left-0 showMorePage bg-white">
        <MoreHeader name="Sign Up" onClick={()=> {
          if (setShowSignUpHomePage !== undefined) {
            setShowSignUpHomePage(false);
            setBg("phone-deafult-screen");
          }
        }}/>
        <ul className="text-xl sm:text-sm flex flex-col gap-4 sm:gap-3 mx-4 mt-4">
          <li>
            <article
              onClick={handleSignUpPage}
              className="cursor-pointer flex items-center justify-between pb-2  mb-3  "
            >
              <p>Use Activation Code</p>
              <i className="fa-solid fa-angle-right text-gray-400"></i>
            </article>
          </li>
          <li>
            <article
              onClick={handleSignUpPage}
              className="cursor-pointer flex items-center justify-between pb-2  mb-3 "
            >
              <p>Use Activation Code(SME)</p>
              <i className="fa-solid fa-angle-right text-gray-400"></i>
            </article>
          </li>
          <li>
            <article
              onClick={handleSignUpPage }             className="cursor-pointer flex items-center justify-between pb-2  mb-3 "
            >
              <p>Use Activation Code(Kids/Teens)</p>
              <i className="fa-solid fa-angle-right text-gray-400"></i>
            </article>
          </li>
          <li>
            <article
              onClick={handleSignUpPage}
              className="cursor-pointer flex items-center justify-between pb-2 mb-3 "
            >
              <p>Debit Card</p>
              <i className="fa-solid fa-angle-right text-gray-400"></i>
            </article>
          </li>
          <li>
            <article
              onClick={handleSignUpPage}
              className="cursor-pointer flex items-center justify-between pb-2 mb-3 "
            >
              <p>Prepaid Card</p>
              <i className="fa-solid fa-angle-right text-gray-400"></i>
            </article>
          </li>
          <li>
            <article
              onClick={handleSignUpPage}
              className="cursor-pointer flex items-center justify-between pb-2 mb-3 "
            >
              <p>Activation with *919# PIN</p>
              <i className="fa-solid fa-angle-right text-gray-400"></i>
            </article>
          </li>
          <li>
            <article
              onClick={handleSignUpPage}
              className="cursor-pointer flex items-center justify-between pb-2 mb-3 "
            >
              <p>Account + Secure Pass</p>
              <i className="fa-solid fa-angle-right text-gray-400"></i>
            </article>
          </li>
          <li>
            <article
              onClick={handleSignUpPage}
              className="cursor-pointer flex items-center justify-between pb-2 mb-3 "
            >
              <p>Registered in Branch</p>
              <i className="fa-solid fa-angle-right text-gray-400"></i>
            </article>
          </li>
        </ul>
      </section>
    </div>
  );
};
