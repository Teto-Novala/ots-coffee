import { getServerSession } from "next-auth";
import MenuPage from "./MenuPage";
import { instance } from "./axios/axiosConfig";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";
import { Inconsolata } from "next/font/google";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inconsolata = Inconsolata({ subsets: ["latin"] });
async function getData() {
  try {
    const res = await instance.get("/products");
    return res.data.products;
  } catch (error) {
    console.log(error.message);
  }
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  const products = await getData();
  return (
    <div className={`${inconsolata.className} md:mt-24`}>
      <TopNavbar />
      <MenuPage products={products} session={session} />
      <BottomNavbar />
    </div>
  );
}
