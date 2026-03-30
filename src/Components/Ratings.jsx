function Ratings(){
    return(
        <div className="w-full flex flex-row items-center px-28 justify-around h-[233px] bg-gradient-to-r from-violet-600 to-indigo-600 mb-6">
            <div className="flex flex-col items-center justify-center ">
                <h1 className="text-6xl max-lg:text-4xl max-sm:text-3xl font-bold text-white text-center ">50K+</h1>
                <p className="mt-2 text-[#DDCEFD] text-2xl max-sm:text-lg text-center">Active Users</p>
            </div>
            
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-6xl max-lg:text-4xl max-sm:text-3xl font-bold text-white text-center ">200+</h1>
                <p className="mt-2 text-[#DDCEFD] text-2xl max-sm:text-lg text-center">Premium Tools</p>
            </div>

            <div className="flex flex-col items-center justify-center">
                <h1 className="text-6xl max-lg:text-4xl max-sm:text-3xl font-bold text-white text-center ">4.9</h1>
                <p className="mt-2 text-[#DDCEFD] text-2xl max-sm:text-lg text-center">Rating</p>
            </div>
        </div>
    )
}
export default Ratings;