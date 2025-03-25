import React from 'react';

const Invoice = () => {
  // Invoice data (can be passed as props or fetched from API)
  const invoiceData = {
    invoiceNumber: '3682303',
    company: {
      name: 'Preline Inc.',
      address: ['45 Roker Terrace', 'Latheronwheel', 'KW5 8NW, London', 'United Kingdom'],
      logo: (
        <svg className="size-10" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 26V13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13C25 19.6274 19.6274 25 13 25H12" className="stroke-blue-600" stroke="currentColor" strokeWidth="2"/>
          <path d="M5 26V13.16C5 8.65336 8.58172 5 13 5C17.4183 5 21 8.65336 21 13.16C21 17.6666 17.4183 21.32 13 21.32H12" className="stroke-blue-600" stroke="currentColor" strokeWidth="2"/>
          <circle cx="13" cy="13.0214" r="5" fill="currentColor" className="fill-blue-600"/>
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
      { name: 'Web project', quantity: 1, rate: 1250, amount: 1250 },
      { name: 'SEO', quantity: 1, rate: 2000, amount: 2000 }
    ],
    totals: {
      subtotal: 2750,
      tax: 39,
      total: 2789,
      amountPaid: 2789,
      dueBalance: 0
    },
    contact: {
      email: 'example@site.com',
      phone: '+1 (062) 109-9222'
    }
  };

  return (
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
      <div className="sm:w-11/12 lg:w-3/4 mx-auto">
        {/* Card */}
        <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl">
          {/* Header */}
          <div className="flex justify-between">
            <div>
              {invoiceData.company.logo}
              <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600">
                {invoiceData.company.name}
              </h1>
            </div>

            <div className="text-end">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Invoice #{invoiceData.invoiceNumber}</h2>
              <address className="mt-4 not-italic text-gray-800">
                {invoiceData.company.address.map((line, index) => (
                  <React.Fragment key={index}>
                    {line}<br />
                  </React.Fragment>
                ))}
              </address>
            </div>
          </div>

          {/* Client Info */}
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Bill to:</h3>
              <h3 className="text-lg font-semibold text-gray-800">{invoiceData.client.name}</h3>
              <address className="mt-2 not-italic text-gray-500">
                {invoiceData.client.address.map((line, index) => (
                  <React.Fragment key={index}>
                    {line}<br />
                  </React.Fragment>
                ))}
              </address>
            </div>

            <div className="sm:text-end space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">Invoice date:</dt>
                  <dd className="col-span-2 text-gray-500">{invoiceData.dates.invoiceDate}</dd>
                </dl>
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">Due date:</dt>
                  <dd className="col-span-2 text-gray-500">{invoiceData.dates.dueDate}</dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mt-6">
            <div className="border border-gray-200 p-4 rounded-lg space-y-4">
              {/* Table Header */}
              <div className="hidden sm:grid sm:grid-cols-5">
                <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Item</div>
                <div className="text-start text-xs font-medium text-gray-500 uppercase">Qty</div>
                <div className="text-start text-xs font-medium text-gray-500 uppercase">Rate</div>
                <div className="text-end text-xs font-medium text-gray-500 uppercase">Amount</div>
              </div>
              <div className="hidden sm:block border-b border-gray-200"></div>

              {/* Table Rows */}
              {invoiceData.items.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div className="col-span-full sm:col-span-2">
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                      <p className="font-medium text-gray-800">{item.name}</p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                      <p className="text-gray-800">{item.quantity}</p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                      <p className="text-gray-800">${item.rate}</p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                      <p className="sm:text-end text-gray-800">${item.amount}</p>
                    </div>
                  </div>
                  {index < invoiceData.items.length - 1 && (
                    <div className="sm:hidden border-b border-gray-200"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="mt-8 flex sm:justify-end">
            <div className="w-full max-w-2xl sm:text-end space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">Subtotal:</dt>
                  <dd className="col-span-2 text-gray-500">${invoiceData.totals.subtotal.toFixed(2)}</dd>
                </dl>

                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">Tax:</dt>
                  <dd className="col-span-2 text-gray-500">${invoiceData.totals.tax.toFixed(2)}</dd>
                </dl>

                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">Total:</dt>
                  <dd className="col-span-2 text-gray-500">${invoiceData.totals.total.toFixed(2)}</dd>
                </dl>

                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">Amount paid:</dt>
                  <dd className="col-span-2 text-gray-500">${invoiceData.totals.amountPaid.toFixed(2)}</dd>
                </dl>

                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800">Due balance:</dt>
                  <dd className="col-span-2 text-gray-500">${invoiceData.totals.dueBalance.toFixed(2)}</dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 sm:mt-12">
            <h4 className="text-lg font-semibold text-gray-800">Thank you!</h4>
            <p className="text-gray-500">If you have any questions concerning this invoice, use the following contact information:</p>
            <div className="mt-2">
              <p className="block text-sm font-medium text-gray-800">{invoiceData.contact.email}</p>
              <p className="block text-sm font-medium text-gray-800">{invoiceData.contact.phone}</p>
            </div>
          </div>

          <p className="mt-5 text-sm text-gray-500">© {new Date().getFullYear()} {invoiceData.company.name}.</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-x-3">
          <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50">
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
            Invoice PDF
          </button>
          <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect width="12" height="8" x="6" y="14"/>
            </svg>
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;