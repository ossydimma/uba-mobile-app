
interface loadingType {
    className : String
}

export const Loading = ({className}: loadingType) => {
  return (
    <div>
      <div className={` ${className}  w-52 h-auto py-4  rounded-2xl mx-auto`}>
        <div className="flex flex-row gap-2 justify-center">
          <div className="w-4 sm:w-2 h-4 sm:h-2 rounded-full bg-red-600 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 sm:w-2 h-4 sm:h-2 rounded-full bg-red-600 animate-bounce [animation-delay:.1s]"></div>
          <div className="w-4 sm:w-2 h-4 sm:h-2 rounded-full bg-red-600 animate-bounce [animation-delay:.3s]"></div>
        </div>
      </div>
    </div>
  );
};
