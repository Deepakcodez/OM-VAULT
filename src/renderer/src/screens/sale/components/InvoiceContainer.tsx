import React from 'react'
import { motion } from 'motion/react'
import { RxCross2 } from 'react-icons/rx'
import { TfiDownload } from 'react-icons/tfi'
import { MdOutlineLocalPrintshop } from 'react-icons/md'
import Invoice from '@renderer/components/ui/Invoice'
import { customAlphabet } from 'nanoid'

type InvoiceContainerProps = {
  isShowInvoice: boolean;
  setIsShowInvoice: React.Dispatch<React.SetStateAction<boolean>>;
};



const InvoiceContainer: React.FC<InvoiceContainerProps> = ({ isShowInvoice, setIsShowInvoice }) => {
  const invoiceRef = React.useRef<HTMLDivElement>(null);
  const [invoiceId, setInvoiceId] = React.useState<string>('');

  React.useEffect(() => {
    const numericNanoid = customAlphabet('0123456789', 8)
    setInvoiceId(numericNanoid());
  }, [])

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    try {
      const invoiceClone = invoiceRef.current?.cloneNode(true) as HTMLElement;
      const style = document.createElement('style');
      style.textContent = `
        @media print {
          body { 
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print { display: none !important; }
        }
      `;
      invoiceClone.appendChild(style);

      const html = invoiceClone.outerHTML;
      const pdfData = await window.electron.generateStyledPDF(html);

      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 100)
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  };



  return (
    <div className='absolute inset-0 w-full max-h-max bg-black/80 flex flex-col justify-center items-center gap-4 overflow-hidden'>
      <div className='absolute right-12 flex flex-col justify-center gap-2'>
        <motion.div
          whileTap={{ scale: 0.5 }}
          className="cursor-pointer bg-zinc-700 h-12 w-12 flex justify-center items-center rounded-full duration-300"
          onClick={() => setIsShowInvoice(!isShowInvoice)}
        >
          <RxCross2 size={20} />
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.5 }}
          className="cursor-pointer bg-zinc-700 h-12 w-12 flex justify-center items-center aspect-square rounded-full duration-300"
          onClick={handleDownloadPDF}
        >
          <TfiDownload size={20} />
        </motion.div>
      </div>
      <Invoice ref={invoiceRef} invoiceId={invoiceId} />
    </div>
  )
}

export default InvoiceContainer