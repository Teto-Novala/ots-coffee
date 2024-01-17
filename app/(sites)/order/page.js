import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { instance } from "@/app/axios/axiosConfig";
import OrderPage from "./orderPage";

async function getData() {
  try {
    const res = await instance.get("/orders");
    return res.data.orders;
  } catch (error) {
    console.log(error);
  }
}

export default async function Page() {
  const session = await getServerSession(authOptions);

  const orders = await getData();
  return (
    <section>
      <OrderPage session={session} orders={orders} />
    </section>
  );
}
