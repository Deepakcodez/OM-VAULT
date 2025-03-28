
import { fetchSaleData } from "@renderer/screens/sale/service";
import { SalesDataType } from "@renderer/types/types";
import React from "react";



const useTotalSale = ()=> {
  const [totalSale, setTotalSale] = React.useState<number>(0);

  React.useEffect(() => {
    const loadPurchaseData = async () => {
      try {
        const data: SalesDataType[] = await fetchSaleData(JSON.stringify(0));
        setTotalSale(data?.length || 0);
      } catch (error) {
        console.error("Failed to fetch purchase data:", error);
        setTotalSale(0);
      }
    };

    loadPurchaseData();
  }, []);

  return totalSale as number;
};

export default useTotalSale;