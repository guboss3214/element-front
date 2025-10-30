import { type DragEvent } from 'react'

export interface NodeProps {
  id: string
  label: string
  onDragStart: (e: DragEvent, type: string) => void
  nodeType: string
}
