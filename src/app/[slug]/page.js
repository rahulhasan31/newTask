"use client";

import { Select, SelectItem } from "@heroui/select";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function ProductDetails({ params }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("/frez.png");
  // Get the dynamic route parameter
  const slug = params.slug;
  console.log(slug);
  console.log(params.slug);

  const [products, setProducts] = useState([]);
  console.log(products);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const images = [
    "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip",
    "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip",
    "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip",
  ];

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  useEffect(() => {
    if (!slug) return; // Prevent fetching without a slug

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${slug}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]); // Refetch if slug changes

  if (!slug) return <p>No product selected</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 p-4 lg:p-8">
      {/* Left Section - Image Gallery */}
      <div className="flex lg:w-[80%] w-full lg:flex-row flex-col items-center lg:items-start">
        <div className="flex lg:flex-col lg:space-y-4 lg:mr-4 space-x-4 lg:space-x-0 mb-4 lg:mb-0">
          {images.map((img, index) => (
            <img
              key={index}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 border rounded cursor-pointer ${
                selectedImage === img ? "border-green-500" : "border-gray-300"
              }`}
              src={
                "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip"
              }
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        <div className="border-2 border-green-400 rounded">
          <img
            alt="Main Product"
            className="w-full h-auto max-h-[300px] lg:max-h-full"
            src={
              "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip"
            }
          />
        </div>
      </div>

      {/* Right Section - Product Details */}
      <div className="w-full lg:w-2/3 pl-0 lg:pl-8 mt-6 lg:mt-0">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          {products.name}
        </h1>
        <h1 className="text-xl lg:text-xl font-bold text-gray-800">
          {products.band}
        </h1>
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex text-yellow-500">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <span key={i}>★</span>
              ))}
          </div>
          <p className="text-sm lg:text-base text-gray-500">(4 Reviews)</p>
        </div>
        <p className="text-xl lg:text-2xl font-semibold text-orange-600 mt-4">
          {products.price}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Category: {products?.category?.name}
        </p>
        <p className="text-sm lg:text-base text-gray-700 mt-4">
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec,
          ultrices et ipsum. Nulla varius magna a consequat pulvinar.
        </p>
        <p className="mt-4">
          <span className="px-2 py-1 text-sm bg-green-100 text-green-700 rounded">
            In Stock
          </span>
          <span className="px-2 py-1 text-sm bg-green-100  rounded">
            <Select className="mt-10 " label="Select an Color">
              {products?.colors?.map((animal) => (
                <SelectItem key={animal.id}>{animal.colorName}</SelectItem>
              ))}
            </Select>
          </span>
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <div className="flex  items-center mt-6 space-x-4">
            <button
              className="px-3 py-1 text-lg font-semibold bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleDecrement}
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              className="px-3 py-1 text-lg font-semibold bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
          <Link href={"/checkout"}>
            <div>
              <button className="mt-6 lg:px-[110px] max-sm:px-10 py-3 rounded-full text-white bg-orange-600 shadow hover:bg-orange-700">
                Checkout
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
