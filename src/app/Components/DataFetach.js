"use client";

import { Button } from "@heroui/button";
import { FaStar } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { Card, CardBody, CardFooter } from "@heroui/card";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Select, SelectSection, SelectItem } from "@heroui/react";
import { MdPriceCheck } from "react-icons/md";
const DataFetach = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://sealsbook-backend-springboot-env.eba-mvn559wt.ap-northeast-1.elasticbeanstalk.com/api/products/all"
        );
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="mt-5">
        <div>
          <h1 className="text-4xl font-bold">
            Explore <small className="text-4xl text-orange-500">Top Shop</small>
          </h1>
          <h4 className="text-2xl">Check your city Near by Shop</h4>
        </div>

        <div className="grid grid-cols-3 gap-5 border-collapse mt-5 max-sm:grid-cols-1">
          {products?.map((card) => (
            <div key={card?.id}>
              <Card className="py-4">
                <CardBody className="">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl max-sm:w-full"
                    height={100}
                    src={
                      "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip"
                    }
                    width={1000}
                  />
                </CardBody>
                <CardBody className="">
                  <div className="flex justify-between">
                    <p className=" uppercase font-bold text-2xl">
                      {card?.name}
                    </p>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400" /> (4.5)
                    </div>
                  </div>

                  <small className="text-black text-lg flex items-center gap-2">
                    <MdPriceCheck />
                    {card?.price}
                  </small>
                  <Select className="mt-10 " label="Select an Color">
                    {card?.colors?.map((animal) => (
                      <SelectItem key={animal.id}>
                        {animal.colorName}
                      </SelectItem>
                    ))}
                  </Select>
                  <h4 className="text-default-500 text-tiny mt-2">
                    {card?.description}
                  </h4>

                  <div className="">
                    <Link href={`${card?.id}`}>
                      <Button
                        className="mt-2 w-full text-white bg-green-500"
                        variant="shadow"
                      >
                        details
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataFetach;
