import type { FC } from 'react'
import type { CircuitComponent } from '../../../App'
import { BsAlignBottom } from 'react-icons/bs'

interface GroundNodeViewProps {
  component: CircuitComponent
}

const GroundNodeView: FC<GroundNodeViewProps> = ({ component }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-600"></div>

      <div className="text-blue-600">
        <BsAlignBottom className="text-green-600" size={24} />
      </div>

      <div className="flex flex-col text-gray-900">
        <span className="font-bold text-sm">{component.label}</span>
        <span className="text-xs text-gray-600">{component.value} Ω</span>
      </div>

      <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-600"></div>
    </div>
  )
}

export default GroundNodeView
