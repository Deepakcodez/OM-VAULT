import { PurchaseDataType } from "@renderer/types/types";

interface ClientSearcherProps {
  data: any[];
  setPurchaseData: React.Dispatch<React.SetStateAction<PurchaseDataType>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const ClientSearcher: React.FC<ClientSearcherProps> = ({ data, setPurchaseData, setErrors }) => {
  const handleSelect = (item: any) => {
    setPurchaseData((prev) => ({
      ...prev,
      supplier: item.name,
      supplierContact: item.phone,
      supplierEmail: item.email,
      supplierAddress: item.address,
      gst : item.gst,
      hsn : item.gst,

    }));

    setErrors((prev) => ({
      ...prev,
      supplier: '',
      supplierContact: '',
      supplierEmail: '',
      supplierAddress: ''
    }));
  }

  return (
    <div className='absolute w-[12rem] h-[15rem] bg-neutral-800/90 backdrop-blur-xs border-neutral-300/20 border-[1px] rounded-2xl overflow-y-scroll divide-y-[1px] divide-neutral-700 hide-scb'>
      {data.map((item: any) => (
        <button
          key={item.id}
          onClick={() => handleSelect(item)}
          className='py-1 hover:bg-neutral-500/20 px-3 truncate block w-full text-start'
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}


export default ClientSearcher
