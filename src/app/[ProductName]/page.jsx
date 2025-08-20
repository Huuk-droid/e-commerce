"use client";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState();
  const [related, setRelated] = useState();
  const params = useParams();
  const productName = params.ProductName;

  const fetchData = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/${productName}`
    );
    const data = await response.json();
    setProduct(data);
    setProducts(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchRelatedProducts = async () => {
    const data = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const product = await data.json();
    setRelated(product.products);
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [product]);
  return (
    <div>
      <div className="flex justify-center p-10">
        <div className="w-[1536px] h-[744] flex gap-5">
          <img
            src={product.images}
            className="h-[742px] w-[742px] border border-gray-300 rounded-[10px]"
          />
          <div className="flex flex-col gap-3">
            <div className="font-bold text-4xl">{product.title}</div>
            <div className="flex gap-5">
              <div className="font-bold">Rating: {product.rating}</div>
              <div className="text-gray-500">Brand: {product.brand}</div>
            </div>
            <div className="font-bold text-3xl">${product.price}</div>
            <div className="text-gray-500">{product.description}</div>
            <div className="flex gap-1">
              <div className="font-bold">Availability:</div>
              <div className="text-green-500">{product.availabilityStatus}</div>
            </div>
            <div>
              <div className="font-bold">Quantity</div>
              <select className="border border-gray-300 rounded-[5px] w-[50px]">
                <option value="">1</option>
                <option value="">2</option>
              </select>
            </div>
            <div className="flex gap-2.5">
              <Button className="h-[40px] w-[373px]">Add to Cart</Button>
              <Button variant="outline" className="h-[40px] w-[373px]">
                Add to Wishlist
              </Button>
            </div>
            <div>
              <div className="font-bold">Free shipping</div>
              <div className="text-gray-500">
                Free standard shipping on orders over $50
              </div>
            </div>
            <div>
              <div className="font-bold">30-Day Returns</div>
              <div className="text-gray-500">
                Shop with confidence with our 30-day return policy
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="font-bold text-3xl absolute left-[347px]">
          Related Products
        </div>
        <div>
          {/* {related.map((relatedProduct) => {
            return <div key={relatedProduct}>{product.title}</div>;
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Page;
