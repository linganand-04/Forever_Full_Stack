import { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    setCartItems,
    token,
    setToken,
  } = useContext(ShopContext);

  // console.log(getCartCount());

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  }

  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <div className="flex justify-between items-center py-5 font-medium">
          <NavLink className="bg-white" title="Logo" to="/">
            <img src={assets.logo} className="w-36" alt="Logo" />{" "}
          </NavLink>

          <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
            <NavLink
              to="/"
              className="flex flex-col items-center gap-1 uppercase"
            >
              <p>Home</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink
              to="/collection"
              className="flex flex-col items-center gap-1 uppercase"
            >
              <p>Collection</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink
              to="/about"
              className="flex flex-col items-center gap-1 uppercase"
            >
              <p>About</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink
              to="/contact"
              className="flex flex-col items-center gap-1 uppercase"
            >
              <p>Contact</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          </ul>

          <div className="flex items-center justify-center gap-6">
            <NavLink to={"/collection"}>
              <img
                onClick={() => {
                  setShowSearch(true);
                }}
                src={assets.search_icon}
                className=" cursor-pointer w-5"
                alt=""
              />
            </NavLink>

            <div className="group relative">
              <Link to={"/login"}>
                <img
                  onClick={() => {
                    token ? null : navigate("/login");
                  }}
                  src={assets.profile_icon}
                  className=" cursor-pointer w-5"
                  alt=""
                />
              </Link>

              {/* Dropdown Menu */}
              {token && (
                <div className="group-hover:block hidden absolute pt-4 dropdown-menu right-0">
                  <div className="flex flex-col items-center w-36 gap-2 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                    <p className="cursor-pointer hover:text-black">
                      My Profile
                    </p>
                    <p className="cursor-pointer hover:text-black">
                      <NavLink to={"/orders"}>Orders</NavLink>
                    </p>
                    <p
                      onClick={logout}
                      className="cursor-pointer hover:text-black"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Link to="/cart" className="relative">
              <img
                className=" cursor-pointer w-5 min-w-5"
                src={assets.cart_icon}
                alt=""
              />

              {getCartCount() > 0 && (
                <p className="absolute -right-1.25 -bottom-1.25 text-center w-4 leading-4 rounded-full bg-black text-white aspect-square text-[8px] ">
                  {getCartCount()}
                </p>
              )}
            </Link>

            <img
              onClick={() => {
                setVisible(true);
              }}
              className=" sm:hidden cursor-pointer w-5 min-w-5"
              src={assets.menu_icon}
              alt=""
            />
          </div>

          {/* SideBar Menu for small screens */}
          <div
            className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
              visible ? "w-full" : "w-0"
            } `}
          >
            <div className="flex flex-col text-gray-600">
              <div
                onClick={() => {
                  setVisible(false);
                }}
                className="flex items-center gap-4 p-3 cursor-pointer"
              >
                <img
                  src={assets.dropdown_icon}
                  className=" h-4 rotate-180"
                  alt=""
                />
                <p>Back</p>
              </div>

              <NavLink
                onClick={() => setVisible(false)}
                className="pl-6 py-2"
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="pl-6 py-2"
                to="/collection"
              >
                Collection
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="pl-6 py-2"
                to="/about"
              >
                About
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="pl-6 py-2"
                to="/contact"
              >
                Contact
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
