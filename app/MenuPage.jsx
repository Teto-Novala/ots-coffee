"use client";

import { useState } from "react";
import ListMenu from "./components/ListMenu";

export default function MenuPage({ products, session }) {
  const [nextPage, setNextPage] = useState(1);

  const nextPageHandler = () => {
    setNextPage(2);
  };
  const prevPageHandler = () => {
    setNextPage(1);
  };
  return (
    <section className="px-5 pb-28">
      <div className="text-black flex justify-center items-center mt-5 relative">
        <h1 className="font-bold tracking-wider text-lg md:text-2xl hidden xl:block xl:text-4xl">
          Menu
        </h1>
        <p className="font-bold tracking-wider text-lg md:text-2xl xl:hidden">
          {nextPage}/2
        </p>
        {nextPage === 1 && (
          <button
            onClick={nextPageHandler}
            className="underline font-semibold absolute top-0 right-0 hover:cursor-pointer md:text-xl xl:hidden"
          >
            next page
          </button>
        )}
        {nextPage === 2 && (
          <button
            onClick={prevPageHandler}
            className="underline font-semibold absolute top-0 left-0 hover:cursor-pointer md:text-xl xl:hidden"
          >
            prev page
          </button>
        )}
      </div>
      <div className="mt-5 ">
        <div className="flex flex-col gap-y-5 xl:hidden">
          {products.map((product, index) => {
            if (index <= 4 && nextPage === 1) {
              return (
                <ListMenu
                  key={index}
                  product={product}
                  userId={session.user.id}
                />
              );
            }
            if (index > 4 && nextPage === 2) {
              return (
                <ListMenu
                  key={index}
                  product={product}
                  userId={session.user.id}
                />
              );
            }
          })}
        </div>
        <div className=" hidden xl:flex xl:flex-wrap xl:justify-evenly xl:gap-6">
          {products.map((product, index) => {
            return (
              <ListMenu
                key={index}
                product={product}
                userId={session.user.id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
