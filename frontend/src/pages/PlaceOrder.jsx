import { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import InputForm from "./InputForm";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

function PlaceOrder() {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [method, setmethod] = useState("cod");

  const [formData, setFromData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFromData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            response,
            { headers: { token } },
          );

          if (data.success) {
            setCartItems({});
            navigate("/orders");
          }
        } catch (err) {
          toast.error(err.message);
          console.error(err.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const productMap = new Map(products.map((p) => [p._id, p]));

      const orderItems = Object.entries(cartItems).flatMap(
        ([productId, sizes]) => {
          const product = productMap.get(productId);
          if (!product) return [];

          return Object.entries(sizes)
            .filter(([, qty]) => qty > 0)
            .map(([size, quantity]) => ({
              ...product,
              size,
              quantity,
            }));
        },
      );

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      console.log(orderItems);

      switch (method) {
        // API Calls for COD
        case "cod": {
          let res = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } },
          );

          if (res.data.success) {
            console.log(res);
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(res.data.message);
          }
          break;
        }

        // API Calls for Stripe
        case "stripe": {
          let res = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { token } },
          );

          if (res.data.success) {
            const { session_url } = res.data;
            console.log(session_url);
            window.location.replace(session_url);
          } else {
            toast.error(res.data.message);
          }

          break;
        }

        case "razorpay": {
          // Temp
          // const res = await axios.post(
          //   `${backendUrl}/api/order/razorpay`,
          //   orderData,
          //   { headers: { token } },
          // );

          // if (res.data.success) {
          //   initPay(res.data.order);
          // } else {
          //   toast.error(res.data.message);
          // }

          toast.warning("Temporary unavailable");
          break;
        }

        default:
          break;
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err.message);
    }
  };

  const data = Object.entries(cartItems).length > 0;

  useEffect(() => {
    token ? "" : navigate("/login");
  }, [token, navigate]);

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row justify-between gap-5 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-200"
      >
        {/* ----- Delivery Form ----- */}
        <div className="flex flex-col gap-4 w-full sm:max-w-120">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          {/* First & Last Name */}
          <div className="flex gap-3">
            <InputForm
              name={"firstname"}
              value={formData.firstname}
              style={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
              type={"text"}
              placeholder={"First name"}
              important={true}
              handlers={onChangeHandler}
            />
            <InputForm
              name={"lastname"}
              value={formData.lastname}
              important={true}
              style={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
              type={"text"}
              placeholder={"Last name"}
              handlers={onChangeHandler}
            />
          </div>
          {/* Email */}
          <div className="flex gap-3">
            <InputForm
              name={"email"}
              value={formData.email}
              important={true}
              style={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
              type={"email"}
              placeholder={"Email address"}
              handlers={onChangeHandler}
            />
          </div>
          {/* Street */}
          <div className="flex gap-3">
            <InputForm
              name={"street"}
              value={formData.street}
              important={true}
              style={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
              type={"text"}
              placeholder={"Street"}
              handlers={onChangeHandler}
            />
          </div>
          {/* City & state */}
          <div className="flex gap-3">
            <InputForm
              name={"city"}
              value={formData.city}
              important={true}
              style={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
              type={"text"}
              placeholder={"City"}
              handlers={onChangeHandler}
            />
            <InputForm
              name={"state"}
              value={formData.state}
              important={true}
              style={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
              type={"text"}
              placeholder={"State"}
              handlers={onChangeHandler}
            />
          </div>
          {/* Zipcode & Country */}
          <div className="flex gap-3">
            <InputForm
              name={"zipcode"}
              value={formData.zipcode}
              important={true}
              style={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
              type={"tel"}
              placeholder={"Zipcode"}
              handlers={onChangeHandler}
              length={10}
            />

            <InputForm
              name={"country"}
              value={formData.country}
              important={true}
              style={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
              type={"text"}
              placeholder={"Country"}
              handlers={onChangeHandler}
            />
          </div>
          {/* Phone */}
          <div className="flex gap-3">
            <InputForm
              name={"phone"}
              value={formData.phone}
              important={true}
              style={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
              type={"number"}
              placeholder={"Phone"}
              handlers={onChangeHandler}
            />
          </div>
        </div>

        {/* Payment */}
        {data && (
          <div className="mt-8">
            <div className="mt-8 min-w-80">
              <CartTotal />
            </div>

            <div className="mt-12">
              <Title text1={"PAYMENT"} text2={"METHOD"} />

              {/* Payment Method */}
              <div className="flex flex-col gap-3 lg:flex-row">
                <div
                  onClick={() => setmethod("stripe")}
                  className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full border-gray-300 ${
                      method === "stripe" ? "bg-green-400" : ""
                    }`}
                  ></p>
                  <img className="h-5 mx-4 " src={assets.stripe_logo} alt="" />
                </div>

                <div
                  onClick={() => setmethod("razorpay")}
                  className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full border-gray-300 ${
                      method === "razorpay" ? "bg-green-400" : ""
                    }`}
                  ></p>
                  <img
                    className="h-5 mx-4 "
                    src={assets.razorpay_logo}
                    alt=""
                  />
                </div>
                <div
                  onClick={() => setmethod("cod")}
                  className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full border-gray-300 ${
                      method === "cod" ? "bg-green-400" : ""
                    }`}
                  ></p>
                  <p className="text-gray-500 font-medium text-sm mx-4">
                    CASH ON DELIVERY
                  </p>
                </div>
              </div>

              <div className="w-full text-end mt-8">
                <button className="bg-black text-white cursor-pointer px-16 py-3 text-sm">
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default PlaceOrder;
