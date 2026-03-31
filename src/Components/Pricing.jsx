import { IoCheckmark } from "react-icons/io5";

function Pricing() {
    return (
        <div className="w-full md:w-4/5 mx-auto mt-16 mb-16 px-4">
    {/* Header Section */}
    <h1 className="text-3xl md:text-5xl text-center font-bold">Simple, Transparent Pricing</h1>
    <p className="mt-4 text-center text-gray-600">Choose the plan that fits your needs. Upgrade or downgrade anytime.</p>

    {/* Responsive Grid: 1 col on mobile, 2 cols on tablet (md), 3 cols on desktop (lg) */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 justify-items-center">

        {/* starter plan */}
        <div className="hover:-translate-y-2 duration-300 w-full max-w-[380px] flex flex-col justify-between border border-[#7823F8] rounded-2xl p-8 bg-white shadow-sm">
            <div>
                <h2 className="text-2xl font-bold mt-4">Starter</h2>
                <p className="mt-3 text-[#666]">Perfect for getting started</p>
                <p className="mt-3 text-[40px] font-bold">$0<span className="text-lg font-semibold text-[#666]">/Month</span></p>

                <ul className="mt-6 space-y-2">
                    <li className="flex flex-row items-center gap-2"><IoCheckmark className="text-green-500 font-bold" /> Access to 10 free tools</li>
                    <li className="flex flex-row items-center gap-2"><IoCheckmark className="text-green-500 font-bold" /> Basic templates</li>
                    <li className="flex flex-row items-center gap-2"><IoCheckmark className="text-green-500 font-bold" /> Community support</li>
                    <li className="flex flex-row items-center gap-2"><IoCheckmark className="text-green-500 font-bold" /> 1 project per month</li>
                </ul>
            </div>
            <button className="font-bold mt-10 w-full bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-full transition hover:opacity-90">
                Get Started for Free
            </button>
        </div>

        {/* pro plan */}
        <div className="hover:-translate-y-2 duration-300 w-full max-w-[380px] relative flex flex-col justify-between overflow-visible bg-linear-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 shadow-xl shadow-purple-200">
            {/* MOST POPULAR TAG */}
            <p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 font-bold text-xs bg-[#FEF3C6] text-amber-900 w-fit rounded-full shadow-md whitespace-nowrap z-10">
                Most Popular
            </p>

            <div>
                <h2 className="text-2xl text-white font-bold mt-4">Pro</h2>
                <p className="mt-3 text-white/90">Best for professionals</p>
                <p className="mt-3 text-[40px] text-white font-bold">$29<span className="text-lg font-semibold text-white">/Month</span></p>

                <ul className="mt-6 space-y-2">
                    <li className="flex text-white flex-row items-center gap-2"><IoCheckmark className="text-white font-bold" /> Access to all premium tools</li>
                    <li className="flex text-white flex-row items-center gap-2"><IoCheckmark className="text-white font-bold" /> Unlimited templates</li>
                    <li className="flex text-white flex-row items-center gap-2"><IoCheckmark className="text-white font-bold" /> Priority support</li>
                    <li className="flex text-white flex-row items-center gap-2"><IoCheckmark className="text-white font-bold" /> Unlimited projects</li>
                    <li className="flex text-white flex-row items-center gap-2"><IoCheckmark className="text-white font-bold" /> Advanced analytics</li>
                </ul>
            </div>
            <button className="font-bold mt-10 w-full bg-white text-purple-600 py-3 px-4 rounded-full hover:bg-gray-50 transition active:scale-95">
                Start Pro Trial
            </button>
        </div>

        {/* enterprise plan */}
        <div className="hover:-translate-y-2 duration-300 w-full max-w-[380px] flex flex-col justify-between border border-[#7823F8] rounded-2xl p-8 bg-white shadow-sm md:col-span-2 lg:col-span-1">
            <div>
                <h2 className="text-2xl font-bold mt-4">Enterprise</h2>
                <p className="mt-3 text-[#666]">For teams and businesses</p>
                <p className="mt-3 text-[40px] font-bold">$99<span className="text-lg font-semibold text-[#666]">/Month</span></p>

                <ul className="mt-6 space-y-2">
                    <li className="flex flex-row items-center gap-2"><IoCheckmark className="text-green-500 font-bold" /> Everything in Pro</li>
                    <li className="flex flex-row items-center gap-2"><IoCheckmark className="text-green-500 font-bold" /> Team collaboration</li>
                    <li className="flex flex-row items-center gap-2"><IoCheckmark className="text-green-500 font-bold" /> Custom integrations</li>
                    <li className="flex flex-row items-center gap-2"><IoCheckmark className="text-green-500 font-bold" /> Dedicated support</li>
                    <li className="flex flex-row items-center gap-2"><IoCheckmark className="text-green-500 font-bold" /> SLA guarantee</li>
                    <li className="flex flex-row items-center gap-2"><IoCheckmark className="text-green-500 font-bold" /> Custom branding</li>
                </ul>
            </div>
            <button className="font-bold mt-10 w-full bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-full transition hover:opacity-90">
                Contact Sales
            </button>
        </div>

    </div>
</div>
    )
}
export default Pricing;