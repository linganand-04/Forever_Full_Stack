import axios from "axios";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import InputForm from "./InputForm";
import { toast } from "react-toastify";

function ForgetPassword() {

  const { backendUrl, navigate } = useContext(ShopContext)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleForgotPassword(e) {
    if (loading) {
      return
    }
    setLoading(true)
    e.preventDefault();

    try {
      const res = await axios.post(`${backendUrl}/api/user/forgot-password`, {
        email,
      });


      if (!res.data.success) {
        setEmail("")
        toast.error(res.data.message)
        return
      }

      setEmail("")
      toast.success(res.data.message)

    } catch (err) {
    
      toast.error(err?.reponse?.data?.message || err?.message)
    }

  }


  return (
    <>
      <form
        onSubmit={(e) => handleForgotPassword(e)}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >

        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-2xl">
            Request Password Reset
          </p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        <p>Enter your email address and we'll send you a link to reset your password.</p>

        <InputForm
          name={"email"}
          value={email}
          handlers={(e) => setEmail(e.target.value)}
          important={true}
          style={"border border-gray-800 py-2 px-3 w-full"}
          type={"email"}
          placeholder={"Email"}
        />
        <button disabled={loading} type="submit" className="w-full bg-black text-white py-3 cursor-pointer">
          Send reset link
        </button>
      </form>

      <button
        onClick={() => navigate("/login")}
        className="flex justify-center w-[90%] sm:max-w-96 mx-auto mt-4 bg-gray-200 text-black py-3 cursor-pointer"
      >
        Back to Login
      </button>
    </>
  )
}

export default ForgetPassword