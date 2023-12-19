interface msgType {
    msg : String
    clasName? : string
}
export const ErrorPage = (msg : msgType) => {
  return (
    <div className=" z-10 absolute top-[600px] left-4 w-52 h-auto pt-4 pb-8 bg-white rounded-2xl mx-auto px-4 drop-shadow-xl">
        <i className="fa-solid fa-xmark cursor-pointer flex justify-end  pb-6"></i>
        <main className="flex flex-col gap-5 justify-center items-center">
            <i className="fa-solid fa-xmark bg-red-600 py-3 px-5 rounded-full text-white text-2xl"></i>
            <p>Failed</p>
            <p className=" text-xs">{msg.msg}.</p>
            <button className="bg-red-600 py-2 text-sm text-white  w-44 rounded-[4px]">OK</button>
        </main>
    </div>
  )
}
