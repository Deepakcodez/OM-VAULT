import { useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import useYearFilterStore from '@renderer/state_manager/yearFilter'
import {motion} from 'motion/react'

const YearDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState('Select Year')
  const YearDropDownRef = useRef<HTMLUListElement | null>(null)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2009 }, (_, i) => 2010 + i)
  const { setYear } = useYearFilterStore()
  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (year: number) => {
    setSelectedYear(JSON.stringify(year))
    setYear(year)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full  select-none  ">
      <button
        onClick={toggleDropdown}
        className=" bg-transparent flex justify-between items-center md:p-2 p-1 w-full  rounded-lg shadow-sm text-white md:text-sm text-xs focus:outline-none"
      >
        {selectedYear}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <motion.ul
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
          ref={YearDropDownRef}
          className="absolute left-0 top-12 w-full bg-white/10 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-md max-h-60 overflow-y-auto z-10 hide-scb divide-y divide-zinc-500/50 "
        >
          {years.map((year,index) => (
            <motion.li
            initial={{y: -10, opacity: 0, }}
            animate={{ opacity: 1, y: 0, transition:{delay: 0.05 * index, duration: 0.2} }}
              key={year}
              className="px-4 py-2 hover:bg-white/5  cursor-pointer text-white select-none"
              onClick={() => handleSelect(year)}
            >
              {year}
            </motion.li>
          ))}
          <p
            onClick={() => {
              setYear(0)
              setSelectedYear('All years')
              setIsOpen(false)
            }}
            className="px-4 py-2 hover:bg-white/5  cursor-pointer text-white select-none"
          >
            All years
          </p>
        </motion.ul>
      )}
    </div>
  )
}

export default YearDropdown
