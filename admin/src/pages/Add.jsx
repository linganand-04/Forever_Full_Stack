import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios, { AxiosHeaders } from "axios";
import { backendURL } from "../context/helper";
import { toast } from "react-toastify";

export default function Add({ token }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");

  const [sizes, setSizes] = useState([]);

  const [bestseller, setBestseller] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const resetForm = () => {
    setImage1(false);
    setImage2(false);
    setImage3(false);
    setImage4(false);
    setName("");
    setDescription("");
    setCategory("Men");
    setSubCategory("Topwear");
    setPrice("");
    setSizes([]);
    setBestseller(false);
  };

  async function handleOnSubmit(e) {
    e.preventDefault();

    if (isProcessing) return; // prevent double click

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const res = await axios.post(`${backendURL}/api/product/add`, formData, {
        headers: { token },
      });

      if (res.data.success) {
        resetForm();
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err.message);
    } finally {
      setIsProcessing(false); // ALWAYS stop loader
    }
  }

  useEffect(() => {
    // console.log(image1?.name);
  }, [image1]);
  return (
    <>
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col w-full items-start gap-3"
      >
        {/* Images */}
        <div>
          <p className="mb-2">Upload Image</p>

          <div className="flex gap-2 ">
            <label htmlFor="image1">
              <img
                className="w-20 cursor-pointer"
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt="Upload preview"
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                accept="image/*"
                id="image1"
                type="file"
                hidden
              />
            </label>
            <label htmlFor="image2">
              <img
                className="w-20 cursor-pointer"
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                alt="Upload preview"
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                accept="image/*"
                id="image2"
                type="file"
                hidden
              />
            </label>
            <label htmlFor="image3">
              <img
                className="w-20 cursor-pointer"
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt="Upload preview"
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                accept="image/*"
                id="image3"
                type="file"
                hidden
              />
            </label>
            <label htmlFor="image4">
              <img
                className="w-20 cursor-pointer"
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt="Upload preview"
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                accept="image/*"
                id="image4"
                type="file"
                hidden
              />
            </label>
          </div>
        </div>

        {/* Product Name */}
        <div className="w-full">
          <p className="mb-2">Product name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-125 px-3 py-2"
            type="text"
            required={true}
            placeholder="Type here"
          />
        </div>

        {/* Description */}
        <div className="w-full">
          <p className="mb-2">Product description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full max-w-125 px-3 py-2"
            type="text"
            required={true}
            placeholder="Write content here"
          />
        </div>

        {/* Categories , SubCategory and Prices */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          {/* Categories */}
          <div>
            <p className="mb-2">Product category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {/* SubCategory */}
          <div>
            <p className="mb-2">Sub category</p>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3 py-2"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          {/* SubCategory */}
          <div>
            <p className="mb-2">Price</p>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min={1}
              className="w-full px-3 py-2 sm:w-30"
              type="number"
              placeholder="25"
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-3">
            <div onClick={() => toggleSize("S")}>
              <p
                className={`${
                  sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer `}
              >
                S
              </p>
            </div>
            <div onClick={() => toggleSize("M")}>
              <p
                className={`${
                  sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer `}
              >
                M
              </p>
            </div>
            <div onClick={() => toggleSize("L")}>
              <p
                className={`${
                  sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer `}
              >
                L
              </p>
            </div>
            <div onClick={() => toggleSize("XL")}>
              <p
                className={`${
                  sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer `}
              >
                XL
              </p>
            </div>
            <div onClick={() => toggleSize("XXL")}>
              <p
                className={`${
                  sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer `}
              >
                XXL
              </p>
            </div>
          </div>
        </div>

        {/* BestSeller */}
        <div className="flex gap-2 mt-2">
          <input
            onChange={() => {
              setBestseller((prev) => !prev);
            }}
            checked={bestseller}
            id="bestseller"
            type="checkbox"
          />
          <label htmlFor="bestseller" className="cursor-pointer">
            Add to bestseller
          </label>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-28 py-3 mt-4 ${
            isProcessing
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black cursor-pointer"
          } text-white  `}
        >
          ADD
        </button>
      </form>
    </>
  );
}
