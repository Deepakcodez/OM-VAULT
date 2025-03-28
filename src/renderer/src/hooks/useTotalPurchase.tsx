import { fetchPurchaseData } from "@renderer/screens/purchase/service";
import React from "react";


const useTotalPurchase = ()=> {
  const [totalPurchase, setTotalPurchase] = React.useState<number>(0);

  React.useEffect(() => {
    const loadPurchaseData = async () => {
      try {
        const data = await fetchPurchaseData(JSON.stringify(0));  
        setTotalPurchase(data?.length || 0);
      } catch (error) {
        console.error("Failed to fetch purchase data:", error);
        setTotalPurchase(0);
      }
    };

    loadPurchaseData();
  }, []);

  return totalPurchase as number;
};

export default useTotalPurchase;