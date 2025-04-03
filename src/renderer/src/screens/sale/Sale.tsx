import React from "react";
import { motion } from "motion/react";
import { useFormStore } from "../../state_manager/FormState";
import SaleForm from "./components/SaleForm";
import SingleSale from "./components/SingleSale";
import SaleTable from "./components/SaleTable";
import { useSingleSalesStore } from "@renderer/state_manager/singleSalesData";
import Searchbar from "../purchase/components/Searchbar";
import { useSalesData } from "@renderer/state_manager/salesData";
import { fetchSaleData } from "./service";
import { AddButton } from "@renderer/components/ui";
import { exportSaleToExcel } from "./components/exportSaleInExcel";
import useYearFilterStore from '@renderer/state_manager/yearFilter'
import { HiFolderDownload } from "react-icons/hi";

const Sale: React.FC = () => {
  const { showForm, setShowForm } = useFormStore();
  const { singleSalesData } = useSingleSalesStore();
   const [searchQuery, setSearchQuery] = React.useState<string>('');
   const { salesData, setSalesData } = useSalesData();
   const{year} = useYearFilterStore()

   React.useEffect(() => {
    const fetchSale = async () => {
      if (!searchQuery || searchQuery === '') {
        const data = await fetchSaleData(JSON.stringify(year))
        if (data.length > 0) {
          setSalesData(data)
        }
      } else {
        return
      }
    }
    fetchSale()
  }, [searchQuery,year])



  return (
    <div className="text-white overflow-hidden h-screen hide-scb">
       <Searchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFilteredData={setSalesData}
        type="sales"
      />
      <div className="flex justify-between items-center w-full ">
        <h1 className="heading-text select-none text-white">Sale</h1>

        <div className='flex gap-2 items-center'>
                <motion.div whileTap={{ scale: 0.9 }}
                onClick={()=>exportSaleToExcel(salesData)}
                className="hover:bg-zinc-800 p-2 rounded-full">
                        <HiFolderDownload size={25}/>

              </motion.div>
                <AddButton onClickHandler={()=>setShowForm()} />
                </div>
      </div>

      {showForm && (
        <div className="absolute z-10  hide-scb w-full h-screen overflow-y-scroll p-12 top-0  mx-auto bg-zinc-800/50 backdrop-blur-xl left-0 " >
          <div className="lg:w-8/12 md:w-11/12  mx-auto">
            <SaleForm />
          </div>
        </div>
      )}
      {singleSalesData && (
        <div className="absolute z-10  hide-scb w-full h-screen overflow-y-scroll p-12 top-0  mx-auto bg-neutral-800/50 backdrop-blur-lg left-0   ">
          <div className="lg:w-8/12 md:w-11/12  mx-auto  ">
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
