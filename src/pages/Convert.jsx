import { useCallback, useEffect, useRef, useState } from "react";
import { RightArrow } from "../assets";
import TransactionsTable from "../components/TransactionsTable";

function Convert() {
  const [currency, setCurrency] = useState([]);
  const [ convertValue, setConvertValue ] = useState(null)
  const [oldConversations, setOldConversations] = useState(() => JSON.parse(localStorage.getItem('convertValues')) || [])
  const convertAmount = useRef(null)
  const convertFrom = useRef(null)
  const convertTo = useRef(null)
  let oldValues = JSON.parse(localStorage.getItem('convertValues')) || [];
  useEffect(() => {
    fetch(
      "https://v6.exchangerate-api.com/v6/e96b70868ed6726b237fe826/latest/USD"
    )
      .then((data) => data.json())
      .then((data) => setCurrency(Object.keys(data.conversion_rates)))
      .catch();
  }, []);
  function convertFn(convertAmount, convertFrom, convertTo) {
    console.log(convertAmount, convertFrom, convertTo);
    fetch(
      `https://v6.exchangerate-api.com/v6/e96b70868ed6726b237fe826/latest/${convertFrom}`
    )
      .then((data) => data.json())
      .then((data) => setConvertValue(data.conversion_rates[convertTo] * convertAmount).toFixed(2))
      .catch();
      
      localStorage.setItem('convertValues', JSON.stringify([{id: crypto.randomUUID(), to: convertTo, from: convertFrom, amount: convertAmount, value: convertValue},...oldValues]))
  }
  const handleDelete = useCallback((id) => {
    const updatedCurrency = oldValues.filter((currency) => currency.id !== id);
    setOldConversations(updatedCurrency);
    localStorage.setItem('convertValues', JSON.stringify(updatedCurrency));
}, [oldValues]);
  return (
    <div>
      <div className="flex items-center gap-x-4 mb-7">
        <span className="relative">
          <input ref={convertAmount} type="text" className="border-2 w-[300px] border-gray-600 rounded-md py-[7px] px-5" />
          <select
            ref={convertFrom}
            className="absolute right-1 top-1 bottom-1 border-l-[2px] border-gray-900 border-r-none w-full max-w-[90px] outline-none"
            aria-label="Default select example"
          >
            <option selected disabled>
              Currency
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
          ref={convertTo}
          className="border-2 border-gray-600 rounded-md py-[7px] px-5"
          aria-label="Default select example"
        >
          <option selected disabled>
            Select second type
          </option>
          {currency.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button onClick={() => convertFn(convertAmount?.current.value, convertFrom?.current.value, convertTo?.current.value)} className="flex items-center justify-center py-1 px-6 bg-green-600 rounded-md text-white text-[20px]">Convert</button>
        <input readOnly className="border-2 border-gray-600 rounded-md py-[7px] px-5"  value={`${new Intl.NumberFormat().format(convertValue)}`}/>
      </div>
      <TransactionsTable elements={oldConversations} onDelete={handleDelete}/>
    </div>
  );
}

export default Convert;
