import { useState } from "react";
import { backendURL } from "../context/helper";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("admin@Lian.com");
  const [password, setPassword] = useState("qwerty123");
  const [show, setshow] = useState(false);

  function handleShowPassword(e) {
    e.preventDefault();

    setshow((prev) => !prev);
  }

  async function onSubmitHandler(e) {
    try {
      e.preventDefault();

      const res = await axios.post(`${backendURL}/api/user/admin`, {
        email,
        password,
      });
      console.log(res);

      if (res.data.success) {
        const { token } = await res.data;
        console.log(token)
        setToken(token);
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch {
      toast.error("Invalid credentials");
    }
  }

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className="Toastify"></div>
        <div className="min-h-screen flex items-center justify-center w-full">
          <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <form onSubmit={(e) => onSubmitHandler(e)}>
              <div className="mb-3 min-w-72">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </p>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                  type="email"
                  placeholder="your@email.com"
                  required={true}
                  value={email}
                />
              </div>
              <div className="mb-3 min-w-72 relative">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Password
                </p>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className=" rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  required={true}
                  value={password}
                />
                <button
                  onClick={(e) => handleShowPassword(e)}
                  className="absolute bottom-[12%] right-[4%] cursor-pointer flex items-center"
                >
                  {password.length === 0 ? "" : show ? "hide" : "show"}
                </button>
              </div>
              <button
                className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black cursor-pointer"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
