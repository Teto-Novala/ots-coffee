import React from "react";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import { Inconsolata } from "next/font/google";

const inconsolata = Inconsolata({ subsets: ["latin"] });

export default function SitesLayout({ children }) {
  return (
    <section className={`px-8 xl:px-16 ${inconsolata.className}`}>
      <TopNavbar />
      {children}
      <BottomNavbar />
    </section>
  );
}
