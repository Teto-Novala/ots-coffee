"use client";
import { instance } from "@/app/axios/axiosConfig";
import Button from "@/app/components/Button";
import Image from "next/image";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DetailPage({ session }) {
  if (session === null) {
    toast.error("Anda Belum Login");
    redirect("/login");
  }
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  useEffect(() => {
    return () => {
      instance
        .get(`/product/${id}`)
        .then((res) => {
          setProduct(res.data.product);
          setLoadingData(false);
        })
        .catch((error) => {
          setLoadingData(false);
          console.log(error);
        });
    };
  }, []);

  return (
    <div className="my-3 md:mt-24">
      <Link href={"/"} className="underline text-baseColor text-lg md:text-xl">
        Back
      </Link>
      {loadingData && (
        <div className="xl:w-fit xl:mx-auto">
          <div className="flex py-4 flex-col xl:flex-row xl:justify-center xl:gap-x-6 xl:mx-auto xl:w-fit items-center bg-white rounded-lg gap-y-3">
            <div className="relative w-40 h-40 bg-slate-500 rounded-full md:w-60 md:h-60"></div>
            <div className="text-center ">
              <h1 className="font-semibold text-slate-900 text-2xl tracking-[.3rem] md:text-4xl md:mb-2">
                Loading...
              </h1>
              <p className="text-slate-700 md:text-xl">Loading...</p>
              <div className="font-bold text-black border border-baseColor p-3 mt-2 md:mt-4">
                <p className="text-xl md:text-2xl">Loading...</p>
                <p className="text-3xl md:text-4xl">Loading...</p>
              </div>
            </div>
          </div>
          <Button className={"rounded-xl w-full mt-5"}>Loading...</Button>
        </div>
      )}
      {loadingData === false && (
        <div className="xl:w-fit xl:mx-auto">
          <div className="flex py-4 flex-col xl:flex-row xl:justify-center xl:gap-x-6 xl:mx-auto xl:w-fit items-center bg-white rounded-lg gap-y-3">
            <div className="relative w-40 h-40 object-cover md:w-60 md:h-60">
              <Image
                src={product.image.url}
                alt={product.image.url}
                fill
                sizes="1000"
                quality={100}
                priority
              />
            </div>
            <div className="text-center xl:text-left xl:w-1/2">
              <h1 className="font-semibold text-slate-900 text-2xl tracking-[.3rem] md:text-4xl md:mb-2">
                {product.name_product}
              </h1>
              <p className="text-slate-700 md:text-xl">
                {product.detail_product}
              </p>
              <div className="font-bold w-fit text-black border border-baseColor p-3 mx-auto mt-2 md:mt-4">
                <p className="text-xl md:text-2xl">Harga :</p>
                <p className="text-3xl md:text-4xl">Rp.{product.price}</p>
              </div>
            </div>
          </div>
          <Button className={"rounded-xl w-full mt-5"}>Add To Buy</Button>
        </div>
      )}
    </div>
  );
}
