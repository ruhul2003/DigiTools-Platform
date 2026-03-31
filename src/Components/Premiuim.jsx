import data from "../Details.json";

import img1 from "../../assets/products/1.png";
import img2 from "../../assets/products/2.png";
import img3 from "../../assets/products/3.png";
import img4 from "../../assets/products/4.png";
import img5 from "../../assets/products/5.png";
import img6 from "../../assets/products/6.png";
import img7 from "../../assets/products/7.png";
import img8 from "../../assets/products/8.png";

const imageMap = {
  "1.png": img1,
  "2.png": img2,
  "3.png": img3,
  "4.png": img4,
  "5.png": img5,
  "6.png": img6,
  "7.png": img7,
  "8.png": img8,
};

function Premium() {
  const countCart = 0;

  return (
    <div className="w-4/5 mx-auto flex flex-col items-center px-28 py-16">

      {/* Title */}
      <h1 className="text-4xl font-bold text-center">
        Premium Digital Tools
      </h1>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="px-6 py-2 bg-purple-600 text-white rounded-full">
          Products
        </button>
        <button className="px-6 py-2 border rounded-full">
          Cart ({countCart})
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6 mt-10 w-full">

        {data.map((item) => (
          <div key={item.id} className="bg-white flex flex-col justify-between p-6 rounded-2xl shadow-md relative">

            {/* Tag */}
            <span className="absolute text-xs font-semibold top-4 right-4 bg-yellow-200 px-3 py-1 rounded-full">
              {item.tag}
            </span>

            {/* Image */}
            <img
              src={imageMap[item.image]}
              alt={item.name}
              className="w-8 h-8 mb-4"
            />

            

            {/* Title */}
            <h2 className="text-xl font-bold mt-3">
              {item.name}
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-sm mt-2">
              {item.description}
            </p>

            {/* Price */}
            <h3 className="text-2xl font-bold mt-4">
              ${item.price}
              <span className="text-sm text-gray-500">
                /{item.period}
              </span>
            </h3>

            {/* Features */}
            <ul className="mt-4 space-y-1">
              {item.features.map((f, i) => (
                <li key={i}>✔ {f}</li>
              ))}
            </ul>

            {/* Button */}
            <button className="mt-6 w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full">
              Buy Now
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Premium;