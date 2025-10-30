import React, { type FC, type DragEvent } from 'react'
import type { CircuitComponent } from '../App'
import CanvasNode from './CanvasNode'

interface CanvasProps {
  circuitComponents: CircuitComponent[]
  onDragOver: (e: DragEvent) => void
  onDrop: (e: DragEvent<HTMLElement>) => void
  onOpenModal: (component: CircuitComponent) => void
}

const Canvas: FC<CanvasProps> = ({
  circuitComponents,
  onDragOver,
  onDrop,
  onOpenModal,
}) => {
  const canvasStyle: React.CSSProperties = {
    backgroundColor: '#1C1C1E',
    backgroundImage: 'radial-gradient(circle, #3A3A3C 1px, transparent 1.5px)',
    backgroundSize: '25px 25px',
    backgroundPosition: '0 0',
  }

  return (
    <main
      className="flex-1 relative h-full overflow-hidden"
      style={canvasStyle}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {circuitComponents.map((comp) => (
        <CanvasNode key={comp.id} component={comp} onOpenModal={onOpenModal} />
      ))}
    </main>
  )
}

export default Canvas
