import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import starGenerator from "../components/StartGenerator";
import RelatedProducts from "../components/RelatedProducts";
import { toast, Slide } from "react-toastify";

function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  // function HandleAddToCart(productData) {

  // }

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        // console.log(item);
        return null;
      }
    });
  };

  const addedToCart = () => {
    addToCart(productData._id, size);
    if (!size) return;

    toast.success(
      `${size} - ${
        productData.name.length > 15
          ? productData.name.substring(0, 15) + ".."
          : productData.name
      }   Added`,
      {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      }
    );

    // toast.success(
    //   `${size} - ${
    //     productData.name.length > 15
    //       ? productData.name.substring(0, 15) + ".."
    //       : productData.name
    //   }   Added to cart`,
    //   { position: "top-center" }
    // );
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <>
      <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100">
        {/* ------ Product Data ------ */}
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          {/* Product Images */}
          <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
              {productData.image.map((img, i) => {
                return (
                  <img
                    key={i}
                    onClick={() => setImage(img)}
                    className="sm:w-full sm:mb-3 w-[24%] shrink-0 cursor-pointer"
                    src={img}
                    alt=""
                  />
                );
              })}
            </div>

            <div className="w-full sm:w-[80%] overflow-hidden">
              <img src={image} className="w-full h-auto" alt="" />
            </div>
          </div>

          {/* ------ Product Info ------ */}

          <div className="flex-1">
            {/* Title */}
            <h2 className="font-medium text-2xl mt-2 ">{productData.name}</h2>
            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              {/* <img className="w-3.5" src={assets.star_dull_icon} alt="" />{" "} */}
              {starGenerator("4", "5", "w-3.5")}
              <p className="pl-2">(122)</p>
            </div>
            {/* Prize */}
            <p className="mt-5 font-medium text-3xl">
              {currency}
              {productData.price}
            </p>

            {/* Desc */}
            <p className="mt-5 text-gray-500 md:w-4/5">
              {productData.description}
            </p>

            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              {/* Size Buttons */}
              <div className="flex gap-2">
                {productData.sizes.map((item, i) => {
                  return (
                    <div
                      onClick={() => setSize(item)}
                      key={i}
                      className={`border bg-gray-100 py-2 px-4 cursor-pointer ${
                        item === size ? "border-red-400 " : "border-gray-200"
                      }`}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Button */}
            <button
              onClick={() => {
                addedToCart();
              }}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer uppercase"
            >
              Add to cart
            </button>

            <hr className="mt-8 sm:w-4/5 border-gray-200" />

            {/*  */}
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>

        {/* ------ Description & Review ------ */}
        <div className=" mt-20">
          <div className="flex">
            <div className="border border-b-0 border-gray-300 px-5 py-3 text-sm font-semibold">
              Description
            </div>
            <div className="border border-b-0 border-gray-300 border-l-0 px-5 py-3 text-sm">
              Reviews (122)
            </div>
          </div>
          <div className="flex flex-col py-6 px-6 text-sm text-gray-500 gap-4 border border-gray-300">
            <p>
              An e-commerce website is an online platform that facilitates the
              buying and selling of products or services over the internet. It
              serves as a virtual marketplace where businesses and individuals
              can showcase their products, interact with customers, and conduct
              transactions without the need for a physical presence. E-commerce
              websites have gained immense popularity due to their convenience,
              accessibility, and the global reach they offer.
            </p>

            <p>
              E-commerce websites typically display products or services along
              with detailed descriptions, images, prices, and any available
              variations (e.g., sizes, colors). Each product usually has its own
              dedicated page with relevant information.
            </p>
          </div>
          {/* ------ Description & Review ------ */}

          <RelatedProducts
            category={productData.category}
            subCategory={productData.subCategory}
          />
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="opacity-0"></div>
    </>
  );
}

export default Product;
