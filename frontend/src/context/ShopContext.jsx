import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItem")) || {};
  });

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size", {
        transition: Slide,
      });
      return;
    }

    setCartItems((prev) => {
      const cartData = structuredClone(prev);

      if (cartData[itemId]) {
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
      } else {
        cartData[itemId] = { [size]: 1 };
      }

      return cartData;
    });

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } },
        );
      } catch (err) {
        console.error(err.message);
        toast.error(err.message);
      }
    }
  };

  const getCartCount = (token) => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (err) {
          console.error(err);
        }
      }
    }

    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    // Always update state using previous value (avoids race conditions)
    setCartItems((prev) => {
      const cartData = structuredClone(prev);

      // Ensure item object exists
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }

      if (quantity <= 0) {
        delete cartData[itemId][size];

        // Remove item if no sizes left
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      } else {
        cartData[itemId][size] = quantity;
      }

      return cartData;
    });

    // Sync with backend
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } },
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to update cart");
      }
    }
  };

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [productId, sizes]) => {
      const product = products.find((p) => p._id === productId);

      if (!product) return total;

      const productTotal = Object.values(sizes).reduce(
        (sum, quantity) => sum + quantity * product.price,
        0,
      );

      return total + productTotal;
    }, 0);
  };

  // Getting Products
  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (!res.data.success) return toast.error(res.data.message);
      const { products } = res.data;
      // console.log(products);
      setProducts(products);
    } catch (err) {
      toast.error(err.message);
      console.error(err.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } },
      );

      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProductsData();
    localStorage.setItem("cartItem", JSON.stringify(cartItems));

    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
      getCartCount(localStorage.getItem("token"))
    }
  }, [cartItems, token, getProductsData, getCartAmount, getCartCount]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
