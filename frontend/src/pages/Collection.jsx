import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductsItem from "../components/ProductsItem";
import { Commet } from "react-loading-indicators"

function Collection() {
  const { products, showSearch, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [productSort, setProductSort] = useState("relevent");

  const HandleToggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const HandleToggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  function handleFilter() {
    setShowFilter(!showFilter);
  }

  function handleSort(e) {
    console.log(e.target.value);
    setProductSort(e.target.value);
  }

  useEffect(() => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );

      console.log(productsCopy);
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    switch (productSort) {
      case "low-high":
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        productsCopy;
    }

    setFilterProduct(productsCopy);
  }, [products, category, subCategory, productSort, search, showSearch]);

  return (
    <>
      {/*  */}
      <div
        className={`flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 ${showSearch ? "" : "border-t"
          }`}
      >
        {/* Filter Options */}
        <div className="min-w-35 md:min-w-50 ">
          <p
            onClick={handleFilter}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            FILTERS
            <img
              className={` ${showFilter ? "rotate-90" : ""}  h-3 sm:hidden`}
              src={assets.dropdown_icon}
              alt=""
            />
          </p>

          {/* Categories Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? `` : `hidden`
              }  sm:block`}
          >
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>

            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Men"}
                  onChange={HandleToggleCategory}
                />{" "}
                Men
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Women"}
                  onChange={HandleToggleCategory}
                />
                Women
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Kids"}
                  onChange={HandleToggleCategory}
                />{" "}
                kids
              </p>
            </div>
          </div>

          {/* SubCateory Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? `` : `hidden`
              }  sm:block`}
          >
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Topwear"}
                  onChange={HandleToggleSubCategory}
                />
                Topwear
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Bottomwear"}
                  onChange={HandleToggleSubCategory}
                />
                Bottomwear
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Winterwear"}
                  onChange={HandleToggleSubCategory}
                />
                Winterwear
              </p>
            </div>
          </div>
        </div>

        {/* Collection */}

        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1={"ALL"} text2={"COLLECTIONS"} />

            {/* Sort */}
            <select
              value={productSort}
              onChange={handleSort}
              className="border-2 text-sm border-gray-300 px-2"
              name="Sort by: Relevent"
              id=""
            >
              <option value="relevent">Sort by: Relavant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {filterProduct.length > 0 ? <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
            {filterProduct?.map((item, i) => {
              return (
                <ProductsItem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  key={i}
                />
              );
            })}
          </div>
            : (
              <div className="mx-auto flex items-center justify-center mt-15">
                <Commet color={["#c586a5"]} size="small" text="" textColor="" />
              </div>
            )}
        </div>
      </div>
    </>
  );
}

export default Collection;
