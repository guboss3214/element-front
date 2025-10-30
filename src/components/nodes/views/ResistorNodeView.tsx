import type { FC } from 'react'
import { IoHardwareChipOutline } from 'react-icons/io5'
import type { CircuitComponent } from '../../../App'

interface ViewProps {
  component: CircuitComponent
}

const ResistorNodeView: FC<ViewProps> = ({ component }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-600"></div>

      <div className="text-blue-600">
        <IoHardwareChipOutline size={24} />
      </div>

      <div className="flex flex-col text-gray-900">
        <span className="font-bold text-sm">{component.label}</span>
        <span className="text-xs text-gray-600">{component.value} Ω</span>
      </div>

      <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-600"></div>
    </div>
  )
}

export default ResistorNodeView
