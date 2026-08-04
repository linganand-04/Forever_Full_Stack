import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function ResendResetLink() {
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  const actualToken = token.replace("token=", "");

  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleResend = async () => {

    if (loading) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `${backendUrl}/api/user/resend-forgot-password/${actualToken}`
      );

      if (!res.data.success) {
        return toast.error(res.data.message);
      }

      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to resend password reset email."
      );
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4">

      <div className="inline-flex items-center gap-2">
        <p className="prata-regular text-2xl">
          Reset Link Expired
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <p className="text-center text-gray-600">
        This password reset link has expired.
        Click below to receive a new one.
      </p>

      <button
        onClick={handleResend}
        disabled={loading}
        className="w-full bg-black text-white py-3 cursor-pointer"
      >
        {loading ? "Sending..." : "Send New Reset Link"}
      </button>

      <button
        onClick={() => navigate("/login")}
        className="w-full bg-gray-200 py-3 cursor-pointer"
      >
        Back to Login
      </button>

    </div>
  );
}

export default ResendResetLink;