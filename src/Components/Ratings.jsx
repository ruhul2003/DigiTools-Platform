function Ratings() {
    return (
        <div className="w-full flex flex-row md:flex-row max-sm:flex-col items-center justify-center gap-8 max-sm:gap-4 py-12 md:py-16 px-6 max-sm:px-2 max bg-linear-to-r from-violet-600 to-indigo-600 mb-6">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-5xl md:text-6xl font-bold text-white text-center">50K+</h1>
                <p className="mt-2 text-[#DDCEFD] text-xl md:text-2xl text-center">Active Users</p>
            </div>
            
            <div className="flex flex-col items-center justify-center border-y md:border-y-0 md:border-x border-white/20 py-8 md:py-0 md:px-20 w-full md:w-auto">
                <h1 className="text-5xl md:text-6xl font-bold text-white text-center">200+</h1>
                <p className="mt-2 text-[#DDCEFD] text-xl md:text-2xl text-center">Premium Tools</p>
            </div>

            <div className="flex flex-col items-center justify-center">
                <h1 className="text-5xl md:text-6xl font-bold text-white text-center">4.9</h1>
                <p className="mt-2 text-[#DDCEFD] text-xl md:text-2xl text-center">Rating</p>
            </div>
        </div>
    );
}

export default Ratings;