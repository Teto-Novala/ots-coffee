import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { instance } from "../axios/axiosConfig";
import toast from "react-hot-toast";

export default function ListMenu({ product, userId }) {
  const router = useRouter();
  const detailHandler = () => {
    router.push(`/${product._id}`);
  };
  const orderHandler = async () => {
    try {
      const data = {
        userId,
        name_product: product.name_product,
        price: product.price,
        image: product.image.url,
      };
      if (!data) {
        throw new Error("Data Tidak Ada");
      }
      const res = await instance.post("/orders", data);
      toast.success("Berhasil Meng-order");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center gap-x-3 xl:flex-col xl:bg-baseColor xl:w-1/4">
      <div className="relative w-28 h-28 object-cover">
        <Image
          src={product.image.url}
          alt={product.image.url}
          fill
          sizes="1000"
          priority
        />
      </div>
      <div className="bg-baseColor xl:bg-inherit w-2/3 flex flex-col gap-y-2 rounded-md p-3 xl:p-0">
        <div className="xl:text-center">
          <h1 className={`tracking-[.2rem] text-lg uppercase`}>
            {product.name_product}
          </h1>
          <p className="tracking-wide">Rp.{product.price}</p>
        </div>
        <div className="flex items-center gap-x-2 xl:flex-col xl:w-full xl:gap-y-4 xl:gap-x-0 xl:mb-4">
          <button
            onClick={() => detailHandler()}
            className={
              "bg-white text-baseColor hover:bg-baseColor hover:text-white border-white box-border border px-3 py-2 transition text-center md:text-xl font-semibold w-full rounded-sm"
            }
          >
            Detail
          </button>
          <button
            onClick={() => orderHandler()}
            className={
              "bg-white text-baseColor hover:bg-baseColor hover:text-white border-white box-border border px-3 py-2 transition text-center md:text-xl font-semibold w-full rounded-sm"
            }
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
}
