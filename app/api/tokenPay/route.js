import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
  isProduction: false,
  clientKey: process.env.NEXT_PUBLIC_PAY_CLIENT,
  serverKey: process.env.NEXT_PUBLIC_PAY_SECRET,
});

export async function POST(request) {
  const { id, product, gross_amount } = await request.json();
  let parameter = {
    item_details: product,
    transaction_details: {
      order_id: id,
      gross_amount: gross_amount,
    },
  };
  const token = await snap.createTransactionToken(parameter);
  return NextResponse.json({ token });
}
