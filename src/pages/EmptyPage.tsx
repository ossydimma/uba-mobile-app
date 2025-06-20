
import { MoreHeader } from "../components/MoreHeader"

interface EmptyPageType {
    pageName: string
    article: string
    onClick: ()=> void;
}

export const EmptyPage = ({pageName, article, onClick }: EmptyPageType) => {
  return (
    <div>
         <section className="bg-white text-black w-full h-screen top-0 absolute left-0 showMorePage z-30">
            <MoreHeader name={pageName} onClick={onClick} />
            <p className="text-center mt-40 text-lg sm:text-sm font-serif">{article}</p>
         </section>
        
    </div>
  )
}
