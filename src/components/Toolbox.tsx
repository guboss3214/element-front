import { type DragEvent, type FC, useState } from 'react'
import { IoMenu, IoClose } from 'react-icons/io5'

import ResistorNode from './nodes/ResistorNode'
import CapacitorNode from './nodes/CapacitorNode'
import InducrorNode from './nodes/InductorNode'
import TransformerNode from './nodes/TransformerNode'
import VoltageSourceDCNode from './nodes/VoltageSourceDCNode'
import VoltageSourceACNode from './nodes/VoltageSourceACNode'
import DiodeNode from './nodes/DiodeNode'
import LEDNode from './nodes/LEDNode'
import TransistorNode from './nodes/TransistorNode'
import GroundNode from './nodes/GroundNode'

const Toolbox: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDragStart = (e: DragEvent, type: string) => {
    e.dataTransfer.setData('componentType', type)
    e.dataTransfer.effectAllowed = 'copy'

    if (window.innerWidth < 768) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-gray-700 text-white rounded-md shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <IoMenu size={24} />
      </button>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        className={`
          absolute top-0 left-0 h-full w-64 bg-gray-800 p-4 border-r border-gray-700
          flex flex-col items-center space-y-4 overflow-auto z-30
          transition-transform duration-300 ease-in-out
          
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}

          md:static md:h-screen md:translate-x-0 md:z-auto
        `}
      >
        <div className="flex justify-between items-center w-full md:hidden">
          <h2 className="text-xl font-bold">Компоненти</h2>
          <button onClick={() => setIsOpen(false)} className="text-white p-1">
            <IoClose size={26} />
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4 hidden md:block">Компоненти</h2>

        <ResistorNode id="tool-resistor" onDragStart={handleDragStart} />
        <CapacitorNode id="tool-capacitor" onDragStart={handleDragStart} />
        <InducrorNode id="tool-inductor" onDragStart={handleDragStart} />
        <TransformerNode id="tool-transformer" onDragStart={handleDragStart} />
        <VoltageSourceDCNode id="tool-vdc" onDragStart={handleDragStart} />
        <VoltageSourceACNode id="tool-vac" onDragStart={handleDragStart} />
        <DiodeNode id="tool-diode" onDragStart={handleDragStart} />
        <LEDNode id="tool-led" onDragStart={handleDragStart} />
        <TransistorNode id="tool-transistor" onDragStart={handleDragStart} />
        <GroundNode id="tool-ground" onDragStart={handleDragStart} />
      </aside>
    </>
  )
}

export default Toolbox
