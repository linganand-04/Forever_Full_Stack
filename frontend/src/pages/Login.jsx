import { useContext, useEffect, useState } from "react";
import InputForm from "./InputForm";
import { ShopContext } from "../context/ShopContext";
import { toast, Bounce } from "react-toastify";
import axios from "axios";

function Login() {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function defalutValue() {
    setName("");
    setEmail("");
    setPassword("");
  }

  function handleName(e) {
    setName(e.target.value);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const res = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (res.data.sucesss) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          // defalutValue();
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (res.data.success) {
          console.log(res.data);
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
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (err) {
      console.error(err.response.data.message);
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl ">
            {currentState === "Login" ? "Login" : "Sign Up"}
          </p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {currentState === "Login" ? (
          ""
        ) : (
          <InputForm
            name={"name"}
            value={name}
            handlers={(e) => setName(e.target.value)}
            important={true}
            style={"border border-gray-800 py-2 px-3 w-full"}
            type={"text"}
            placeholder={"Name"}
          />
        )}
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
          style={"border border-gray-800 py-2 px-3 w-full"}
          type={"password"}
          placeholder={"Password"}
        />

        <div className="w-full flex justify-between text-sm -mt-2">
          <p className="cursor-pointer">Forgot your password ?</p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer"
            >
              Login Here
            </p>
          )}
        </div>

        <button className="bg-black text-white px-8 py-2 mt-4 cursor-pointer">
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </>
  );
}

export default Login;
