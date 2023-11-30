import { MoreHeader } from "../components/MoreHeader"

interface EmptyPageType {
    pageName: string
    article: string
}

export const EmptyPage = ({pageName, article }: EmptyPageType) => {
  return (
    <div>
         <section className="bg-white text-black w-full h-screen top-0 absolute left-0 showMorePage">
            <MoreHeader name={pageName}  />
            <p className="text-center mt-40 text-sm font-serif">{article}</p>
         </section>
    </div>
  )
}
