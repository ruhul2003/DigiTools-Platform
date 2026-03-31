import { useState } from 'react';
import './App.css';
import Banner from './Components/Banner';
import Navbar from './Components/NavBar';
import Premium from './Components/Premium'; 
import Ratings from './Components/Ratings';

// 1. Import Toastify components
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Steps from './Components/Steps';
import Pricing from './Components/Pricing';
import Ready from './Components/Ready';
import Footer from './Components/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (id) => {
    if (!cartItems.includes(id)) {
      setCartItems([...cartItems, id]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(itemId => itemId !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <Navbar cartCount={cartItems.length} />
      <Banner />
      <Ratings />
      <Premium 
        cartItems={cartItems} 
        addToCart={addToCart} 
        removeFromCart={removeFromCart} 
        clearCart={clearCart}
      />

        {/* Toast Container for notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Steps/>
      <Pricing/>
      <Ready/>
      <Footer/>
    </>
  );
}

export default App;