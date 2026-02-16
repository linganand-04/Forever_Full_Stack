import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

function Cart() {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = Object.entries(cartItems).flatMap(([productId, sizes]) =>
        Object.entries(sizes)
          .filter(([_, quantity]) => quantity > 0)
          .map(([size, quantity]) => ({
            _id: productId,
            size,
            quantity,
          })),
      );

      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <>
      <div className="pt-14 border-t">
        <div className="text-2xl mb-3">
          <Title text1="YOUR" text2="CART" />
        </div>

        <div>
          {cartData.length > 0 ? (
            cartData.map((item, i) => {
              let productData = products.find(
                (product) => product._id === item._id,
              );
              // console.log(productData);

              return (
                <div
                  key={i}
                  className="py-4 border-t border-gray-400 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <img
                      src={productData?.image[0]}
                      className="w-16 sm:w-20"
                      alt={productData?.name}
                    />
                    <div>
                      <p className="text-sm sm:text-lg font-medium">
                        {productData?.name}
                      </p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>
                          {currency} {productData?.price}
                        </p>

                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 border-gray-300">
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  <input
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(item._id, item.size, +e.target.value)
                    }
                    className="border border-gray-300 sm:max-w-15 max-w-12 py-1 sm:px-2 px-2.5"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />

                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                    src={assets.bin_icon}
                    alt=""
                  />
                </div>
              );
            })
          ) : (
            <div>
              <h2 className="text-lg text-center mt-15 sm:mt-20">
                Cart is Empty
              </h2>
            </div>
          )}
        </div>

        {cartData.length > 0 && (
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-112.5">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/placeorder")}
                  className="bg-black text-sm text-white px-8 py-3 mt-8 tracking-wide uppercase cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
