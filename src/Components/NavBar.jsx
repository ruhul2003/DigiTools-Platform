import { CiShoppingCart } from "react-icons/ci";

function Navbar() {
    return (
        <div className="navbar w-4/5 mx-auto ">
            
            {/* Left Section */}
            <div className="navbar-start">
                
                {/* Mobile Dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                             className="h-5 w-5" fill="none" 
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>

                    {/* Mobile Menu */}
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        <li className="text-[18px]">Products</li>
                        <li className="text-[18px]">Features</li>
                        <li className="text-[18px]">Pricing</li>
                        <li className="text-[18px]">Testimonials</li>
                        <li className="text-[18px]">FAQ</li>
                    </ul>
                </div>

                {/* Logo */}
                <h1 className=" text-4xl font-bold text-[#7823F8]">
                    DigiTools
                </h1>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    <li><a className="text-[18px]">Products</a></li>
                    <li><a className="text-[18px]">Features</a></li>
                    <li><a className="text-[18px]">Pricing</a></li>
                    <li><a className="text-[18px]">Testimonials</a></li>
                    <li><a className="text-[18px]">FAQ</a></li>
                </ul>
            </div>

            {/* Right Section */}
            <div className="navbar-end gap-4">
                <CiShoppingCart size={24} />
                <a>Login</a>
                <a className="btn bg-[#7823F8] text-white border-2 border-[#7823F8] rounded-full hover:bg-white hover:text-[#7823F8]">
                    Get Started
                </a>
            </div>

        </div>
    );
}

export default Navbar;