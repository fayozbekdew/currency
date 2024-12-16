
function FilterButton({ setTransactions }) {
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "food", label: "Food" },
    { value: "transport", label: "Transport" },
    { value: "shopping", label: "Shopping" },
    { value: "income", label: "Income" },
  ];

  function filteredTransactions(categor){
    const transactions = JSON.parse(localStorage.getItem("transactions"))
    if(categor === "all"){
      setTransactions(transactions)
    }else{
      setTransactions(transactions.filter((el) => el.category === categor));
  }
}
  return (
    <div className="flex flex-col gap-2 p-4 w-[300px]">
      <select
        id="filter"
        onChange={(e) => filteredTransactions(e.target.value)}
        className="
          p-2
          border border-gray-300
          rounded
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-400
          transition
          duration-200
        "
      >
        <option value="">Select a category</option>
        {filterOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterButton;
