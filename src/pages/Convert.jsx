import { useCallback, useEffect, useRef, useState } from "react";
import { RightArrow } from "../assets";
import Table from "../components/Table";

function Convert() {
  const [currency, setCurrency] = useState([]);
  const [convertValue, setConvertValue] = useState(null);
  const [oldConversations, setOldConversations] = useState(
    () => JSON.parse(localStorage.getItem("convertValues")) || []
  );
  const convertAmountRef = useRef(null);
  const convertFromRef = useRef(null);
  const convertToRef = useRef(null);
  let oldValues = JSON.parse(localStorage.getItem("convertValues")) || [];
  useEffect(() => {
    fetch(
      "https://v6.exchangerate-api.com/v6/e96b70868ed6726b237fe826/latest/USD"
    )
      .then((data) => data.json())
      .then((data) => setCurrency(Object.keys(data.conversion_rates)))
      .catch();
  }, []);
  function convertFn(convertAmount, convertFrom, convertTo) {
    if(!convertAmount){
      convertAmountRef.current.focus()
      convertAmountRef.current.style.borderColor = 'red'
      return;
    }
    
    fetch(
      `https://v6.exchangerate-api.com/v6/e96b70868ed6726b237fe826/latest/${convertFrom}`
    )
      .then((data) => data.json())
      .then((data) =>
        setConvertValue(
          new Intl.NumberFormat().format((data.conversion_rates[convertTo] * convertAmount).toFixed(2))
        )
      )
      .catch();
    const newValue = [
      {
        id: crypto.randomUUID(),
        to: convertTo,
        from: convertFrom,
        amount: convertAmount,
        value: convertValue,
      },
      ...oldValues,
    ];
    localStorage.setItem("convertValues", JSON.stringify(newValue));
    setOldConversations(newValue);
  }
  const handleDelete = useCallback(
    (id) => {
      const updatedCurrency = oldValues.filter(
        (currency) => currency.id !== id
      );
      setOldConversations(updatedCurrency);
      localStorage.setItem("convertValues", JSON.stringify(updatedCurrency));
    },
    [oldValues]
  );
  return (
    <div>
      <div className="flex items-center gap-x-4 mb-7">
        <span className="relative">
          <input
            ref={convertAmountRef}
            type="text"
            className="border-2 w-[300px] border-gray-600 rounded-md py-[7px] px-5"
          />
          <select
            ref={convertFromRef}
            className="absolute right-1 top-1 bottom-1 border-l-[2px] border-gray-900 border-r-none w-full max-w-[90px] outline-none"
            aria-label="Default select example"
          >
            <option selected >
              {currency[0]}
            </option>
            {currency.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </span>
        <img src={RightArrow} alt="right arrow" width={30} height={30} />
        <select
          ref={convertToRef}
          className="border-2 border-gray-600 rounded-md py-[7px] px-5"
          aria-label="Default select example"
        >
          <option selected >
            {currency[1]}
           </option>
          {currency.slice(1).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button
          onClick={() =>
            convertFn(
              convertAmountRef?.current.value,
              convertFromRef?.current.value,
              convertToRef?.current.value
            )
          }
          className="flex items-center justify-center py-1 px-6 bg-green-600 rounded-md text-white text-[20px]"
        >
          Convert
        </button>
        <input
          readOnly
          className="border-2 border-gray-600 rounded-md py-[7px] px-5"
          value={`${new Intl.NumberFormat().format(convertValue)}`}
        />
      </div>
      <Table elements={oldConversations} onDelete={handleDelete} />
    </div>
  );
}

export default Convert;
