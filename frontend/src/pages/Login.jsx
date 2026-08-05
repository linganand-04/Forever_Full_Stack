import { useContext, useEffect, useState } from "react";
import InputForm from "./InputForm";
import { ShopContext } from "../context/ShopContext";
import { toast, Bounce } from "react-toastify";
import axios from "axios";

function Login() {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function defalutValue() {
    setEmail("");
    setPassword("");
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
      }

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      defalutValue();


    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl ">
            Login
          </p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        <InputForm
          name={"email"}
          value={email}
          handlers={(e) => setEmail(e.target.value)}
          important={true}
          style={"border border-gray-800 py-2 px-3 w-full"}
          type={"email"}
          placeholder={"Email"}
        />
        <InputForm
          name={"password"}
          value={password}
          handlers={(e) => setPassword(e.target.value)}
          important={true}
          style={"border border-gray-800 py-2 px-3 w-full relative"}
          type={"password"}
          placeholder={"Password"}
        />

        <div className={`w-full flex text-sm -mt-2 justify-between`}>
          <p onClick={() => navigate("/forgot-password")} className="cursor-pointer hover:underline transition-all ease-in duration-300">Forgot your password ?</p>


          <p
            onClick={() => navigate("/signup")}
            className="cursor-pointer hover:underline transition-all ease-in duration-300"
          >
            Create account
          </p>

        </div>

        <button type="submit" className="bg-black text-white px-8 py-2 mt-4 cursor-pointer">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
