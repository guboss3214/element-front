import type { FC } from 'react'
import { BsAlignBottom } from 'react-icons/bs'
import type { NodeProps } from '../NodeProps'

const GroundNode: FC<Omit<NodeProps, 'nodeType' | 'label'>> = ({
  id,
  onDragStart,
}) => {
  return (
    <div
      id={id}
      draggable="true"
      onDragStart={(e) => onDragStart(e, 'ground')}
      className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg shadow-lg cursor-grab hover:bg-gray-600 transition-colors"
    >
      <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-600"></div>
      <BsAlignBottom className="text-green-600" size={22} />
      <span className="text-sm font-medium">Заземлення</span>
    </div>
  )
}

export default GroundNode
