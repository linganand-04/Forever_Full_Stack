import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import InputForm from "./InputForm";

function Signup() {

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function defalutValue() {
    setName("");
    setEmail("");
    setPassword("");
  }

  async function handleFormSubmitRegister(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
      });

      if (!res.data.success) {
        return toast.error(res.data.message)
      }

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      defalutValue();
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login")

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
        onSubmit={(e) => handleFormSubmitRegister(e)}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl ">
            Sign Up
          </p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        <InputForm
          name={"name"}
          value={name}
          handlers={(e) => setName(e.target.value)}
          important={true}
          style={"border border-gray-800 py-2 px-3 w-full"}
          type={"text"}
          placeholder={"Name"}
        />

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

        <div className={`w-full flex text-sm -mt-2 justify-end`}>
          <p
            onClick={() => navigate("/login")}
            className="cursor-pointer hover:underline transition-all ease-in duration-300"
          >
            Login
          </p>
        </div>

        <button type="submit" className="bg-black text-white px-8 py-2 mt-4 cursor-pointer">
          Sign Up
        </button>
      </form>
    </>
  )
}

export default Signup