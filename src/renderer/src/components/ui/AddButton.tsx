import React from 'react'
import { motion } from 'motion/react'
import { FaPlus } from 'react-icons/fa'

interface AddButtonProps {
  onClickHandler: () => void
}
const AddButton: React.FC<AddButtonProps> = ({ onClickHandler }) => {
  return (
    <button onClick={onClickHandler} className="flex justify-between items-center  ">
      <motion.div whileTap={{ scale: 0.9 }} className="hover:bg-zinc-800 p-2 rounded-full">
        <FaPlus color="white" />
      </motion.div>
    </button>
  )
}

export default AddButton
