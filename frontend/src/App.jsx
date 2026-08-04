import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, Slide } from "react-toastify";
import Home from "./pages/Home";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageNotFound from "./pages/PageNotFound";
import SearchBar from "./components/SearchBar";
import Network from "./components/Network";
import ForgetPassword from "./pages/ForgetPassword";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import ResendResetLink from "./pages/ResendResetPassword";
// import { products } from "./assets/frontend_assets/assets";

// console.log(products)

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    let timer;

    function handleOnline() {
      setIsOnline(true);
      setShowStatus(true);

      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowStatus(false);
      }, 3000);
    }

    function handleOffline() {
      setIsOnline(false);
      setShowStatus(true);

      clearTimeout(timer);

    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer transition={Slide} />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/resend-forgot-password/:token" element={<ResendResetLink />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>

      {showStatus && (
        <Network>
          {isOnline ? "Back to Online" : "No internet connection"}
        </Network>
      )}

      <Footer />
    </>
  );
}

export default App;
