/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import InputForm from "./InputForm";
import { toast } from "react-toastify";
import { useEffect } from "react";

function ResetPassword() {
  const { token } = useParams();

  const actualToken = token.replace("token=", "");

  const navigate = useNavigate();

  const [checkingToken, setCheckingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8 || password.length > 20) {
      toast.error("Password must be 8–20 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/api/user/reset-password/${actualToken}`,
        {
          password,
        }
      );


      if (!res.data.success) {
        return toast.error(res.data.message)
      }

      toast.success("Password reset successfully");

      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (actualToken.length !== 63) {
      toast.error("Invalid reset token.");
      setCheckingToken(false);
      return
    }

    const verifyToken = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/user/verify-reset-token/${actualToken}`
        );


        if (!res.data.success) {
          toast.error(
            res.data?.message,
            { autoClose: 2500 }
          );

          setTokenValid(false);

          // Redirect after 3 seconds
          setTimeout(() => {
            navigate(`/resend-forgot-password/token=${actualToken}`);
          }, 3000);

          return
        }


        setTokenValid(true);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Invalid or expired reset link",

        );



      } finally {
        setCheckingToken(false);
      }
    };

    verifyToken();
  }, [actualToken]);

  return (

    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-2xl">
            Reset Password
          </p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        <InputForm
          name={"password"}
          value={password}
          handlers={(e) => setPassword(e.target.value)}
          important={true}
          style={"border border-gray-800 py-2 px-3 w-full"}
          type={"password"}
          placeholder={"New Password"}
        />

        <InputForm
          name={"confirmpassword"}
          value={confirmPassword}
          handlers={(e) => setConfirmPassword(e.target.value)}
          important={true}
          style={"border border-gray-800 py-2 px-3 w-full"}
          type={"password"}
          placeholder={"Confirm Password"}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 cursor-pointer"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>


      </form>

      <button
        onClick={() => navigate("/login")}
        className="flex justify-center w-[90%] sm:max-w-96 mx-auto mt-4 bg-gray-200 text-black py-3 cursor-pointer"
      >
        Back to Login
      </button>
    </>

  );
};

export default ResetPassword;