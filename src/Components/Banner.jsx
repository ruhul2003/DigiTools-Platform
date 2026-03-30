import bannerImg from "../../assets/banner.png";
import { IoMdRadioButtonOn } from "react-icons/io";
import { IoPlayOutline } from "react-icons/io5";




function Banner() {
    return (
        <div className="bg-[#FBFBFB] w-4/5 mx-auto flex flex-row lg:flex-row items-center justify-between gap-6 py-10 mt-10">
            <div className="flex flex-col gap-6 max-lg:gap-4">
                <p className="flex items-center w-fit flex-row gap-2 px-4 py-2 text-[#7823F8] text-[16px] bg-[#dac8f5] rounded-full text-sm font-semibold"> <IoMdRadioButtonOn /> New : AI Powered Tools Are Available</p>
                <h1 className="text-7xl font-bold mt-6 leading-[1.3] max-lg:text-4xl">Supercharge Your <br /> Digital Workflow</h1>
                <p className="mt-4 text-[18px] max-lg:text-[16px]">Access premium AI tools, design assets, templates, and productivity 
                    software—all in one place. Start creating faster and more efficiently. Explore Products.</p>
                
                <div className="flex flex-row sm:flex-row gap-4 mt-6">
                    <button className="bg-[#7823F8] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#6a1bd1] transition-colors">Explore Products</button>
                    <button className="flex flex-row items-center border border-[#7823F8] text-[#7823F8] px-6 py-3 rounded-full font-semibold hover:bg-[#7823F8] hover:text-white transition-colors"><IoPlayOutline className="mr-2" /> Watch Demo</button>
                </div>
            </div>

            <div>
                <img className="max-sm:hidden" src={bannerImg} alt="Banner Image" />
            </div>
        </div>
    )
}

export default Banner;