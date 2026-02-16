import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useState } from "react";
import axios from "axios";
import { Commet } from "react-loading-indicators";

function Orders() {
  const { backendUrl, token, currency, cartItems, navigate } =
    useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const userLocale = navigator.language; // e.g. "en-IN"

  const formatted = (date) => {
    return new Date(date).toLocaleDateString(userLocale, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const res = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } },
      );

      if (res.data.success) {
        let allOrderItems = [];
        res.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItems.push(item);
          });
        });
        setOrderData(allOrderItems.reverse());
      }

      console.log(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    token ? "" : navigate("/login");

    loadOrderData();
    // if (orderData.length === 0) return navigate("/");
  }, [token]);

  return (
    <>
      <div className="border-t border-gray-200 pt-16">
        <div className="text-2xl">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>

        <div>
          {orderData.length > 0 ? (
            orderData.map((item, i) => {
              return (
                <div
                  className="border-b border-gray-200 py-4 text-gray-700 flex flex-col md:flex-row md:justify-between gap-4"
                  key={i}
                >
                  <div className="flex items-start gap-6 text-sm">
                    <img
                      className="w-16 sm:w-20 "
                      src={item?.image[0]}
                      alt={item?.name}
                    />

                    <div>
                      <p className="sm:text-base font-medium ">{item?.name}</p>
                      <div className="flex items-center gap-3 mt-2 text-base text-gray-700 ">
                        <p className="">
                          {currency} {item?.price}
                        </p>

                        <p>Quantity: {item?.quantity} </p>

                        <p>Size: {item?.size} </p>
                      </div>
                      <p className="mt-1">
                        Date :{" "}
                        <span className="text-gray-400">
                          {formatted(item.date)}
                          {/* {new Date(item.date).toDateString()} */}
                        </span>
                      </p>
                      <p className="mt-1">
                        Payment :{" "}
                        <span className="text-gray-400">
                          {item.paymentMethod}{" "}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="md:w-1/2 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <p className="min-w-2 h-2 rounded-full bg-green-400"></p>
                      <p className="text-sm md:text-base">{item.status}</p>
                    </div>

                    <div
                      onClick={loadOrderData}
                      className="border border-gray-200 cursor-pointer py-2 px-4 text-sm font-medium rounded-sm"
                    >
                      Track Order
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="mx-auto flex items-center justify-center my-5">
              <p>No orders </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Orders;
