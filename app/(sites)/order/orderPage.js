"use client";

import { instance } from "@/app/axios/axiosConfig";
import Button from "@/app/components/Button";
import ListOrder from "@/app/components/ListOrder";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function OrderPage({ session, orders }) {
  const userId = session.user.id;
  const [token, setToken] = useState(null);
  const [quantityData, setQuantityData] = useState(
    orders.map((order) => {
      return {
        ...order,
        quantity: 1,
      };
    })
  );

  const updateQuantityData = (index, newQuantity) => {
    setQuantityData((prevQuantityData) => {
      const updatedQuantityData = [...prevQuantityData];
      updatedQuantityData[index].quantity = newQuantity;
      return updatedQuantityData;
    });

    const total = calculateTotal();
    // Update your state or perform other actions with the total
  };

  const calculateTotal = () => {
    return quantityData.reduce((accumulator, item) => {
      const subTotal = item.quantity * item.price;
      return accumulator + subTotal;
    }, 0);
  };

  const payHandler = async () => {
    const id = ~~(Math.random() * 100) + 1;
    const gross_amount = calculateTotal();
    const secret = process.env.NEXT_PUBLIC_PAY_SECRET;
    const auth = Buffer.from(secret).toString("base64");
    const basic = `Basic ${auth}`;
    const parameter = {
      id,
      product: quantityData.map((data) => {
        return {
          name: data.name_product,
          price: data.price,
          quantity: data.quantity,
        };
      }),
      gross_amount,
    };
    // const parameter = {
    //   transaction_details: {
    //     order_id: idString,
    //     gross_amount,
    //   },
    //   item_details: quantityData.map((data) => {
    //     return {
    //       name: data.name_product,
    //       price: data.price,
    //       quantity: data.quantity,
    //     };
    //   }),
    //   customer_details: {
    //     first_name: session.user?.username,
    //     email: session?.user?.email,
    //     phone: "+62181000000000",
    //   },
    // };
    // console.log(parameter);
    try {
      // const res = await axios.post(
      //   `${process.env.NEXT_PUBLIC_PAY_URL}/v1/payment-links`,
      //   parameter,
      //   {
      //     headers: {
      //       Authorization: basic,
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      const res = await axios.post(`/api/tokenPay`, parameter, {
        headers: {
          Authorization: basic,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const tokenPay = res.data.token;
      window.snap.pay(tokenPay, {
        onSuccess: (result) => {
          localStorage.setItem(
            "Pembayaran anda sukses",
            JSON.stringify(result)
          );
          toast.success("Berhasil Membayar");
          let res = JSON.stringify(result);
        },
        onPending: (result) => {
          localStorage.setItem(
            "Pembayaran anda Pending",
            JSON.stringify(result)
          );
          console.log(result);
          toast.error("Pending");
        },
        onError: (result) => {
          toast.error("Error");
          let res = JSON.stringify(result);
          console.log(res);
        },
        onClose: (result) => {
          toast.success("Anda Belum Membayar");
          let res = JSON.stringify(result);
        },
      });
      setToken(tokenPay);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session === null) {
      toast.error("Anda Belum Login");
      redirect("/login");
      return;
    }

    // if (token) {
    //   window.snap.pay(token, {
    //     onSuccess: (result) => {
    //       localStorage.setItem(
    //         "Pembayaran anda sukses",
    //         JSON.stringify(result)
    //       );
    //       toast.success("Berhasil Membayar");
    //       let res = JSON.stringify(result);
    //     },
    //     onPending: (result) => {
    //       localStorage.setItem(
    //         "Pembayaran anda Pending",
    //         JSON.stringify(result)
    //       );
    //       console.log(result);
    //       toast.error("Pending");
    //     },
    //     onError: (result) => {
    //       toast.error("Error");
    //       let res = JSON.stringify(result);
    //       console.log(res);
    //     },
    //     onClose: (result) => {
    //       toast.success("Anda Belum Membayar");
    //       let res = JSON.stringify(result);
    //     },
    //   });
    // }

    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.PAY_CLIENT;
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [session]);

  function showHandler() {
    window.snap.pay("783870a6-6e17-4a61-8d2a-1c0a541b3013`");
  }

  console.log("token", token);

  return (
    <div className="mt-3 mb-24 md:mt-24">
      <div className="w-full bg-white rounded-lg p-3 mb-8">
        <div className="text-baseColor text-lg">
          {orders.length === 0 && <div>Tidak ada order</div>}
          {orders.length !== 0 &&
            orders.map((order, index) => {
              const subtotal = order.price * quantityData[index].quantity;
              return (
                <div key={index} className="flex justify-between items-center">
                  <p>{order.name_product}</p>
                  <p>{subtotal}</p>
                </div>
              );
            })}
          <div className="w-full p-[1px] bg-slate-600 rounded-full my-4"></div>
          <div className="flex justify-between items-center">
            <p>Total</p>
            <p>{calculateTotal()}</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-lg p-3 flex flex-col gap-y-8">
        {orders.map((order, index) => {
          return (
            <ListOrder
              key={index}
              order={order}
              onQuantityChange={(newQuantity) =>
                updateQuantityData(index, newQuantity)
              }
            />
          );
        })}
      </div>
      <Button onClick={payHandler} className={"w-full"}>
        Buy
      </Button>
      <Button onClick={showHandler} className={"w-full"}>
        Buy
      </Button>
    </div>
  );
}
