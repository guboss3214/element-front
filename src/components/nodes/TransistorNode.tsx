import type { FC } from 'react'
import { GoGitCommit } from 'react-icons/go'
import type { NodeProps } from '../NodeProps'

const TransistorNode: FC<Omit<NodeProps, 'nodeType' | 'label'>> = ({
  id,
  onDragStart,
}) => {
  return (
    <div
      id={id}
      draggable="true"
      onDragStart={(e) => onDragStart(e, 'transistor')}
      className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg shadow-lg cursor-grab hover:bg-gray-600 transition-colors"
    >
      <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-600"></div>
      <GoGitCommit className="text-teal-400" size={22} />
      <span className="text-sm font-medium">Транзистор</span>
      <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-gray-600"></div>
    </div>
  )
}

export default TransistorNode
