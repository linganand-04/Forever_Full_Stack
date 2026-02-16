import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const location = useLocation();
  const visible = location.pathname === "/collection";

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape" && showSearch && visible) {
        setShowSearch(false);
      }
    }

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showSearch, visible, setShowSearch]);

  return showSearch && visible ? (
    <>
      <div className="border-y bg-gray-50 text-center ">
        <div className="inline-flex text-start items center justify-center border border-gray-400 px-5 py-2 rounded-full w-3/4 sm:w-1/2 m-3">
          <input
            className="flex-1 outline-none bg-inherit text-sm "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
          />
          <img className="w-4 h-4" src={assets.search_icon} alt="" />
        </div>

        {/* Close Search */}
        <img
          onClick={() => setShowSearch(false)}
          className="inline w-3 cursor-pointer"
          src={assets.cross_icon}
          alt=""
        />
      </div>
    </>
  ) : null;
}

export default SearchBar;
