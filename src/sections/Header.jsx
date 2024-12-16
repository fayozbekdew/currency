import React, { Fragment, useEffect,useState } from "react";
import CurrencyHeader from "../components/CurrencyHeader";

function Header() {
  const [oldData, setOldData] = useState([]);
  const today = new Date().toISOString().slice(0, 10);
  useEffect(() => {
    let storedData = JSON.parse(localStorage.getItem("mainCurrens"));
    if (!storedData) {
      const mainCurrensState = [
        today,
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
      async function updateFirst() {
        try {
          const [usd, rub, eur] = await Promise.all([
            fetch(
              "https://v6.exchangerate-api.com/v6/e96b70868ed6726b237fe826/latest/USD"
            ).then((res) => res.json()),
            fetch(
              "https://v6.exchangerate-api.com/v6/e96b70868ed6726b237fe826/latest/RUB"
            ).then((res) => res.json()),
            fetch(
              "https://v6.exchangerate-api.com/v6/e96b70868ed6726b237fe826/latest/EUR"
            ).then((res) => res.json()),
          ]);

          mainCurrensState[1].newPrice = usd.conversion_rates.UZS;
          mainCurrensState[2].newPrice = rub.conversion_rates.UZS;
          mainCurrensState[3].newPrice = eur.conversion_rates.UZS;
          mainCurrensState[1].oldPrice = 12828.77;
          mainCurrensState[2].oldPrice = 123.5;
          mainCurrensState[3].oldPrice = 13448.0;
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

          localStorage.setItem("mainCurrens", JSON.stringify(mainCurrensState));
          setOldData(JSON.parse(localStorage.getItem("mainCurrens")));
        } catch (error) {
          console.error("Xatolik yuz berdi:", error);
        }
      }
      updateFirst();
    } else {
      if (storedData[0] !== today) {
        console.log('kirdiiddii');
        let mainCurrensState = [...storedData];
        mainCurrensState[0] = today;
        mainCurrensState[1].oldPrice = storedData[1].newPrice;
        mainCurrensState[2].oldPrice = storedData[2].newPrice;
        mainCurrensState[3].oldPrice = storedData[3].newPrice;
        async function updateOncePerDay() {
          try {
            const [usd, rub, eur] = await Promise.all([
              fetch(
                "https://v6.exchangerate-api.com/v6/e96b70868ed6726b237fe826/latest/USD"
              ).then((res) => res.json()),
              fetch(
                "https://v6.exchangerate-api.com/v6/e96b70868ed6726b237fe826/latest/RUB"
              ).then((res) => res.json()),
              fetch(
                "https://v6.exchangerate-api.com/v6/e96b70868ed6726b237fe826/latest/EUR"
              ).then((res) => res.json()),
            ]);
            mainCurrensState[1].newPrice = usd.conversion_rates.UZS;
            mainCurrensState[2].newPrice = rub.conversion_rates.UZS;
            mainCurrensState[3].newPrice = eur.conversion_rates.UZS;
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
            localStorage.setItem(
              "mainCurrens",
              JSON.stringify(mainCurrensState)
            );
            setOldData(mainCurrensState);
          } catch (error) {
            console.log(error);
          }
        }
        updateOncePerDay();
      }else{
        setOldData(storedData);
      }
    }
  }, [today]);

  return (
    <header className="flex items-center border-b-2 sticky z-[9] top-0 bg-slate-50 h-[80px] pl-[310px] mb-3 py-4 pr-4">
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
