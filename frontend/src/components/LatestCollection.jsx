import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductsItem from "./ProductsItem";
import { Commet } from "react-loading-indicators"

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <>
      <div className="my-10 ">
        <div className="text-center py-8 text-3xl">
          <Title text1={"LATEST"} text2={"COLLECTION"} />
          <div className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            nam eligendi laborum delectus quidem voluptates.
          </div>
        </div>

        {/* Rendering Products */}
        {latestProducts.length > 0 ?
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
            {latestProducts.map((item, i) => {
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
          </div> : (
            <div className="mx-auto flex items-center justify-center mt-10">
              <Commet color={["#c586a5"]} size="small" text="" textColor="" />
            </div>
          )}
      </div>
    </>
  );
}

export default LatestCollection;
