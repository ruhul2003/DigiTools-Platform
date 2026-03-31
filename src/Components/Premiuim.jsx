import data from "../Details.json"; // import JSON

function Premium() {
    const countCart = 0;

    return (
        <div className="w-4/5 mx-auto flex flex-col items-center justify-center px-28 py-16 mb-6">

            {/* Heading */}
            <h1 className="text-5xl font-bold text-black text-center">
                Premium Digital Tools
            </h1>

            <p className="mt-4 text-black text-[16px] text-center">
                Choose from our curated collection of premium digital products
            </p>

            {/* Buttons */}
            <div className="flex flex-row gap-4">
                <button className="mt-6 px-8 py-3 bg-[#7823F8] text-white font-semibold rounded-full">
                    Products
                </button>

                <button className="mt-6 px-8 py-3 bg-white text-black border rounded-full">
                    Cart ({countCart})
                </button>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-3 gap-6 mt-10 w-full">

                {
                    data.map((item) => (
                        <div key={item.id} className="p-6 bg-white flex flex-col justify-between rounded-2xl shadow-md">

                            {/* Tag */}
                            <span className="text-xs w-fit px-3 py-1 bg-yellow-200 rounded-full">
                                {item.tag}
                            </span>

                            {/* Title */}
                            <h2 className="text-xl font-bold mt-4">
                                {item.name}
                            </h2>

                            {/* Description */}
                            <p className="text-gray-500 mt-2 text-sm">
                                {item.description}
                            </p>

                            {/* Price */}
                            <h3 className="text-2xl font-bold mt-4">
                                ${item.price}
                                <span className="text-sm text-gray-500">
                                    /{item.period === "monthly" ? "Mo" : item.period}
                                </span>
                            </h3>

                            {/* Features */}
                            <ul className="mt-4 space-y-2">
                                {
                                    item.features.map((feature, index) => (
                                        <li key={index} className="text-sm text-gray-600">
                                            ✔ {feature}
                                        </li>
                                    ))
                                }
                            </ul>

                            {/* Button */}
                            <button className="mt-6 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full">
                                Buy Now
                            </button>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default Premium;