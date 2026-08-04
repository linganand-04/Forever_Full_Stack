import { useState } from "react";

import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { backendURL, currency } from "../context/helper";
import { assets } from "../assets/assets";
import { Commet } from "react-loading-indicators";

function Orders(token) {
  const userLocale = navigator.language;
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");

  const fetchAllOrder = async () => {
    if (!token) return;
    try {
      const res = await axios.post(
        `${backendURL}/api/order/list`,
        {},
        { headers: token },
      );
      if (res.data.success) {
    
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    if (!token) return;
    try {
      const res = await axios.post(
        `${backendURL}/api/order/status`,
        { orderId, status: e.target.value },
        { headers: token },
      );
      if (res.data.success) {
        await fetchAllOrder();
        setStatus(e.target.value);
       
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, [token]);

  return (
    <>
      <div>
        <h3>Order Page</h3>
        {orders.length > 0 ? (
          orders.map((order, i) => {
            return (
              <div
                className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
                key={i}
              >
                <img
                  className="w-12"
                  src={assets.parcel_icon}
                  alt="Parcel icon"
                />
                <div>
                  {order.items.map((item, index) => (
                    <p key={item._id || index} className="py-0.5">
                      {item.name} x {item.quantity} <span>{item.size}</span>
                      {index !== order.items.length - 1 && ","}
                    </p>
                  ))}

                  <p className="mt-3 mb-2 font-medium">
                    {order.address.firstname} {order.address.lastname}
                  </p>
                  <p>
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country} , {order.address.zipcode}
                  </p>
                  <p>{order.address.phone}</p>
                </div>

                <div>
                  <p className="text-sm sm:text-[15px]">
                    Items : {order.items.length}
                  </p>
                  <p className="mt-3">Method : {order.paymentMethod}</p>
                  <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                  <p>
                    Date :{" "}
                    {new Date(order.date).toLocaleDateString(userLocale, {
                      month: "short",
                      year: "numeric",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <p className="text-sm sm:text-[15px]">
                  {currency}
                  {order.amount}
                </p>

                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className="p-2 font-semibold"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            );
          })
        ) : (
          <div className="mx-auto flex items-center justify-center mt-15">
            No orders found
          </div>
        )}
      </div>
    </>
  );
}

export default Orders;
