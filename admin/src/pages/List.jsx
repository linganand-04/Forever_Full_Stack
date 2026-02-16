import axios from "axios";
import { useEffect, useState } from "react";
import { backendURL, currency } from "../context/helper";
import { toast } from "react-toastify";
import ConfirmToast from "../components/ConfirmToast";
import { Commet } from "react-loading-indicators"

function List() {
  const [list, setList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const token = localStorage.getItem("token") || "";



  const fetchList = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/product/list`, {
        headers: { token },
      });

      setList(res.data?.products || []);
    } catch (err) {
      if (list.length === 0) return;
      console.error(err.message);
    }
  };

  async function removeProduct(id) {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const res = await axios.post(
        `${backendURL}/api/product/remove`,
        { id },
        {
          headers: { token },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setList((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
      setList([]);
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Product List</p>
      <div className="flex flex-col gap-2">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-200 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.length > 0 ? (
          list.map((item, i) => {
            return (
              <div
                className="grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-200 text-sm relative"
                key={i}
              >
                <img src={item.image[0]} className="w-12" alt={item.name} />

                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{`${currency} ${item.price}`}</p>

                <button
                  disabled={isProcessing}
                  onClick={() => ConfirmToast(() => removeProduct(item._id))}
                  className={`${isProcessing
                    ? "bg-red-300 cursor-no-drop"
                    : "bg-red-500 cursor-pointer"
                    } absolute right-3 h-5 w-5 text-[10px] md:static md:text-sm justify-center md:w-7 md:h-7 flex items-center mx-auto text-white rounded-sm `}
                >
                  X
                </button>
              </div>
            );
          })
        ) : (
          <div className="mx-auto flex items-center justify-center mt-10">
            <Commet color={["#c586a5"]} size="small" text="" textColor="" />
          </div>
        )}
      </div>
    </>
  );
}

export default List;
