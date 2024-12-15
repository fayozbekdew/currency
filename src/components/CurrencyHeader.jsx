const CurrencyHeader = ({
  name,
  newPrice,
  state,
  icon,
  difference,
}) => {
  const priceStateColor =
    state === "up"
      ? "text-green-500"
      : state === "stable"
      ? "text-yellow-500"
      : "text-red-500";
  const priceArrow = state === "up" ? "↑" : state === "stable" ? "↔" : "↓";

  return (
    <div className="flex items-center gap-x-4 bg-white shadow-md rounded-lg px-2 py-2">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold">{icon}</span>
        <span className="text-lg font-semibold">{name}</span>
      </div>
      <div className="flex items-center">
        <div>
          <span>Today Price: </span>
          <span className={`font-bold ${priceStateColor}`}>
            ${newPrice} {priceArrow}
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        Difference: <span className="font-semibold">{difference}</span>
      </div>
    </div>
  );
};


export default CurrencyHeader;
