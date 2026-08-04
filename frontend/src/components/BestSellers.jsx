import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductsItem from "./ProductsItem";
import { Commet } from "react-loading-indicators"

function BestSellers() {
  const { products } = useContext(ShopContext);

  let max = products.filter((p) => p.bestseller);

  function getRandomFive(arr) {
    const copy = [...arr]; // avoid mutating original array

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy.slice(0, 5);
  }

  const bestSellers = getRandomFive(max);

  return (
    <>
      <div className="my-10">
        <div className="text-center py-8 text-3xl">
          <Title text1={"BEST"} text2={"SELLERS"} />
          <div className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Customer favorites loved for their style, quality, and value. Shop our most popular products before they're gone.
          </div>
        </div>

        {/* Rendering Products */}
        {bestSellers.length > 0 ?
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
            {bestSellers.map((item, i) => {
              return (
                <ProductsItem
                  key={i}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              );
            })}
          </div> : (
            <div className="mx-auto flex items-center justify-center mt-10">
              <Commet color={["#c586a5"]} size="small" text="" textColor="" />
            </div>
          )}
      </div>
    </>
  );
}

export default BestSellers;
