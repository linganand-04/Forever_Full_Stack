import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "../src/pages/Login";
import SideBar from "./components/SideBar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { useEffect, useState } from "react";
import NotFound from "./components/NotFound";
import Welcome from "./components/Welcome";
import { Slide, ToastContainer } from "react-toastify";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Slide}
        />
        {token !== "" ? (
          <>
            <Navbar setToken={setToken} navigate={navigate} />
            <hr className="border-gray-200" />
            <div className="w-full flex">
              <SideBar />
              <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                <Routes>
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                  <Route path="/" element={<Welcome token={token} />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <>
            <Routes>
              <Route path={"/"} element={<Login setToken={setToken} />} />
              <Route path="*" element={<NotFound token={token} />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
}

export default App;
