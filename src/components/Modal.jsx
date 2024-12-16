import React, { useRef } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";

function Modal({ size, handleOpen,setTransactions }) {
    const categoryRef = useRef(null);
    const amountRef = useRef(null);
    const dateRef = useRef(null);
    const descriptionRef = useRef(null);
    const typeRef  = useRef(null);
    function handleSubmit(e) {
        e.preventDefault();
        let oldTransaction = JSON.parse(localStorage.getItem("transactions")) || []; 
        let newTransaction = [{
          id: crypto.randomUUID(),
          category: categoryRef.current.value,
          amount: amountRef.current.value,
          date: dateRef.current.value,
          description: descriptionRef.current.value,
          type: typeRef.current.value
        },...oldTransaction]
        localStorage.setItem('transactions', JSON.stringify(newTransaction));
        setTransactions(newTransaction)
        handleOpen(null)
    }
  return (
    <>
      <Dialog className="" open={size} size={size || ""} handler={handleOpen}>
        <DialogHeader>Add new transaction</DialogHeader>
        <form className="flex flex-col gap-y-4 w-[700px] ">
          <select ref={categoryRef} className="border-2 w-[400px] border-gray-600 rounded-md py-[7px] px-5">
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="income">Income</option>
          </select>
          <input
            ref={amountRef}
            type="number"
            className="border-2 w-[400px] border-gray-600 rounded-md py-[7px] px-5"
          />
          <input
            ref={dateRef}
            type="date"
            className="border-2 w-[400px] border-gray-600 rounded-md py-[7px] px-5"
          />
          <input
            ref={descriptionRef}
            type="text"
            className="border-2 w-[400px] border-gray-600 rounded-md py-[7px] px-5"
          />
          <select ref={typeRef} className="border-2 w-[400px] border-gray-600 rounded-md py-[7px] px-5">
            <option value="income">Income</option>
            <option value="cost">Cost</option>
          </select>
        </form>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button  variant="" color="green" onClick={(e) => handleSubmit(e) }>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Modal;
