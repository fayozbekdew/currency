import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function DatePickerCom({ setTransactions }) {
  const [startDate, setStartDate] = useState('');
  function filterByDate(date) {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    if(date === 'CLEAR'){ 
      setStartDate('')
      setTransactions(transactions);
    }
    const filteredTransactions = transactions.filter((el) => el.date === date);
    setTransactions(filteredTransactions);
  }
  useEffect(() => {
    filterByDate(startDate);
  }, [startDate]);
  return (
    <div className="border border-gray-300 rounded-md relative p-2">
      <DatePicker
        className="outline-none"
        selected={startDate || ""}
        onChange={(date) => setStartDate(date.toISOString().slice(0, 10))}
      />
      <button onClick={()=>filterByDate('CLEAR')} className="text-red-500 text-[16px] font-bold absolute right-2">x</button>
    </div>
  );
}
export default DatePickerCom;
