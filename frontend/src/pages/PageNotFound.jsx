import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

function PageNotFound() {
  const { navigate } = useContext(ShopContext);

  return (
    <>
      <h1 className=" text-5xl text-center my-10">Page Not Found</h1>
      <button onClick={()=>{navigate("/")}} className="mx-auto block my-10 bg-[#c586a5] text-white px-4 py-2 rounded-lg font-medium cursor-pointer">
        Back to Home
      </button>
    </>
  );
}

export default PageNotFound;
