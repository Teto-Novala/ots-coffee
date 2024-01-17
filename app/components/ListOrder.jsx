import Image from "next/image";
import React, { useState } from "react";
import Button from "./Button";

export default function ListOrder({ order, onQuantityChange }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };
  return (
    <div className="flex items-center justify-around">
      <div className="relative w-24 h-24 object-cover">
        <Image src={order.image} alt={order.image} fill sizes="1000" priority />
      </div>
      <div className="w-2/3 text-center">
        <p className="text-black text-lg tracking-wider">
          {order.name_product}
        </p>
        <div className="text-white flex items-center justify-center gap-x-3">
          <Button onClick={() => handleQuantityChange(quantity - 1)}>-</Button>
          <p className="text-baseColor text-lg">{quantity}</p>
          <Button onClick={() => handleQuantityChange(quantity + 1)}>+</Button>
        </div>
      </div>
    </div>
  );
}
