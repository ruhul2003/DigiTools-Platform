import { useState } from "react";
import data from "../Details.json";
import { FaCheck, FaTrash } from "react-icons/fa";
// 1. Import toast
import { toast } from 'react-toastify';


import img1 from "../../assets/products/1.png";
import img2 from "../../assets/products/2.png";
import img3 from "../../assets/products/3.png";
import img4 from "../../assets/products/4.png";
import img5 from "../../assets/products/5.png";
import img6 from "../../assets/products/6.png";
import img7 from "../../assets/products/7.png";
import img8 from "../../assets/products/8.png";

const imageMap = {
  "1.png": img1, "2.png": img2, "3.png": img3, "4.png": img4,
  "5.png": img5, "6.png": img6, "7.png": img7, "8.png": img8,
};

function Premium({ cartItems, addToCart, removeFromCart, clearCart }) {
  const [showCart, setShowCart] = useState(false);

  const cartData = data.filter((item) => cartItems.includes(item.id));
  const totalPrice = cartData.reduce((acc, item) => acc + item.price, 0);


  const handleAddWithToast = (item) => {
    if (!cartItems.includes(item.id)) {
      addToCart(item.id);
      toast.success(`${item.name} added to cart!`);
    }
  };


  const handleRemoveWithToast = (item) => {
    removeFromCart(item.id);
    toast.error(`${item.name} removed from cart`);
  };


  const handleCheckout = () => {
    if (cartItems.length > 0) {
      toast.info("Purchase Successful! Order processed.", {
        icon: "🚀"
      });
      clearCart();
      setShowCart(false);
    }
  };

  return (
    <div className="w-4/5 mx-auto flex flex-col items-center px-4 md:px-28 py-16">
      
      <h1 className="text-4xl font-bold text-center text-gray-900">Premium Digital Tools</h1>
      <p className="text-gray-600 text-center max-w-xl mt-4 text-sm">
        Choose from our curated collection of premium digital products.
      </p>

      <div className="flex gap-4 mt-8">
        <button onClick={() => setShowCart(false)} className={`px-8 py-2 rounded-full font-medium transition-all ${!showCart ? "bg-purple-600 text-white shadow-lg shadow-purple-200" : "text-gray-700 hover:bg-gray-100"}`}>
          Products
        </button>
        <button onClick={() => setShowCart(true)} className={`px-8 py-2 rounded-full font-medium transition-all ${showCart ? "bg-purple-600 text-white shadow-lg shadow-purple-200" : "border border-gray-300 text-gray-700 hover:bg-gray-100"}`}>
          Cart ({cartItems.length})
        </button>
      </div>

      {showCart ? (
        <div className="mt-12 w-full max-w-5xl border-2 border-cyan-200 rounded-3xl p-6 md:p-10 bg-white shadow-lg shadow-cyan-50">
          <h2 className="text-2xl font-semibold mb-8 text-gray-800">Your Cart</h2>
          {cartItems.length === 0 ? (
            <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-300">Your cart is empty.</div>
          ) : (
            <div className="space-y-6">
              {cartData.map(item => (
                <div key={item.id} className="flex items-center gap-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="p-3 bg-white rounded-lg shadow-sm"><img src={imageMap[item.image]} className="w-10 h-10" alt="" /></div>
                  <div className="grow">
                    <p className="font-semibold text-lg text-gray-900">{item.name}</p>
                    <p className="text-purple-600 font-bold">${item.price}</p>
                  </div>
                  {/* USE handleRemoveWithToast here */}
                  <button onClick={() => handleRemoveWithToast(item)} className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-2">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          {cartItems.length > 0 && (
            <div className="mt-12 pt-8 border-t-2 border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <span className="text-gray-500 font-medium text-lg">Total:</span>
                <span className="text-4xl font-extrabold text-gray-900">${totalPrice}</span>
              </div>
              <button onClick={handleCheckout} className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-purple-700 shadow-xl shadow-purple-200 transition-all active:scale-95">
                Proceed To Checkout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full">
          {data.map((item) => (
            <div key={item.id} className="bg-white flex flex-col justify-between p-6 rounded-2xl shadow-md relative border border-gray-300 hover:-translate-y-2 duration-300">
              <span className="absolute top-4 right-4 text-xs font-semibold bg-yellow-200 px-3 py-1 rounded-full text-gray-800">{item.tag}</span>
              <img src={imageMap[item.image]} alt={item.name} className="w-12 h-12 mb-4" />
              <h2 className="text-xl font-bold mt-3 text-gray-900">{item.name}</h2>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">{item.description}</p>
              <h3 className="text-2xl font-bold mt-4">${item.price}<span className="text-sm text-gray-500 font-normal">/{item.period}</span></h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {item.features.map((f, i) => (<li key={i} className="flex items-center gap-2"><FaCheck className="text-green-500 text-[10px]" /> {f}</li>))}
              </ul>
              
              <button
                onClick={() => handleAddWithToast(item)}
                className={`mt-6 w-full py-3 rounded-xl text-white font-semibold transition-all 
                ${cartItems.includes(item.id) ? "bg-green-500 cursor-default" : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 active:scale-95 shadow-md shadow-purple-100"}`}
              >
                {cartItems.includes(item.id) ? <span className="flex items-center justify-center gap-2"><FaCheck /> Added to Cart</span> : "Buy Now"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Premium;