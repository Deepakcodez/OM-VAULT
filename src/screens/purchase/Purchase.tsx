import React from "react";
import { FaPlus } from "react-icons/fa6";
import { motion } from "motion/react";
import PurchaseForm from "./components/PurchaseForm";
import { useFormStore } from "../../state_manager/FormState";
import PurchasesTable from "./components/PurchasesTable";

const Purchase: React.FC = () => {
  const { showForm, setShowForm } = useFormStore();

  return (
    <div className=" text-white  ">
      <div className="flex justify-between items-center w-full ">
        <h1 className="heading-text select-none ">Purchase</h1>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="hover:bg-zinc-800 p-2 rounded-full"
        >
          <FaPlus onClick={() => setShowForm()} />
        </motion.div>
      </div>

      {showForm && (
        <div className="absolute z-10  hide-scb w-full h-screen overflow-y-scroll p-12 top-0  mx-auto bg-zinc-800/50 backdrop-blur-xl left-0">
          <div className="lg:w-8/12 md:w-8/12  mx-auto">
            <PurchaseForm />
          </div>
        </div>
      )}
      <div className="h-[calc(100vh-96px)]  hide-scb overflow-y-scroll">
       <PurchasesTable/>
      </div>
    </div>  
  );
};

export default Purchase;
