export default function RightLoginCard({ image, titleLine1, titleLine2 }) {
  return (
    <div className="hidden md:flex w-1/2 relative overflow-hidden flex-col bg-[#4D1874] rounded-r-3xl">
      <div className="absolute top-0 left-[-30%] w-[190%] h-[75%] bg-[#bd80d8] rounded-b-[100%]"></div>
      <div className="absolute top-0 left-[-20%] w-[160%] h-[70%] bg-white rounded-b-[100%]"></div>
      <div className="relative z-10 w-full h-full flex flex-col justify-between">

        <div className="h-[75%] w-full flex items-center justify-center pt-8">
          <div className="w-64 h-64 lg:w-80 lg:h-80 relative">
            <img
              src={image}
              alt="Ilustración"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-start pt-4 items-center text-center px-8 text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-1 tracking-wide">
            {titleLine1}
          </h2>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-wide">
            {titleLine2}
          </h2>
        </div>

      </div>
    </div>
  );
}