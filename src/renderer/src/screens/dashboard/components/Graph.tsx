import { fetchPurchaseData } from '@renderer/screens/purchase/service';
import { usePurchaseStore } from '@renderer/state_manager/purchaseData';
import useYearFilterStore from '@renderer/state_manager/yearFilter';
import React from 'react'
import PurchaseLineChart from './PurchaseChart';
import { AnimatePresence, motion } from 'motion/react';
import { fetchSaleData } from '@renderer/screens/sale/service';
import { useSalesData } from '@renderer/state_manager/salesData';
import SalesTrendChart from './SaleChart';


const Graph: React.FC = () => { 

  const { year } = useYearFilterStore()
  const { setPurchaseData, purchaseData } = usePurchaseStore()
  const { salesData, setSalesData } = useSalesData();
  const [isShowPurchaseGraph, setIsShowPurchaseGraph] = React.useState(false)
  const [isShowSalesGraph, setIsShowSalesGraph] = React.useState(false)

  React.useEffect(() => {
    const fetchData = async () => {
      
      const purchase = await fetchPurchaseData(JSON.stringify(year))
      const sale = await fetchSaleData(JSON.stringify(year))
      console.log(purchase);
      if (sale.length > 0) {
        console.log("--", sale);
        setSalesData(sale)
        if (purchase.length > 0) {
          setPurchaseData(purchase)
        }
      }
    }
    fetchData()
  }, [salesData, purchaseData, year])




  return (
    <AnimatePresence>
      <div className='grid grid-cols-12 mt-2  w-full gap-2 '>

        <motion.div
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0 }}
          layoutId='PurchaseGraph'
          onDoubleClick={() => setIsShowPurchaseGraph(!isShowPurchaseGraph)}
          className=' h-full w-full col-span-6 flex flex-col p-5 rounded-2xl border border-t-neutral-500 border-neutral-700 bg-gradient-to-b from-neutral-700/20 select-none '>
          <h1 className='text-2xl mb-1'>Purchase</h1>
          {
            purchaseData &&
            <PurchaseLineChart title='Purchase Trend' purchases={purchaseData} />
          }
        </motion.div>

        <motion.div
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0 }}
          layoutId='SaleGraph'
          onDoubleClick={() => setIsShowSalesGraph(!isShowSalesGraph)}
          className='w-full h-full col-span-6 flex flex-col  p-5 rounded-2xl border border-t-neutral-500 border-neutral-700 bg-gradient-to-b from-neutral-700/20 select-none '>
          <h1 className='text-2xl mb-1'>Sale</h1>
          {
            salesData &&
            <SalesTrendChart title={"Sale Trend"} sales={salesData} />
          }
        </motion.div>



        {
          isShowPurchaseGraph &&
          <motion.div


            animate={{ transition: { duration: 2 } }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId='PurchaseGraph'
              className='absolute inset-0 h-full w-full col-span-6 flex flex-col p-5 rounded-2xl  backdrop-blur-sm select-none border border-t-neutral-500 border-neutral-700 '>

              <PurchaseLineChart setShowPurchaseGraph={setIsShowPurchaseGraph} purchases={purchaseData} />
            </motion.div>

          </motion.div>
        }
        {
          isShowSalesGraph &&
          <motion.div


            animate={{ transition: { duration: 2 } }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId='SaleGraph'
              className='absolute inset-0 h-full w-full col-span-6 flex flex-col p-5 rounded-2xl  backdrop-blur-sm select-none border border-t-neutral-500 border-neutral-700 '>

              <SalesTrendChart
                setShowSalesGraph={setIsShowSalesGraph}
                sales={salesData} />
            </motion.div>

          </motion.div>
        }

      </div>
    </AnimatePresence>
  )
}

export default Graph
