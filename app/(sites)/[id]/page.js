import { getServerSession } from "next-auth";
import DetailPage from "./detailPage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div className="my-3 md:mt-24">
      <DetailPage session={session} />
    </div>
  );
}
