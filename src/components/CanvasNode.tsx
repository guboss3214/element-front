import type { FC } from 'react'
import type { CircuitComponent } from '../App'

import ResistorNodeView from './nodes/views/ResistorNodeView'
import CapacitorNodeView from './nodes/views/CapacitorNodeView'
import DiodeNodeView from './nodes/views/DiodeNodeView'
import TransformerNodeView from './nodes/views/TransformerNodeView'
import InductorNodeView from './nodes/views/InductorNodeView'
import VoltageSourceDCNodeView from './nodes/views/VoltageSourceDCNodeView'
import VoltageSourceACNodeView from './nodes/views/VoltageSourceACView'
import LEDNodeView from './nodes/views/LEDNodeView'
import TransistorNodeView from './nodes/views/TransistorNodeView'
import GroundNodeView from './nodes/views/GroundNodeView'

interface CanvasNodeProps {
  component: CircuitComponent
  onOpenModal: (component: CircuitComponent) => void
}

const CanvasNode: FC<CanvasNodeProps> = ({ component, onOpenModal }) => {
  const handleDragStart = (e: React.DragEvent) => {
    const dragData = {
      type: 'moveNode',
      id: component.id,
    }
    e.dataTransfer.setData('application/json', JSON.stringify(dragData))
    e.dataTransfer.effectAllowed = 'move'
  }

  const renderNodeView = () => {
    switch (component.type) {
      case 'resistor':
        return <ResistorNodeView component={component} />
      case 'capacitor':
        return <CapacitorNodeView component={component} />
      case 'diode':
        return <DiodeNodeView component={component} />
      case 'transformer':
        return <TransformerNodeView component={component} />
      case 'inductor':
        return <InductorNodeView component={component} />
      case 'voltageDC':
        return <VoltageSourceDCNodeView component={component} />
      case 'voltageAC':
        return <VoltageSourceACNodeView component={component} />
      case 'led':
        return <LEDNodeView component={component} />
      case 'transistor':
        return <TransistorNodeView component={component} />
      case 'ground':
        return <GroundNodeView component={component} />
      default:
        return (
          <div className="text-red-500">Невідомий тип: {component.type}</div>
        )
    }
  }

  return (
    <div
      className="
        absolute p-2 bg-white rounded-lg shadow-xl 
        cursor-pointer hover:shadow-2xl hover:scale-105 
        transition-all border-2 border-gray-300
      "
      style={{ left: component.position.x, top: component.position.y }}
      onClick={() => onOpenModal(component)}
      draggable="true"
      onDragStart={handleDragStart}
    >
      {renderNodeView()}
    </div>
  )
}

export default CanvasNode
