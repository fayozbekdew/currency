import React, { Fragment, useEffect } from "react";
import CurrencyHeader from "../components/CurrencyHeader";

function Header() {
  const oldData = JSON.parse(localStorage.getItem("mainCurrens"));

  async function updateOncePerDay() {
    const mainCurrensState = [
      new Date().toISOString().slice(0, 10),
      {
        name: "USD",
        newPrice: 0,
        oldPrice: 0,
        state: "up",
        icon: "$",
        difference: 0,
      },
      {
        name: "RUB",
        newPrice: 0,
        oldPrice: 0,
        state: "down",
        icon: "₽",
        difference: 0,
      },
      {
        name: "EUR",
        newPrice: 0,
        oldPrice: 0,
        state: "stable",
        icon: "€",
        difference: 0,
      },
    ];
    const today = new Date().toISOString().slice(0, 10);
    if (today !== oldData[0]) {
      mainCurrensState[1].oldPrice = oldData[1].newPrice;
      mainCurrensState[2].oldPrice = oldData[2].newPrice;
      mainCurrensState[3].oldPrice = oldData[3].newPrice;
      await fetch(
        "https://v6.exchangerate-api.com/v6/e96b70868ed6726b237fe826/latest/USD"
      )
        .then((data) => data.json())
        .then((data) => {
          mainCurrensState[1].newPrice = data.conversion_rates.UZS;
        })
        .catch(console.log);
      await fetch(
        "https://v6.exchangerate-api.com/v6/e96b70868ed6726b237fe826/latest/RUB"
      )
        .then((data) => data.json())
        .then((data) => {
          mainCurrensState[2].newPrice = data.conversion_rates.UZS;
        })
        .catch(console.log);
      await fetch(
        "https://v6.exchangerate-api.com/v6/e96b70868ed6726b237fe826/latest/EUR"
      )
        .then((data) => data.json())
        .then((data) => {
          mainCurrensState[3].newPrice = data.conversion_rates.UZS;
        })
        .catch(console.log)
        .finally(() => {
          mainCurrensState[1].state =
            mainCurrensState[1].newPrice > mainCurrensState[1].oldPrice
              ? "up"
              : mainCurrensState[1].newPrice < mainCurrensState[1].oldPrice
              ? "down"
              : "stable";
          mainCurrensState[2].state =
            mainCurrensState[2].newPrice > mainCurrensState[2].oldPrice
              ? "up"
              : mainCurrensState[2].newPrice < mainCurrensState[2].oldPrice
              ? "down"
              : "stable";
          mainCurrensState[3].state =
            mainCurrensState[3].newPrice > mainCurrensState[3].oldPrice
              ? "up"
              : mainCurrensState[3].newPrice < mainCurrensState[3].oldPrice
              ? "down"
              : "stable";
          //   Difference newPrice and oldPrice
          mainCurrensState[1].difference =
            mainCurrensState[1].newPrice - mainCurrensState[1].oldPrice;
          mainCurrensState[2].difference =
            mainCurrensState[2].newPrice - mainCurrensState[2].oldPrice;
          mainCurrensState[3].difference =
            mainCurrensState[3].newPrice - mainCurrensState[3].oldPrice;
        });
      localStorage.setItem("mainCurrens", JSON.stringify(mainCurrensState));
    } else {
      console.log("Bugun allaqachon yangilangan!");
    }
  }

  updateOncePerDay();

  return (
    <header className="flex items-center border-b-2 sticky top-0 bg-slate-50 h-[80px] pl-[310px] mb-3 py-4 pr-4">
      <span className="flex container justify-end gap-x-5">
        {oldData.slice(1).map((item) => (
          <Fragment key={item.name}>
            <CurrencyHeader
              key={item.name}
              name={item.name}
              newPrice={item.newPrice}
              oldPrice={item.oldPrice}
              state={item.state}
              icon={item.icon}
              difference={item.difference}
            />
          </Fragment>
        ))}
      </span>
      <ul>
        <li className="flex items-center">
          <small className="bg-yellow-500 rounded-full w-3 h-3 flex"></small>
          <span className="ml-1">Stable</span>
        </li>
        <li className="flex items-center">
          <small className="bg-green-500 rounded-full w-3 h-3"></small>
          <span className="ml-1">Up</span>
        </li>
        <li className="flex items-center">
          <small className="bg-red-500 rounded-full w-3 h-3"></small>
          <span className="ml-1">Down</span>
        </li>
      </ul>
    </header>
  );
}

export default Header;
