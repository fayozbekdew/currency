import { memo } from "react";
import { MdDelete } from "react-icons/md";
const Table = memo(({ elements, onDelete }) => {
  console.log(elements)
  console.log('renderrr 1111');
  return (
    <div className="relative flex flex-col w-full h-full  text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          { elements.length != 0 && <tr>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                {elements[0]['category'] ? "Category" : "From"}
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Amount
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                {elements[0]['category'] ? "Date" : "To"}
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                {elements[0]['category'] ? "Description" : "Result"}
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Action
              </p>
            </th>
          </tr>}
        </thead>
        <tbody>
          {elements.length != 0 ? (
            elements.map((el) => {
              return (
                <tr key={el.id}>
                  <td className="p-4">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {el.category ? el.category : el.from}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {el.amount}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {el.date ? el.date : el.to}
                      
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {el.description ? el.description : el.value + " " + el.to}
                    </p>
                  </td>
                  <td
                    onClick={() => onDelete(el.id)}
                    className="p-4 text-[25px]"
                  >
                    <MdDelete />
                  </td>
                </tr>
              );
            })
          ) : (
            <p className="text-center text-red-300 font-bold py-[10vw] w-full absolute top-[50%] text-[40px]">
              No information available yet😐
            </p>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default Table;
