
interface ClientSearcherProps {
  data: any[];
  setSaleData: React.Dispatch<React.SetStateAction<any>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const SaleClientSearcher: React.FC<ClientSearcherProps> = ({ data, setSaleData, setErrors }) => {
  const handleSelect = (item: any) => {
    setSaleData((prev) => ({
      ...prev,
      supplier: item.name,
      supplierContact: item.phone,
      supplierEmail: item.email,
      gst  : item.gst,
      hsn : item.hsn,
      supplierAddress: item.address,
    }));

    setErrors((prev) => ({
      ...prev,
      supplier: '',
      supplierContact: '',
      supplierEmail: '',
      gst : '',
      hsn : '',
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


export default SaleClientSearcher
