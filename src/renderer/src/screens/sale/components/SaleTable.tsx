import React from "react";
import { Table } from "../../../components/ui";
import { usePurchaseStore } from "../../../state_manager/purchaseData";
import { TableHeadingsTypes } from "../../../types/types";
import { fetchPurchaseData } from "../../purchase/service";

type PurchasesTableProps = {
  refresh: boolean;
}
const SaleTable: React.FC<PurchasesTableProps> = ({refresh}) => {
  const tableHeadings:TableHeadingsTypes[] = [
    { key: "productName", label: "Item" },
    { key: "price", label: "Price" },
    { key: "quantity", label: "Quantity" },
    { key: "discount", label: "Discount" },
    { key: "supplier", label: "Supplier" },
    { key: "totalPrice", label: "Grandtotal" },
  ];
  const { purchaseData, setPurchaseData } = usePurchaseStore();

  React.useEffect(() => {
    const loadPurchaseData = async () => {
      const data = await fetchPurchaseData(); // Fetch data
      if (data.length > 0) {
        setPurchaseData(data); // Update store with fetched data
      }
    };
    loadPurchaseData(); // Call the function to fetch and store data
  }, [setPurchaseData,  refresh]);

  return (
    <div>
      <Table tableHeadings={tableHeadings} tableBody={purchaseData}  />
    </div>
  );
};

export default SaleTable;
