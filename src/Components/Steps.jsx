import userPng from '../../assets/user.png';
import packagePng from '../../assets/package.png';
import rocketPng from '../../assets/rocket.png';
function Steps() {
    return (
        <div className="w-4/5 mx-auto mt-16 mb-16">
            
            <h1 className="text-3xl md:text-5xl font-bold text-center">Get Started in 3 Steps</h1>
            <p className="text-center text-gray-600 mt-4 px-4">Start using premium digital tools in minutes, not hours.</p>

            
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mt-12">

                {/* Step 1 */}
                <div className="text-center relative flex flex-col items-center w-full max-w-sm lg:w-1/3 p-8 border border-[#7823F8] rounded-2xl shadow-md transition-transform hover:-translate-y-2 duration-300 bg-white">
                    <span className='absolute top-4 right-4 text-sm px-3 py-1 bg-[#7823F8] rounded-full text-white font-bold'>
                        1
                    </span>
                    <img src={userPng} alt="User Icon" className="w-16 h-16 mx-auto mb-6" />
                    <h2 className='text-2xl md:text-3xl font-bold'>Create Account</h2>
                    <p className='text-gray-600 mt-4 leading-relaxed'>
                        Sign up for free in seconds. <br className="hidden md:block" /> No credit card required to get started.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="text-center relative flex flex-col items-center w-full max-w-sm lg:w-1/3 p-8 border border-[#7823F8] rounded-2xl shadow-md transition-transform hover:-translate-y-2 duration-300 bg-white">
                    <span className='absolute top-4 right-4 text-sm px-3 py-1 bg-[#7823F8] rounded-full text-white font-bold'>
                        2
                    </span>
                    <img src={packagePng} alt="Package Icon" className="w-16 h-16 mx-auto mb-6" />
                    <h2 className='text-2xl md:text-3xl font-bold'>Choose Plan</h2>
                    <p className='text-gray-600 mt-4 leading-relaxed'>
                        Browse our catalog and select <br className="hidden md:block" /> the tools that fit your needs.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="text-center relative flex flex-col items-center w-full max-w-sm lg:w-1/3 p-8 border border-[#7823F8] rounded-2xl shadow-md transition-transform hover:-translate-y-2 duration-300 bg-white">
                    <span className='absolute top-4 right-4 text-sm px-3 py-1 bg-[#7823F8] rounded-full text-white font-bold'>
                        3
                    </span>
                    <img src={rocketPng} alt="Rocket Icon" className="w-16 h-16 mx-auto mb-6" />
                    <h2 className='text-2xl md:text-3xl font-bold'>Get Started</h2>
                    <p className='text-gray-600 mt-4 leading-relaxed'>
                        Download and start using your <br className="hidden md:block" /> premium tools immediately.
                    </p>
                </div>

            </div>
        </div>
    );
}
export default Steps;