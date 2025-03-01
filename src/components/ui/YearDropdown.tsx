import { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const YearDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("Select Year");
  const YearDropDownRef = useRef<HTMLUListElement | null>(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2009 }, (_, i) => 2010 + i);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (year: number) => {
    setSelectedYear(JSON.stringify(year));
    setIsOpen(false);
  };

  return (
    <div className="relative w-full  select-none  ">
      <button
        onClick={toggleDropdown}
        className=" bg-transparent flex justify-between items-center md:p-2 p-1 w-full  rounded-lg shadow-sm text-white md:text-sm text-xs"
      >
        {selectedYear}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <ul
          ref={YearDropDownRef}
          className="absolute left-0 top-12 w-full bg-white/10 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-md max-h-60 overflow-y-auto z-10 hide-scb divide-y divide-zinc-700 "
        >
          {years.map((year) => (
            <li
              key={year}
              className="px-4 py-2 hover:bg-white/5  cursor-pointer text-white select-none"
              onClick={() => handleSelect(year)}
            >
              {year}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YearDropdown;
