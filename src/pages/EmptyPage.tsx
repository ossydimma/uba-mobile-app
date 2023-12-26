import { useContext } from "react"
import { MorePageContext } from "../MyContext"
import { MoreHeader } from "../components/MoreHeader"

interface EmptyPageType {
    pageName: string
    article: string
    onClick: ()=> void;
}

export const EmptyPage = ({pageName, article, onClick }: EmptyPageType) => {
  const {showNoti} = useContext(MorePageContext)
  return (
    <div>
         <section className="bg-white text-black w-full h-screen top-0 absolute left-0 showMorePage">
            <MoreHeader name={pageName} onClick={onClick} />
            <p className="text-center mt-40 text-sm font-serif">{article}</p>
         </section>
        
    </div>
  )
}
