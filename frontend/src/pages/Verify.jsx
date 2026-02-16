import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Verify() {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const verifyPayement = async () => {
      try {
        if (!token) return null;
        const res = await axios.post(
          `${backendUrl}/api/order/verifyStripe`,
          {
            success,
            orderId,
          },
          { headers: { token } },
        );

        console.log(res);

        if (res.data.success) {
          setCartItems({});
          navigate("/orders");
        } else {
          navigate("/cart");
        }
      } catch (err) {
        console.log(err);
        toast.error(err);
      }
    };

    verifyPayement();
  }, [token, backendUrl, orderId, success, navigate, setCartItems]);

  return <></>;
}

export default Verify;
