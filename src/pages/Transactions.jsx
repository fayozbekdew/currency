import React, { useCallback, useState } from "react";
import DatePickerCom from "../components/DatePickerCom";
import FilterButton from "../components/FilterButton";
import Modal from "../components/Modal";
import TransactionsTable from "../components/TransactionsTable";

function Transactions() {
  const [size, setSize] = useState(null);
  const [transactions, setTransactions] = useState(() => 
  JSON.parse(localStorage.getItem('transactions')) || []);
  const handleOpen = (value) => setSize(value);
  
    const handleDelete = useCallback((id) => {
        const updatedTransactions = transactions.filter((el) => el.id !== id);
        setTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    }, [transactions]);
    
    console.log(1111111111111111111)
  return (
    <div>
      <Modal setTransactions={setTransactions} size={size} handleOpen={handleOpen} />
      <span className="flex gap-4 items-center justify-between">
        <button
          onClick={() => handleOpen("xs")}
          className="
        bg-green-500
        hover:bg-green-600
        text-white
        font-semibold
        py-2
        px-4
        rounded
        shadow-md
        transition
        duration-300
        ease-in-out
        "
        >
          Add Transaction
        </button>
        <span className="flex items-center gap-x-4">
        <DatePickerCom setTransactions={setTransactions} />
        <FilterButton setTransactions={setTransactions} transactions={transactions} />
        </span>
      </span>
      <TransactionsTable onDelete={handleDelete} elements={transactions}/>
    </div>
  );
}

export default Transactions;
