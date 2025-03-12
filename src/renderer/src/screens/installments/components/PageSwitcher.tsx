import { useInstallmentStore } from '@renderer/state_manager/installmentPageStore'
import React from 'react'

const PageSwitcher: React.FC = () => {
  const { activeSection, setActiveSection } = useInstallmentStore()

  return (
    <div className="w-full flex justify-center items-center gap-4">
      <div className="flex gap-4 text-sm">
        <div className="relative ">
          <button
            onClick={() => setActiveSection('purchase')}
            className={`border border-white/10 p-2 rounded-md w-24 ${activeSection === 'purchase' && '  bg-gradient-to-b from-violet-600/50  to-voilet-600 '}`}
          >
            Purchase{' '}
          </button>
          <button
            onClick={() => setActiveSection('purchase')}
            className={`border absolute left-0 blur-lg   border-white/10 p-2 rounded-md w-24 ${activeSection === 'purchase' && '  bg-gradient-to-b from-violet-600/50 to-voilet-600 '}`}
          >
            Purchase{' '}
          </button>
        </div>
        <div className="relative">
          <button
            onClick={() => setActiveSection('sale')}
            className={`border absolute blur-lg border-white/10 p-2 rounded-md w-24 ${activeSection === 'sale' && '  bg-gradient-to-b from-violet-600/50 to-voilet-600'}`}
          >
            Sale
          </button>

          <button
            onClick={() => setActiveSection('sale')}
            className={`border  border-white/10 p-2 rounded-md w-24 ${activeSection === 'sale' && '  bg-gradient-to-b from-violet-600/50 to-voilet-600'}`}
          >
            Sale
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageSwitcher
