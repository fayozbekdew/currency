import React, { useRef } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogBody,
} from "@material-tailwind/react";

function Modal({ size, handleOpen, setTransactions }) {
  const categoryRef = useRef(null);
  const amountRef = useRef(null);
  const dateRef = useRef(new Date());
  const descriptionRef = useRef(null);
  const typeRef = useRef(null);
  if (localStorage.getItem("transactions") === null) {
    const generateRandomArray = () => {
      const categories = ["food", "transport", "shopping", "income"];
      const types = ["income", "cost"];

      const randomArray = Array.from({ length: 10 }, () => {
        return {
          id: crypto.randomUUID(),
          category: categories[Math.floor(Math.random() * categories.length)],
          amount: (Math.random() * 100).toFixed(2),
          date: new Date(Date.now() - Math.random() * 1e10)
            .toISOString()
            .slice(0, 10),
          description: "description test",
          type: types[Math.floor(Math.random() * types.length)],
        };
      });

      return randomArray;
    };

    const defaultArray = generateRandomArray();
    localStorage.setItem("transactions", JSON.stringify(defaultArray));
    setTransactions(defaultArray);
  }
  function handleSubmit(e) {
    e.preventDefault();
    let oldTransaction = JSON.parse(localStorage.getItem("transactions")) || [];
    if (!amountRef.current.value) {
      amountRef.current.style.borderColor = "red";
      amountRef.current.focus();
      return;
    }
    if (!descriptionRef.current.value) {
      descriptionRef.current.style.borderColor = "red";
      descriptionRef.current.focus();
      return;
    }
    let newTransaction = [
      {
        id: crypto.randomUUID(),
        category: categoryRef.current.value,
        amount: amountRef.current.value,
        date: dateRef.current.value || new Date().toISOString().slice(0, 10),
        description: descriptionRef.current.value,
        type: typeRef.current.value,
      },
      ...oldTransaction,
    ];
    localStorage.setItem("transactions", JSON.stringify(newTransaction));
    setTransactions(newTransaction);
    handleOpen(null);
  }
  return (
    <>
      <Dialog
        className="bg-white/80 backdrop-blur-xl flex flex-col justify-center h-fit border border-gray-600 ml-[50%] mt-[15vh] translate-x-[-50%] translate-y-[-50%]"
        open={size}
        size={size || ""}
        handler={handleOpen}
      >
        <DialogHeader className="flex justify-center">
          Add new transaction
        </DialogHeader>
        <DialogBody className="flex justify-center ml-[50%] translate-x-[-50%]">
          <form className="flex flex-col gap-y-4 w-[700px] justify-center">
            <select
              ref={categoryRef}
              className="border-2 w-[400px] border-gray-600 rounded-md py-[7px] px-5"
            >
              <option selected value="food">
                Food
              </option>
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
            <select
              ref={typeRef}
              className="border-2 w-[400px] border-gray-600 rounded-md py-[7px] px-5"
            >
              <option selected value="income">
                Income
              </option>
              <option  value="cost">
                  Cost
                </option>
              
            </select>
          </form>
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button
            variant=""
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="" color="green" onClick={(e) => handleSubmit(e)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Modal;
