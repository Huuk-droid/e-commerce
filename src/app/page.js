"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const fetchProduct = async () => {
    const dataJSON = await fetch("https://dummyjson.com/products?limit=4");
    const data = await dataJSON.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="flex flex-col gap-[70px] p-10">
      <div>
        <div className="font-bold flex justify-center text-4xl">
          Featured Products
        </div>
        <div className="flex justify-center text-gray-500">
          Check out our most popular items that customers love.
        </div>
      </div>
      <div className="flex justify-center gap-5">
        {products.map((product, index) => {
          return (
            <div key={index} className="relative">
              <Card className="w-[400px] h-[600px]">
                <img src={product.images} />
                <div className="m-3">
                  <div className="font-bold text-xl">{product.title}</div>
                  <div className="text-gray-500">{product.category}</div>
                </div>
                <div className="flex gap-50 absolute bottom-6 left-5">
                  <div className="font-bold ">${product.price}</div>
                  <Button className="h-[32px] w-[106px]" variant="secondary">
                    View Details
                  </Button>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-5.5"></div>
      <div className="flex justify-center">
        <Button
          className="w-[165px]"
          onClick={() => {
            router.push("/products");
          }}
        >
          View All Products
        </Button>
      </div>
    </div>
  );
}
