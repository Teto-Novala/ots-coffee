"use client";

import { instance } from "@/app/axios/axiosConfig";
import Button from "@/app/components/Button";
import ListOrder from "@/app/components/ListOrder";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { Savetoken } from "@/app/lib/tokenPaySlice";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function OrderPage({ session, orders }) {
  const router = useRouter();
  const userId = session?.user?.id;
  const token = useAppSelector((state) => state.tokenPay.token);

  const dispatch = useAppDispatch();
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
    if (token === null) {
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
      try {
        const res = await axios.post(`/api/tokenPay`, parameter, {
          headers: {
            Authorization: basic,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const tokenPay = res.data.token;
        dispatch(Savetoken(tokenPay));
        window.snap.pay(tokenPay, {
          onSuccess: async (result) => {
            try {
              const res = await instance.put(`/orders/${userId}`, {
                userId,
                transaction_status: result.transaction_status,
              });
              dispatch(Savetoken(null));
              toast.success(result.transaction_status);
            } catch (error) {
              toast.error("Gagal membayar");
            }
          },
          onPending: async (result) => {
            try {
              const res = await instance.put(`/orders/${userId}`, {
                userId,
                transaction_status: result.transaction_status,
              });
              toast.success(result.transaction_status);
            } catch (error) {
              toast.error("Gagal Pending");
            }
          },
          onError: async (result) => {
            try {
              const res = await instance.put(`/orders/error/${userId}`, {
                transaction_status: result.status_message,
              });
              toast.error("Gagal, Mohon Coba Lagi");
            } catch (error) {
              toast.error("Terjadi Kesalahan");
            }
          },
          onClose: (result) => {},
        });
      } catch (error) {
        if (error.response.status === 500) {
          toast.error("Membuat Transaksi Gagal");
        }
      }
    } else {
      window.snap.pay(token, {
        onSuccess: async (result) => {
          dispatch(Savetoken(null));
          try {
            const res = await instance.put(`/orders/${userId}`, {
              userId,
              transaction_status: result.transaction_status,
            });
            toast.success(result.transaction_status);
          } catch (error) {
            toast.error("Gagal membayar");
          }
        },
        onPending: async (result) => {
          const res = await instance.put(`/orders/${userId}`, {
            userId,
            transaction_status: result.transaction_status,
          });
          toast.success(result.transaction_status);
        },
        onError: async (result) => {
          try {
            const res = await instance.put(`/orders/error/${userId}`, {
              transaction_status: result.status_message,
            });
            toast.error("Gagal, Mohon Coba Lagi");
          } catch (error) {
            toast.error("Terjadi Kesalahan");
          }
        },
        onClose: async (result) => {
          dispatch(Savetoken(null));
          const res = await instance.put(`/orders/${userId}`, {
            userId,
            transaction_status: "settlement",
          });
          router.refresh();
        },
      });
    }
  };

  useEffect(() => {
    if (session === null) {
      toast.error("Anda Belum Login");
      redirect("/login");
    }
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
          {orders.length !== 0 && (
            <div className="flex justify-between items-center">
              <p>Total</p>
              <p>{calculateTotal()}</p>
            </div>
          )}
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
    </div>
  );
}
