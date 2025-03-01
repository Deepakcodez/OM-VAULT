import React from "react";
import { TableHeadingsTypes } from "../../types/types";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { motion } from "motion/react";
type TableProps = {
  tableHeadings: TableHeadingsTypes[];
  tableBody: any[];
};
const Table: React.FC<TableProps> = ({ tableHeadings, tableBody }) => {
  return (
    <div className="relative">
      <table className="table-fixed  rounded-t-lg border-spacing-x text-white w-full border-separate">
        <thead className="border bg-zinc-600 sticky top-0">
          <tr>
            {tableHeadings.map((heading, index) => (
              <th key={index} className=" font-light text-sm py-2 truncate  ">
                {heading.label}
              </th>
            ))}
            <th className="text-sm py-2 font-light truncate">Action</th>
          </tr>
        </thead>
        <tbody className="bg-zinc-800">
          {tableBody.map((row, rowIndex) => (
            <tr key={rowIndex} className="py-2">
              {tableHeadings.map((heading, colIndex) => (
                <td key={colIndex} className="ps-2 py-2 truncate">
                  {row[heading.key]}{" "}
                </td>
              ))}
              <td className="flex justify-center items-center ">
                <motion.div
                  whileTap={{ scale: 1.2 }}
                  className="cursor-pointer hover:bg-zinc-700 rounded-full p-1"
                >
                  <IoEllipsisHorizontalSharp />
                </motion.div> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
