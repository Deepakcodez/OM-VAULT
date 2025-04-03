import useCompany from '@renderer/hooks/useCompany';
import React from 'react';
import CompanyLogo from '../../assets/images/logo.png'
import { useSingleSalesStore } from '@renderer/state_manager/singleSalesData';
import { calculateInstallments, calculatePendingAmount } from '@renderer/utils/Helper';
const Invoice = () => {
  const invoiceRef = React.useRef(null);
  const { companyDetails } = useCompany()
  const { singleSalesData } = useSingleSalesStore();

  const handiveDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    try {
      const invoiceClone = invoiceRef.current?.cloneNode(true);
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
      a.download = `invoice-${invoiceData.invoiceNumber}.pdf`;
      a.click();

      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  };

  const invoiceData = {
    invoiceNumber: '3682303',
    company: {
      name: 'Om Enterprises Group',
      address: ['45 Roker Terrace', 'Latheronwheel', 'KW5 8NW, London', 'United Kingdom'],
      logo: (
        <svg className="logo" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 26V13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13C25 19.6274 19.6274 25 13 25H12" className="stroke-blue" stroke="currentColor" strokeWidth="2" />
          <path d="M5 26V13.16C5 8.65336 8.58172 5 13 5C17.4183 5 21 8.65336 21 13.16C21 17.6666 17.4183 21.32 13 21.32H12" className="stroke-blue" stroke="currentColor" strokeWidth="2" />
          <circle cx="13" cy="13.0214" r="5" fill="currentColor" className="fill-blue" />
        </svg>
      )
    },
    client: {
      name: 'Sara Williams',
      address: ['280 Suzanne Throughway', 'Breannabury, OR 45801', 'United States']
    },
    dates: {
      invoiceDate: '03/10/2018',
      dueDate: '03/11/2018'
    },
    items: [
      { name: 'Design UX and UI', quantity: 1, rate: 500, amount: 500 },

    ],
    totals: {
      subtotal: 2750,
      tax: 39,
      total: 2789,
      amountPaid: 2789,
      dueBalance: 0
    },
    contact: {
      email: 'info@omenterprisesgroup.in',
      phone: '+91-9815300730'
    }
  };

  return (
    <div ref={invoiceRef} className="invoice-container">
      <div className="invoice-wrapper">
        <div className="invoice-card">
          <div className="header">
            <div>
              {/* <img src={CompanyLogo} alt="Logo" className='h-18' /> */}
              <h1 className="company-name">{companyDetails?.companyName}</h1>
            </div>
            <div className="invoice-info">
              <h2 className="invoice-number">Invoice #{invoiceData.invoiceNumber}</h2>
              <address className="company-address">
                <dd>{companyDetails?.address1}</dd>
                <dd>{companyDetails?.address2}</dd>
                <dd>{companyDetails?.address3}</dd>
                <dd>{companyDetails?.address4}</dd>
              </address>
            </div>
          </div>

          <div className="client-section">
            <div>
              <h3 className="section-title">Bill to:</h3>
              <h3 className="client-name">{singleSalesData?.supplier}</h3>
              <address className="client-address">
                {/* {invoiceData.client.address.map((line, index) => (
                  <React.Fragment key={index}>
                    {line}<br />
                  </React.Fragment>
                ))} */}
                {
                  singleSalesData?.shippingAddress
                }
              </address>
            </div>
            <div className="dates">
              <div className="date-items">
                <div className="date-item">
                  <dt className="date-label">Invoice date:</dt>
                  <dd className="date-value">{singleSalesData?.orderingDate}</dd>
                </div>
                {/* <div className="date-item">
                  <dt className="date-label">Due date:</dt>
                  <dd className="date-value">{invoiceData.dates.dueDate}</dd>
                </div> */}
              </div>
            </div>
          </div>

          <div className="items-table">
            <div className="table-container">
              <div className="table-header">
                <div className="header-item item-col">Item</div>
                <div className="header-item qty-col">Qty</div>
                <div className="header-item rate-col">Rate</div>
                <div className="header-item amount-col">Amount</div>
              </div>
              <div className="table-divider"></div>

              <div className="table-row">
                <div className="row-item item-col">
                  <h5 className="mobile-label">Item</h5>
                  <p className="item-name">{singleSalesData?.productName}</p>
                </div>
                <div className="row-item qty-col">
                  <h5 className="mobile-label">Qty</h5>
                  <p>{singleSalesData?.quantity}</p>
                </div>
                <div className="row-item rate-col">
                  <h5 className="mobile-label">Rate</h5>
                  <p>${singleSalesData?.price}</p>
                </div>
                <div className="row-item amount-col">
                  <h5 className="mobile-label">Amount</h5>
                  <p>${singleSalesData?.totalPrice}</p>
                </div>
              </div>

            </div>
          </div>

          <div className="totals">
            <div className="totals-container">
              <div className="total-items">
                <div className="total-item">
                  <dt className="total-label">Subtotal:</dt>
                  <dd className="total-value">₹{Number(singleSalesData?.totalPrice).toFixed(2)}</dd>
                </div>
                <div className="total-item">
                  <dd className="total-label">Tax:</dd>
                  <dt className="total-value">{Number(singleSalesData?.tax)}%</dt>
                </div>
                <div className="total-item">
                  <dd className="total-label">Discount:</dd>
                  <dt className="total-value">{Number(singleSalesData?.discount)}%</dt>
                </div>
                <div className="total-item">
                  <dd className="total-label">Total:</dd>
                  <dt className="total-value">₹{Number(singleSalesData?.totalPrice).toFixed(2)}</dt>
                </div>
                <div className="total-item">
                  <dd className="total-label">Amount paid:</dd>
                  <dt className="total-value">₹{calculateInstallments(singleSalesData?.installments).toFixed(2)}</dt>
                </div>
                <div className="total-item">
                  <dd className="total-label">Due balance:</dd>
                  <dt className="total-value">₹{calculatePendingAmount(calculateInstallments(singleSalesData?.installments), singleSalesData?.totalPrice!).toFixed(2)}</dt>
                </div>
              </div>
            </div>
          </div>

          <div className="footer">
            <h4 className="footer-title+">Thank you!</h4>
            <p className="footer-text">If you have any questions concerning this invoice, use the following contact information:</p>
            <div className="contact-info">
              <p className="contact-email">{invoiceData.contact.email}</p>
              <p className="contact-phone">{invoiceData.contact.phone}</p>
            </div>
            <p className="copyright">© {new Date().getFullYear()} {invoiceData.company.name}.</p>
          </div>
        </div>

        <div className="buttons">
          <button
            onClick={handiveDownloadPDF}
            className="download-btn"
          >

            Invoice PDF
          </button>
          <button className="print-btn">
            Print
          </button>
        </div>
      </div>

      <style>{`
        .invoice-container {
          max-width: 85rem;
          padding: 1rem;
        }

        @media (min-width: 640px) {
          .invoice-container {
            padding: 1.5rem;
          }
        }

        .invoice-wrapper {
          width: 100%;
          margin: 0 auto;
        }

        @media (min-width: 640px) {
          .invoice-wrapper {
            width: 91.666667%;
          }
        }

        @media (min-width: 1024px) {
          .invoice-wrapper {
            width: 75%;
          }
        }

        .invoice-card {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          background-color: white;
        }

        @media (min-width: 640px) {
          .invoice-card {
            padding: 2.5rem;
          }
        }

        .header {
          display: flex;
          justify-content: space-between;
        }

        .logo {
          width: 2.5rem;
          height: 2.5rem;
        }

        .stroke-blue {
          stroke: #2563eb;
        }

        .fill-blue {
          fill: #2563eb;
        }

        .company-name {
          margin-top: 0.5rem;
          font-size: 2.125rem;
          font-weight: 600;
          color: #2563eb;
        }

        @media (min-width: 768px) {
          .company-name {
            font-size: 1.25rem;
          }
        }

        .invoice-info {
          text-align: right;
        }

        .invoice-number {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
        }

        @media (min-width: 768px) {
          .invoice-number {
            font-size: 1.875rem;
          }
        }

        .company-address {
          margin-top: 1rem;
          color: #1f2937;
        }

        .client-section {
          margin-top: 2rem;
          display: grid;
          gap: 0.75rem;
        }

        @media (min-width: 640px) {
          .client-section {
            grid-template-columns: 1fr 1fr;
          }
        }

        .section-title, .client-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
        }

        .client-address {
          margin-top: 0.5rem;
          color: #6b7280;
        }

        .dates {
          space-y: 0.2rem;
        }

        @media (min-width: 640px) {
          .dates {
            text-align: right;
          }
        }

        .date-items {
          display: grid;
          gap: 0.2rem;
        }

        .date-item {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.2rem;
        }

        @media (min-width: 640px) {
          .date-item {
            grid-template-columns: 3fr 2fr;
          }
        }

        .date-label {
          font-weight: 600;
          color: #1f2937;
        }

        .date-value {
          color: #6b7280;
        }

        .items-table {
          margin-top: 1.5rem;
        }

        .table-container {
          border: 1px solid #e5e7eb;
          padding: 1rem;
          border-radius: 0.5rem;
        }

        .table-header {
          display: none;
        }

        @media (min-width: 640px) {
          .table-header {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
          }
        }

        .header-item {
          font-size: 0.75rem;
          font-weight: 500;
          color: #6b7280;
          text-transform: uppercase;
        }

        .table-divider {
          display: none;
          border-bottom: 1px solid #e5e7eb;
        }

        @media (min-width: 640px) {
          .table-divider {
            display: block;
          }
        }

        .table-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0.5rem;
          padding: 0.5rem 0;
        }

        @media (min-width: 640px) {
          .table-row {
            grid-template-columns: 2fr 1fr 1fr 1fr;
          }
        }

        .mobile-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: #6b7280;
          text-transform: uppercase;
        }

        @media (min-width: 640px) {
          .mobile-label {
            display: none;
          }
        }

        .row-item {
          color: #1f2937;
        }

        .item-name {
          font-weight: 500;
        }

        .amount-col {
          text-align: right;
        }

        .mobile-divider {
          border-bottom: 1px solid #e5e7eb;
        }

        @media (min-width: 640px) {
          .mobile-divider {
            display: none;
          }
        }

        .totals {
          margin-top: 2rem;
          display: flex;
          justify-content: flex-end;
        }

        .totals-container {
          width: 100%;
          max-width: 32rem;
        }

        .total-items {
          display: grid;
          gap: 0.5rem;
        }

        @media (min-width: 640px) {
          .totals-container {
            text-align: right;
          }
        }

        .total-item {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        @media (min-width: 640px) {
          .total-item {
            grid-template-columns: 3fr 2fr;
          }
        }

        .total-label {
          font-weight: 600;
          color: #1f2937;
        }

        .total-value {
          color: #6b7280;
        }

        .footer {
          margin-top: 2rem;
        }

        @media (min-width: 640px) {
          .footer {
            margin-top: 3rem;
          }
        }

        .footer-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
        }

        .footer-text {
          color: #6b7280;
        }

        .contact-info {
          margin-top: 0.5rem;
        }

        .contact-email, .contact-phone {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1f2937;
        }

        .copyright {
          margin-top: 1.25rem;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .buttons {
          margin-top: 1.5rem;
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        .download-btn, .print-btn {
          padding: 0.5rem 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 0.5rem;
          cursor: pointer;
        }

        .download-btn {
          border: 1px solid #e5e7eb;
          background-color: white;
          color: #1f2937;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .download-btn:hover {
          background-color: #f9fafb;
        }

        .print-btn {
          border: 1px solid transparent;
          background-color: #2563eb;
          color: white;
        }

        .print-btn:hover {
          background-color: #1d4ed8;
        }

        .btn-icon {
          width: 1rem;
          height: 1rem;
          flex-shrink: 0;
        }
      `}</style>

    </div>
  );
};

export default Invoice;