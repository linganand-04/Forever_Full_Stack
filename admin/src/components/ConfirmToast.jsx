import { toast, Slide } from "react-toastify";

const ConfirmToast = (onConfirm) => {
  toast(
    ({ closeToast }) => (
      <div className="flex flex-col items-center mx-auto">
        <p className="font-medium mb-2">Delete this product?</p>

        <div className="flex justify-between gap-2 w-full">
          <button
            onClick={closeToast}
            className="px-3 py-1 text-sm bg-gray-300 rounded cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm();
              closeToast();
            }}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    ),
    {
      position: "top-right",
      transition: Slide,
      closeButton: false,
      autoClose: false,
      closeOnClick: false,
    }
  );
};

export default ConfirmToast;
