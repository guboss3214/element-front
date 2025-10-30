import type { FC } from 'react'
import { IoHardwareChipOutline } from 'react-icons/io5'
import type { NodeProps } from '../NodeProps'

const ResistorNode: FC<Omit<NodeProps, 'nodeType' | 'label'>> = ({
  id,
  onDragStart,
}) => {
  return (
    <div
      id={id}
      draggable="true"
      onDragStart={(e) => onDragStart(e, 'resistor')}
      className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg shadow-lg cursor-grab hover:bg-gray-600 transition-colors"
    >
      <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-600"></div>
      <IoHardwareChipOutline className="text-blue-400" size={22} />
      <span className="text-sm font-medium">Резистор</span>
      <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-600"></div>
    </div>
  )
}

export default ResistorNode
