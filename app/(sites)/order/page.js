import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { instance } from "@/app/axios/axiosConfig";
import OrderPage from "./orderPage";

async function getData(id) {
  try {
    const res = await instance.get(`/orders/${id}`);
    return res.data.orders;
  } catch (error) {
    console.log(error);
  }
}

export const revalidate = 10;

export default async function Page() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  const orders = await getData(id);
  return (
    <section>
      <OrderPage session={session} orders={orders} />
    </section>
  );
}
