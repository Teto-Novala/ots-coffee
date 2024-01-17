import { getServerSession } from "next-auth";
import AccountPage from "./AccountPage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <AccountPage dataAccount={session} />
    </div>
  );
}
