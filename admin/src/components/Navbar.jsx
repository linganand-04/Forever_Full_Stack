import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Navbar({ setToken, navigate }) {
  return (
    <>
      <div className="flex justify-between items-center py-2 px-[4%]">
        <NavLink className="w-[max(10%,80px)] bg-transparent focus:outline-0" to={"/"}>
          <img src={assets.logo} alt={"Logo"} />
        </NavLink>
        <button
          onClick={() => {
            setToken("");
            navigate("/");
          }}
          className="cursor-pointer bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
        >
          Logout
        </button>
      </div>
    </>
  );
}
