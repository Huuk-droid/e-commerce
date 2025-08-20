"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 12;

const Page = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    const skip = PAGE_SIZE * (currentPage - 1);
    let url = "";

    if (inputValue !== "") {
      url = `https://dummyjson.com/products/search?q=${inputValue}`;
    } else {
      url = `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setProducts(data.products);
    setTotalProducts(data.total);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, inputValue]);
  console.log(products);
  const pages = Array.from(
    { length: Math.ceil(totalProducts / 12) },
    (_, i) => i + 1
  );

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-5">
        <div>
          <Input
            placeholder="Search products..."
            className="w-[500px]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></Input>
        </div>
        <div className="flex gap-5 flex-wrap w-[1800px]">
          {products?.map((product, index) => {
            return (
              <div key={index} className="relative">
                <Card className="w-[400px] h-[600px]">
                  <img src={product.images[0]} />
                  <div className="m-3">
                    <div className="font-bold text-xl">{product.title}</div>
                    <div className="text-gray-500">{product.category}</div>
                  </div>
                  <div className="flex gap-50 absolute bottom-6 left-5">
                    <div className="font-bold ">${product.price}</div>
                    <Button
                      className="h-[32px] w-[106px]"
                      variant="secondary"
                      onClick={() => {
                        router.push(`/${product.id}`);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-2">
          {pages.map((page) => (
            <Button
              key={page}
              variant="secondary"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
