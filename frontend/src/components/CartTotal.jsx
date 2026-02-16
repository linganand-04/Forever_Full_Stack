import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  return (
    <>
      <div className="w-full">
        <div className="text-2xl">
          <Title text1={"CART"} text2={"TOTALS"} />
        </div>

        <div className="flex flex-col gap-2 mt-2 text-sm">
          {/* SubTotal */}
          <div className="flex justify-between ">
            <p className="">Subtotal</p>
            <p>
              {currency} {getCartAmount()}.00
            </p>
          </div>
          <hr className="border-gray-200" />
          {/* Delivery */}
          <div className="flex justify-between ">
            <p className="">Shipping Fee</p>
            <p>
              {currency} {delivery_fee}.00
            </p>
          </div>
          <hr className="border-gray-200" />
          {/* Total */}
          <div className="flex justify-between font-bold">
            <p className="">Total</p>
            <p>
              {currency} {delivery_fee + getCartAmount()}.00
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartTotal;
