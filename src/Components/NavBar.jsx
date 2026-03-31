import { CiShoppingCart } from "react-icons/ci";

function Navbar() {
    return (
        <div className="navbar w-full lg:w-4/5 mx-auto px-4 md:px-0">
            <div className="navbar-start flex items-center">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                             className="h-6 w-6" fill="none" 
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        <li className="text-[18px]"><a>Products</a></li>
                        <li className="text-[18px]"><a>Features</a></li>
                        <li className="text-[18px]"><a>Pricing</a></li>
                        <li className="text-[18px]"><a>Testimonials</a></li>
                        <li className="text-[18px]"><a>FAQ</a></li>
                    </ul>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-[#7823F8] whitespace-nowrap">
                    DigiTools
                </h1>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal text-[18px] font-semibold px-1 gap-2">
                    <li><a className="text-[18px]">Products</a></li>
                    <li><a className="text-[18px]">Features</a></li>
                    <li><a className="text-[18px]">Pricing</a></li>
                    <li><a className="text-[18px]">Testimonials</a></li>
                    <li><a className="text-[18px]">FAQ</a></li>
                </ul>
            </div>

            <div className="navbar-end gap-2 md:gap-4">
                <div className="p-2 cursor-pointer">
                    <CiShoppingCart size={24} />
                </div>
                <a className="hidden lg:block text-[18px] font-semibold cursor-pointer">Login</a>
                <a className="btn btn-sm md:btn-md bg-[#7823F8] text-white border-2 border-[#7823F8] rounded-full hover:bg-white hover:text-[#7823F8] transition-colors duration-300">
                    Get Started
                </a>
            </div>
        </div>
    );
}

export default Navbar;