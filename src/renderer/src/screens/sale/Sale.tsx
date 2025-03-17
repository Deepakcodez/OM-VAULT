import React from "react";
import { FaPlus } from "react-icons/fa6";
import { motion } from "motion/react";
import { useFormStore } from "../../state_manager/FormState";
import SaleForm from "./components/SaleForm";
// import Searchbar from "../purchase/components/Searchbar";
import SingleSale from "./components/SingleSale";
import SaleTable from "./components/SaleTable";
import { useSingleSalesStore } from "@renderer/state_manager/singleSalesData";

const Sale: React.FC = () => {
  const { showForm, setShowForm } = useFormStore();
  const { singleSalesData } = useSingleSalesStore();

  return (
    <div className="text-white ">
      {/* <Searchbar  /> */}
      <div className="flex justify-between items-center w-full ">
        <h1 className="heading-text select-none text-white">Sale</h1>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="hover:bg-zinc-800 p-2 rounded-full"
        >
          <FaPlus color="white" onClick={() => setShowForm()} />
        </motion.div>
      </div>

      {showForm && (
        <div className="absolute z-10  hide-scb w-full h-screen overflow-y-scroll p-12 top-0  mx-auto bg-zinc-800/50 backdrop-blur-xl left-0">
          <div className="lg:w-8/12 md:w-11/12  mx-auto">
            <SaleForm />
          </div>
        </div>
      )}
      {singleSalesData && (
        <div className="absolute z-10  hide-scb w-full h-screen overflow-y-scroll p-12 top-0  mx-auto bg-zinc-800/50 backdrop-blur-lg left-0">
          <div className="lg:w-8/12 md:w-11/12  mx-auto">
           <SingleSale/>
        </div>
        </div>
      )}
      <div className="h-[calc(100vh-137px)]  hide-scb overflow-y-scroll">
        <SaleTable refresh={showForm} />
      </div>
    </div>
  );
};

export default Sale;
